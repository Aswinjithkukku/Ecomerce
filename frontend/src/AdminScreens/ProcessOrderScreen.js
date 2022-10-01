import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";
import SideBar from "../components/layout/SideBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../actions/OrderAction";
import { UPDATE_ORDER_RESET } from "../constants/OrderConstants";

function ProcessOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [status, setStatus] = useState("");

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("Product Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [error, dispatch, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    let formData = new FormData();
    formData.set("status", status);
    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />
      <Fragment>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <SideBar />
          </div>
          <div className="col-span-9">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div>
                  <div className="mt-10">
                    <h1 className="text-4xl font-semibold">
                      {" "}
                      Order #{order._id}
                    </h1>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-9">
                      <div className="mt-5 pb-4 border-b-2">
                        <h2 className="text-xl font-semibold">Shipping Info</h2>
                        <h3 className="mt-2 ml-3 font-semibold">
                          Name : <span>{user && user.name}</span>
                        </h3>
                        <h3 className="mt-2 ml-3 font-semibold">
                          Phone :{" "}
                          <span>{shippingInfo && shippingInfo.phoneNo} </span>
                        </h3>
                        <h3 className="mt-2 ml-3 font-semibold">
                          Address : <span>{shippingDetails}</span>
                        </h3>
                        <h3 className="mt-2 ml-3 font-semibold">
                          Amount : <span>${totalPrice}</span>
                        </h3>
                      </div>
                      <div className="pb-4 border-b-2">
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">Payment</h2>
                          {isPaid ? (
                            <h3 className="text-green-600 text-lg font-semibold">
                              PAID
                            </h3>
                          ) : (
                            <h3 className="text-red-600 text-lg font-semibold">
                              NOT PAID
                            </h3>
                          )}
                        </div>
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">Stripe Id</h2>
                          <h3 className=" text-medium text-gray-700 font-semibold">
                            {paymentInfo && paymentInfo.id}
                          </h3>
                        </div>
                        <div className="mt-5">
                          <h2 className="text-xl font-semibold">
                            Order Status
                          </h2>
                          {orderStatus &&
                          String(orderStatus).includes("Delivered") ? (
                            <p className="text-green-600 text-lg font-semibold">
                              {orderStatus}
                            </p>
                          ) : (
                            <p className="text-red-600 text-lg font-semibold">
                              {orderStatus}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="text-center bg-slate-300 rounded-lg mt-5">
                        <div className="mx-2 ">
                          <h4 className="py-4 text-xl font-semibold text-center">
                            Status
                          </h4>

                          <div className="">
                            <select
                              className="w-full py-1"
                              name="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>

                          <button
                            className="my-3 rounded-lg w-full p-2 text-white bg-neutral-700"
                            onClick={() => updateOrderHandler(order._id)}
                          >
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <h2 className="text-xl font-semibold my-3">Order Items</h2>
                    <table className="w-full text-left ">
                      <tbody className="border-b-2">
                        {orderItems &&
                          orderItems.map((item) => (
                            <tr key={item.product}>
                              <td className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  height="110"
                                  width="110"
                                />
                              </td>
                              <td>
                                <Link
                                  to={`/products/${item.product}`}
                                  className="text-lg font-semibold"
                                >
                                  {item.name}
                                </Link>
                              </td>
                              <td>
                                <h4 className="text-xl font-bold">
                                  ${item.price}
                                </h4>
                              </td>
                              <td>
                                <div className="flex mr-20">
                                  {item.quantity} Piece(s)
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default ProcessOrderScreen;
