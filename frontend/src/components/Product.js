import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Fragment>
      <div
        className="w-screen md:w-60 lg:w-80  bg-white rounded-lg shadow-md  mx-2 border-b-2"
      >
        <div className="grid grid-cols-5 md:block">

        
          <div className="col-span-2 md:flex md:justify-center">
        <Link to={`/product/${product._id}`}>
          <img
            className="p-8 rounded-lg"
            src={product.images[0].url && product.images[0].url}
            alt="product"

            />
        </Link>
            </div>
            <div className="col-span-3">
        <div className="px-5 pb-5">
          <Link to={`/product/${product._id}`}>
            <h5 className="text-base md:text-xl font-semibold tracking-tight text-gray-600 mb-1">
              {product.name}
            </h5>
          </Link>
          <div className="flex">
            <Rating value={product.ratings} color={"#f8e825"} />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {product.ratings} (ratings)
            </span>
          </div>

          <div className="text-sm text-blue-900">{product.numOfReviews}(Reviews)</div>
          <div className="flex justify-between items-center">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 ">
              ${product.price}
            </span>
          </div>
        </div>
        </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
