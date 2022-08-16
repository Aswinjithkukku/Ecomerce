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
    count: products.length,
    productCount,
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
