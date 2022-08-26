import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { Link } from 'react-router-dom'
import Rating from "./Rating";
import Loader from './Loader'
import Pagination from './Pagination'

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../actions/ProductAction";

function Home() {
  const dispatch = useDispatch();

  const [ currentPage, setCurrentPage ] = useState(1)

  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts(currentPage));
    if(error) {
      dispatch( clearErrors)
    }

  }, [dispatch,error,currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => {
    if(currentPage>=Math.ceil(productCount / resPerPage)) {
      setCurrentPage(Math.ceil(productCount / resPerPage))
    }else {
      setCurrentPage(currentPage + 1)
    }
  }
  const paginateBack = () => {
    if(currentPage<=1) {
      setCurrentPage(1)
    }else {
      setCurrentPage(currentPage - 1)
    }
  }

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
            <div key={product._id} className="w-80 max-w-sm bg-white rounded-lg shadow-md ">
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
               <Rating value={product.ratings} color={'#f8e825'} />
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
        ))}
        </div>
      )}
       <div className="flex justify-center my-10">
              <Pagination
              resPerPage={resPerPage}
              totalProduct={productCount}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              paginate={paginate}
              currentPage={currentPage}
              />
            </div>
        </Fragment>
  )
}

export default Home;
