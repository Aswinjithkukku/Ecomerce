import React, { Fragment, useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";
import SideBar from "../components/layout/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, clearErrors, deleteOrder } from "../actions/OrderAction";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { DELETE_ORDER_RESET } from "../constants/OrderConstants";

function OrderListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if(isDeleted) {
        window.alert('Order Deleted Successfully')
        navigate('/admin/products')
        dispatch({ type: DELETE_ORDER_RESET })
    }
  }, [dispatch, error,isDeleted,navigate]);

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <Fragment>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <SideBar />
          </div>
          <div className="col-span-9">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Order ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      No Of Items
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Amount
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr className="bg-white border-b " key={order._id}>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {order._id}
                        </th>
                        <td className="py-4 px-6">{order.orderItems.length}</td>
                        <td className="py-4 px-6">{`$${order.totalPrice}`}</td>
                        <td className="py-4 px-6">
                          {order.orderStatus &&
                          String(order.orderStatus).includes("Delivered") ? (
                            <p className="text-green-600">
                              {order.orderStatus}
                            </p>
                          ) : (
                            <p className="text-red-600">{order.orderStatus}</p>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-lg flex hover:underline">
                            <Link to={`/admin/order/${order._id}`}>
                              <span className="text-blue-600">
                                <AiFillEye />
                              </span>
                            </Link>
                            <span className="text-red-600 ml-2" onClick={() => deleteHandler(order._id)}>
                              <AiFillDelete />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default OrderListScreen;
