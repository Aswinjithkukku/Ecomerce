import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsStarFill, BsXLg } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { getProductDetails, clearErrors } from "../actions/ProductAction";
import Loader from "../components/Loader";
import MetaData from "../components/layout/MetaData";

function ProductDetailScreens() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, params.id, error]);

  const reviewHandler = () => {
    const model = document.getElementById("popup");
    if (model.style.display === "none") {
      model.style.display = "block";
    } else {
      model.style.display = "none";
    }
  };

  const closeReviewHandler = () => {
    const model = document.getElementById("popup");
    if (model.style.display === "block") {
      model.style.display = "none";
    } else {
      model.style.display = "block";
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          {/* overlay review starts*/}
          <div
            style={{ display: "none" }}
            id="popup"
            className=" fixed w-full h-full -mx-48  backdrop-grayscale backdrop-blur-sm"
          >
            <div className="max-w-screen-sm mx-auto bg-gray-200 my-44 h-96 rounded-xl">
              <div className="flex justify-between border-b-2 border-slate-900">
                <span className="text-3xl font-bold mt-3 ml-4">
                  Submit Review
                </span>
                <span
                  onClick={closeReviewHandler}
                  className="text-3xl font-bold mt-4 mr-4"
                >
                  <BsXLg />
                </span>
              </div>
              <div className="flex gap-2 text-7xl justify-center mt-7 text-gray-300">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </div>
              <div className="flex justify-center text-sm mt-7">
                <textarea
                  type="textarea"
                  name="review"
                  className="w-10/12 h-28 rounded"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-lime-600 px-3 py-1 mt-4 rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* overlay review ends */}
          <div className="mt-14">
            <div className=" md:grid md:grid-cols-2 md:gap-10 block">
              <div className="left">
                {product.images &&
                  product.images.map((image) => (
                    <div key={image.public_id} className="image">
                      <img src={image.url} alt={product.name} />
                    </div>
                  ))}
              </div>
              <div className="right">
                <div className="data">
                  <div className="border-b-2">
                    <div className="text-3xl font-semibold mb-2">
                      {product.name}
                    </div>
                    <div className="font-extralight mb-3"># {product._id} </div>
                    <div className="flex text-2xl text-yellow-300 mb-3 ">
                      <Rating value={product.ratings} color={"#f8e825"} />
                      <div className="text-base text-gray-500 ml-2">
                        ({product.numOfReviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className="text-3xl font-bold my-4">
                      ${product.price}
                    </div>
                    <div className="flex mb-5">
                      <div className="flex mr-20">
                        <span className="bg-red-500 p-2 flex items-center rounded-lg">
                          <FaMinus />
                        </span>
                        <span className="mx-5 text-xl font-semibold flex items-center">
                          2
                        </span>
                        <span className="bg-green-500 p-2 flex items-center rounded-lg">
                          <FaPlus />
                        </span>
                      </div>
                      <button className="bg-red-300 rounded-xl py-2 px-4">
                        add to cart
                      </button>
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className="font-semibold mb-3">
                      Status:{" "}
                      {product.stock > 0 ? (
                        <span className="text-green-600"> In Stock</span>
                      ) : (
                        <span className="text-red-600">Out Of Stock</span>
                      )}{" "}
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className=" text-xl font-bold">Description</div>
                    <div className="mb-3">{product.description}</div>
                  </div>
                  <div className="mb-3">
                    <div className="font-semibold mb-7">
                      sold by: {product.user}{" "}
                    </div>
                    <button
                      onClick={reviewHandler}
                      className="bg-orange-400 px-3 py-1 rounded-lg"
                    >
                      add Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetailScreens;
