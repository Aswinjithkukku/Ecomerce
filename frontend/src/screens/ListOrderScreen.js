import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../actions/OrderAction";
import { Link } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import { BsFillEyeFill } from "react-icons/bs";

function ListOrderScreen() {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  if (!orders) {
    return null
}
  return (
    <Fragment>
      <MetaData title={'My Orders'} />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Order ID
              </th>
              <th scope="col" className="py-3 px-6">
                Num Of Items
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
                      <p className="text-green-600">{order.orderStatus}</p>
                    ) : (
                      <p className="text-red-600">{order.orderStatus}</p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/order/${order._id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      <BsFillEyeFill/>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListOrderScreen;
