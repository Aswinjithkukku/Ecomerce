import React, { Fragment, useState, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Product from "./Product";
import Rating from "./Rating";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../actions/ProductAction";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function Home() {
  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0)

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, rating));
    if (error) {
      dispatch(clearErrors);
    }
  }, [dispatch, error, keyword, currentPage, price,category,rating]);

  let count = productCount
  // if(keyword) {
  //   count = filteredProductsCount
  // }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateFront = () => {
    if (currentPage >= Math.ceil(productCount / resPerPage)) {
      setCurrentPage(Math.ceil(productCount / resPerPage));
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginateBack = () => {
    if (currentPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      <div className="my-7">
        <h1 className="text-4xl font-bold">Latest Product</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {keyword ? (
            <Fragment>
              <div className="grid md:grid-cols-4 md:gap-4">
                <div className="md:col-span-1 pr-10 mt-7">
                  <Range
                    marks={{
                      1: `$1`,
                      1000: `$1000`,
                    }}
                    min={1}
                    max={1000}
                    defaultValue={[1, 1000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                  <hr className="mt-10 mb-2"/>
                  <h4 className="text-2xl font-bold"> Categories</h4>
                  <ul className="pl-0 mt-1">
                    {categories.map(item => (
                      <li key={item} className='list-none cursor-pointer font-semibold' onClick={() => setCategory(item)} >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <hr className="mt-3 mb-2"/>
                  <h4 className="text-2xl font-bold"> Ratings</h4>
                  <ul className="pl-0 mt-1">
                    {[5,4,3,2,1].map(star => (
                      <li key={star} className='list-none cursor-pointer font-semibold' onClick={() => setRating(star)} >
                        <div className="text-xl mt-1">
                        <Rating value={star} color={"#f8e825"} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-3">
                  <Fragment>
                    <div className="md:grid md:grid-cols-3 md:gap-4 grid-cols-2 gap-2">
                      {products &&
                        products.map((product) => (
                          <Product key={product._id} product={product} />
                        ))}
                    </div>
                  </Fragment>
                </div>
              </div>
            </Fragment>
          ) : (
            // this is without keyword
            <Fragment>
              <div className="md:grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      {resPerPage <= count && (


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
            )}
            
    </Fragment>
  );
}

export default Home;
