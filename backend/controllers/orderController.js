import orderModel from "../models/orderModel.js";
import productModel from '../models/productModel.js'
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

// Create a new order => /api/v1/order/new
export const newOrder = catchAsyncErrors( async (req,res,next) => {
    const {
        shippingInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrors( async (req,res,next) => {

    const order = await orderModel.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next( new ErrorHandler('No order is found with this ID',404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders => /api/v1/orders/me
export const myOrders = catchAsyncErrors( async (req,res,next) => {

    const orders = await orderModel.find({ user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders for admin => /api/v1/admin/orders
export const allOrders = catchAsyncErrors( async (req,res,next) => {

    const orders = await orderModel.find()

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update / process orders for admin => /api/v1/admin/order/:id
export const updateOrders = catchAsyncErrors( async (req,res,next) => {

    const order = await orderModel.findById(req.params.id)

    if(!order.orderStatus === 'Delivered') {
        return next( new ErrorHandler('You have already delivered this order',400))
    }

    order.orderItems.forEach( async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true
    })
})
async function updateStock(id, quantity) {

    const product = await productModel.findById(id)
    product.stock = product.stock - quantity
    await product.save({validateBeforeSave: false})
}

// Delete order => /api/v1/order/:id
export const deleteOrder = catchAsyncErrors( async (req,res,next) => {

    const order = await orderModel.findById(req.params.id)

    if(!order) {
        return next( new ErrorHandler('No order is found with this ID',404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})
