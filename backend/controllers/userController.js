import userModel from '../models/userModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js'
import sendToken from '../utils/JwtToken.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import cloudinary from 'cloudinary'


// Register a user => /api/v1/register
export const registerUser = catchAsyncErrors( async (req,res,next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })

    const { name, email, password } = req.body

    const user = await userModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id ,
            url: result.secure_url
        }
    })

    sendToken(user, 201, res)
})

// Login user => /api/v1/login
export const loginUser = catchAsyncErrors( async(req,res,next) => {
    const { email, password } = req.body

    // check if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    // Finding user in database
    const user =  await userModel.findOne({ email }).select('+password')

    if(!user) {
        return next(new ErrorHandler('Invalid email and password', 401))
    }

    // Check if password is correct or not
    const isPaswordMatched = await user.comparePassword(password)

    if(!isPaswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken (user, 200, res)
}) 

// Forgot Password => /api/v1/forgot
export const forgotPassword = catchAsyncErrors( async (req,res,next) => {
    const user = await userModel.findOne({ email: req.body.email })

    if(!user) {
        return next( new ErrorHandler('User not found with this email',404))
    }
    // Get reset Token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    // const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'BrandShop password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
    }
})

// Reset password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors( async (req,res,next) => {
    // Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    // Finding user with this token and have greater expite time
    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if(!user) {
        return next( new ErrorHandler('Password reset token is invalid or has been expired',400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next( new ErrorHandler('Password does not match',400))
    }

    // set new password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

// Get currently logged in user profile => /api/v1/me
export const getUserProfile = catchAsyncErrors( async (req,res,next) => {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
}) 

// Update or change password => /api/v1/password/update
export const updatePassword = catchAsyncErrors( async (req,res,next) => {

    const user = await userModel.findById(req.user.id).select('+password')

    // check previous passord
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched) {
        return next( new ErrorHandler('Old password is incorrect',400))
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

// Update Profile => /api/v1/me/update
export const updateProfile = catchAsyncErrors( async (req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // update avatar 
    if(req.body.avatar !== '') {
        const user = await userModel.findById(req.user.id)
        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

// Logout user => /api/v1/logout
export const logoutUser = catchAsyncErrors( async (req,res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Loged out'
    })
})

// ADMIN ROUTES

// Get all users => /api/v1/admin/users
export const allUsers = catchAsyncErrors( async (req,res,next) => {
    const users = await userModel.find()

    res.status(200).json({
        success: true,
        users
    })
})

// Gey User details => /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors( async (req,res,next) => {
    const user = await userModel.findById(req.params.id)

    if(!user) {
        return next(new ErrorHandler(`User does not find with id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Upadte user => /api/v1/admin/user/:id
export const updateUser = catchAsyncErrors( async (req,res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success: true
    })
})

// Delete user => /api/v1/admin/user/:id
export const deleteUser = catchAsyncErrors( async (req,res,next) => {

    const user = await userModel.findById(req.params.id)

    if(!user) {
        return next( new ErrorHandler(`User does not find with id: ${req.params.id}`,400))
    }
    //remove avatar from cloudinary 
    
    const image_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(image_id)

    await user.remove()

    res.status(200).json({
        success: true
    })
}) 