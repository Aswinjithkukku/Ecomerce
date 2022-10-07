import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsStarFill, BsXLg } from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { newReview, getProductDetails, clearErrors } from "../actions/ProductAction";
import { addItemToCart } from "../actions/CartAction";
import Loader from "../components/Loader";
import MetaData from "../components/layout/MetaData";
import { NEW_REVIEW_RESET } from '../constants/ProductConstants'


function ProductDetailScreens() {
  const params = useParams();
  const dispatch = useDispatch();

  const [ quantity, setQuantity ] = useState(1)
  const [ rating, setRating ] = useState(0)
  const [ comment, setComment ] = useState('')

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { user } = useSelector(state => state.auth)
  const { error: reviewError, success } = useSelector(state => state.newReview)

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (error) {
      window.alert(error)
      dispatch(clearErrors());
    }
    if (reviewError) {
      window.alert(reviewError)
      dispatch(clearErrors());
    }
    if (success) {
      window.alert('Review Submitted Succesfully')
      dispatch({type : NEW_REVIEW_RESET});
    }
  }, [dispatch,params.id,reviewError,error,success]);

  function reviewHandler() {
    const model = document.getElementById("popup");
    if (model.style.display === "none") {
      model.style.display = "block";
    } else {
      model.style.display = "none";
    }

    const stars = document.querySelectorAll('.star')

    stars.forEach((star,index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach((e) => {
        star.addEventListener(e, showRatings)
      });
    })

    function showRatings(e){
      console.log(this.starValue);
      stars.forEach((star, index) => {
        if(e.type === 'click') {
          if(index < this.starValue) {
            star.style.color='orange'

            setRating(this.starValue)
          } else {
            star.style.color='white'
          }
        }
        if(e.type === 'mouseover') {
          if(index < this.starValue) {
            star.style.color='yellow'
          } 
        }
        if(e.type === 'mouseout') {
            star.style.color='white'
        }
      })
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

  const increaseQty = () => {
    const count = document.querySelector('.count')
    if(count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1
    setQuantity(qty)
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')
    if(count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1
    setQuantity(qty)
  }

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity))
    window.alert('This item added to cart')
  }
  const submitHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', params.id);

    dispatch(newReview(formData));
    closeReviewHandler()
  }

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
            className=" fixed w-full h-full md:-mx-48  backdrop-grayscale backdrop-blur-sm"
          >
            <div className="max-w-screen-sm mx-auto bg-gray-200 md:my-44 md:h-96 rounded-xl">
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
                <span className="star"><BsStarFill  /></span>
                <span className="star"><BsStarFill  /></span>
                <span className="star"><BsStarFill  /></span>
                <span className="star"><BsStarFill  /></span>
                <span className="star"><BsStarFill  /></span>
              </div> 
              <div className="flex justify-center text-sm mt-7">
                <textarea
                  type="textarea"
                  name="review"
                  className="w-10/12 h-28 rounded"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-lime-600 px-3 py-1 mt-4 rounded-lg" onClick={submitHandler}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* overlay review ends */}
          <Fragment>
          <div className="mt-7 md:mt-14">
            <div className=" md:grid md:grid-cols-2 md:gap-10 block">
              <div className="left">
                {product.images &&
                  product.images.map((image) => (
                    <div key={image.public_id} className="image ">
                      <img src={image.url} alt={product.name} className='object-cover w-full rounded-2xl'/>
                    </div>
                  ))}
              </div>
              <div className="right">
                <div className="data pl-2">
                  <div className="border-b-2">
                    <div className="  text-2xl md:text-3xl text-blue-900 font-semibold mb-2">
                      {product.name}
                    </div>
                    <div className=" font-extralight text-blue-900 mb-3"># {product._id} </div>
                    <div className="flex  text-2xl text-yellow-300 mb-3 ">
                      <Rating value={product.ratings} color={"#f8e825"} />
                      <div className="text-base text-gray-500 ">
                        ({product.numOfReviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className="text-3xl text-blue-900 font-bold my-4 ">
                      ${product.price}
                    </div>
                    <div className="flex mb-5 ">
                      <div className="flex mr-20">
                        <span className="bg-gray-600 hover:bg-blue-600 duration-300 text-white p-2 flex items-center rounded-md" onClick={decreaseQty}>
                          <FaMinus />
                        </span>
                        <input type='number' className="count mx-5 w-10 text-center text-xl font-semibold flex items-center" value={quantity} readOnly /> 
                        <span className="bg-gray-600 hover:bg-blue-600 duration-300 text-white p-2 flex items-center rounded-md" onClick={increaseQty}>
                          <FaPlus />
                        </span>
                      </div>
                      <button className="bg-blue-600 text-white hover:bg-gray-600 duration-300 rounded-md py-2 px-4" disabled={product.stock === 0} onClick={addToCart}>
                        add to cart
                      </button>
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className="font-semibold mb-3 ">
                      Status:{" "}
                      {product.stock > 0 ? (
                        <span className="text-green-600"> In Stock</span>
                      ) : (
                        <span className="text-red-600">Out Of Stock</span>
                      )}{" "}
                    </div>
                  </div>
                  <div className="border-b-2 mb-3">
                    <div className=" text-xl font-bold  text-gray-900">Description</div>
                    <div className="mb-3 font-medium text-gray-600">{product.description}</div>
                  </div>
                  <div className="mb-3">
                    <div className="font-semibold mb-4 md:mb-7 ">
                      sold by: {product.user}{" "}
                    </div>
                    {user ? (
                    <button
                      onClick={reviewHandler}
                      className="bg-blue-600 text-white hover:bg-gray-600 duration-300 px-3 py-2 rounded-md "
                    >
                      Add Review
                    </button>
                    ) : (
                      <div className="bg-red-200 rounded-xl text-center p-3 text-red-400">
                        Login to post your reviews 
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <div className="text-2xl font-bold ml-2 mt-2 text-gray-900">
              Comments
            </div>
          )}

            {product.reviews && product.reviews.length > 0 && (
              product.reviews.map((review) => (
                <div key={review._id} className="reviews py-3 border-y-2 ml-2">
                  <Rating value={product.ratings} color={"#f8e825"} />
                  <div className="font-semibold text-gray-400 ml-2"><i>{review.name}</i></div>
                  <div className="mt-2 text-lg font-semibold">{review.comment}</div>
                </div>
              ))
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetailScreens;
