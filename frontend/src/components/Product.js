import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Fragment>
      <div
        className="w-80 max-w-sm bg-white rounded-lg shadow-md "
      >
        <Link to={`/product/${product._id}`}>
          <img
            className="p-8 rounded-t-lg"
            src={product.images[0].url}
            alt="product"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/product/${product._id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
              {product.name}
            </h5>
          </Link>
          <div className="flex">
            <Rating value={product.ratings} color={"#f8e825"} />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {product.ratings}
            </span>
          </div>

          <div className="text-sm">{product.numOfReviews}</div>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900 ">
              ${product.price}
            </span>
            <Link
              to="#prod"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
