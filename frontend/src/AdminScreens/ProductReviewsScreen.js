import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";
import SideBar from "../components/layout/SideBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews, clearErrors, deleteReview } from "../actions/ProductAction";
import { AiFillDelete } from "react-icons/ai";
import { DELETE_REVIEW_RESET } from "../constants/ProductConstants";

function ProductReviewsScreen() {

    const [ productId, setProductId ] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { error, reviews } = useSelector((state) => state.productReviews);
    const { isDeleted } = useSelector((state) => state.review);
  
    useEffect(() => {
  
      if (error) {
        window.alert(error);
        dispatch(clearErrors());
      }
      if(productId !== '') {
        dispatch(getProductReviews(productId))
      }
        if(isDeleted) {
              window.alert('Review Deleted Successfully')
              dispatch({ type: DELETE_REVIEW_RESET })
          }
      }, [ dispatch, error, productId,isDeleted]);
      
      const deleteHandler = (id) => {
          dispatch(deleteReview(id,productId))
        }
        const submitHandler = (e) => {
          e.preventDefault()
          dispatch(getProductReviews(productId))
        }
     return (
       <Fragment>
      <MetaData title={"Product Reviews"} />
      <Fragment>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <SideBar />
          </div>

          <div className="col-span-9">
            <div className="lg:mx-72 mt-10">
                <form onSubmit={submitHandler}>
                <div className="productId">
                <label htmlFor="productIdField" className="text-lg font-bold">Enter ProductId</label>
                <input
                  id="productIdField"
                  type="text"
                  className="block p-2 md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <button type='submit' value='Submit' className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full">
                SEARCH
              </button>
                </form>
            </div>
            {reviews && reviews.length > 0 ? (
              
              <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Review ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Rating
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Comment
                    </th>
                    <th scope="col" className="py-3 px-6">
                      User
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {reviews &&
                    reviews.map(review => (
                      <tr className="bg-white border-b " key={review._id}>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                          >
                          {review._id}
                        </th>
                        <td className="py-4 px-6">{review.rating}</td>
                        <td className="py-4 px-6">{review.comment}</td>
                        <td className="py-4 px-6">
                          {review.name}
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-lg flex hover:underline">
                            <span className="text-red-600 ml-2"  onClick={() => deleteHandler(review._id)}>
                              <AiFillDelete />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            ) : (
              <p className="mt-5"> No Reviews</p>
              )}
          </div>
        </div>
      </Fragment>
    </Fragment>
  )
}

export default ProductReviewsScreen