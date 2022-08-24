import React, { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { Link } from 'react-router-dom'
import Rating from "./Rating";
import Loader from './Loader'

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/ProductAction";

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      <div className="my-7">
        <h1 className="text-4xl font-bold">Latest Product</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (

      <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
      {products &&
        products.map((product) => (
            <div key={product._id} class="w-80 max-w-sm bg-white rounded-lg shadow-md ">
              <Link to={`/product/${product._id}`}>
                <img
                  class="p-8 rounded-t-lg"
                  src={product.images[0].url}
                  alt="product"
                />
              </Link>
              <div class="px-5 pb-5">
                <Link to={`/product/${product._id}`}>
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">
                    {product.name}
                  </h5>
                </Link>
                <div className="flex">
               <Rating value={product.ratings} color={'#f8e825'} />
               <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                   {product.ratings}
                  </span>
                  </div>

                <div className="text-sm">{product.numOfReviews}</div>
                <div class="flex justify-between items-center">
                  <span class="text-3xl font-bold text-gray-900 ">
                    ${product.price}
                  </span>
                  <Link
                    to="#prod"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
        ))}
        </div>
      )}
        </Fragment>
  )
}

export default Home;
