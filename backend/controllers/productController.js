import productModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";

// create new product => /api/v1/admin/product/new
export const newProduct = catchAsyncErrors( async (req, res, next) => {

  req.body.user = req.user.id
  
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products => /api/v1/products?keyword=string
export const getProducts = catchAsyncErrors( async (req, res, next) => {
  
  const resPerPage = 4
  const productCount = await productModel.countDocuments()

  const apiFeatures = new APIFeatures(productModel.find(), req.query).search().filter().pagination(resPerPage)
  const products = await apiFeatures.query

    res.status(200).json({
      success: true,
      productCount,
      resPerPage,
      products,
    });
});

//get single product => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product no found', 404))
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// update product => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrors( async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// delete product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }
});

// Create product review => /api/v1/review
export const createProductReview = catchAsyncErrors( async (req,res,next) => {

  const { rating, comment, productId } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await productModel.findById(productId)

  const isReviewed = product.reviews.find( r =>  r.user.toString() === req.user._id.toString())

  if (isReviewed) {
    product.reviews.forEach(review => {
      if(review.user.toString() === req.user._id.toString()) {
        review.rating = rating
        review.comment = comment
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  product.ratings = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length
  await product.save( {validateBeforeSave: false} )

  res.status(200).json({
    success: true
  })
})

// Get product review => /api/v1/reviews
export const getProductReviews = catchAsyncErrors( async (req,res,next) => {

  const product = await productModel.findById(req.query.id)

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// Delete product review => /api/v1/reviews
export const deleteReview = catchAsyncErrors( async (req,res,next) => {
  const product = await productModel.findById(req.query.productId)

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

  const numOfReviews = reviews.length

  const ratings = product.reviews.reduce((acc,item) => item.rating + acc, 0) / reviews.length

  await productModel.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true
  })
})