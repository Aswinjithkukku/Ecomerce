import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function MobCheckOutSteps({ shipping, confirmOrder, payment }) {
  return (
    <Fragment>
      <div className=" flex justify-center mt-5 ">
        {shipping ? (
          <Link to="/shipping">
            <div className="text-xl font-bold mr-4 text-blue-600">Shipping</div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="text-xl font-semibold mr-4 text-gray-600">Shipping</div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/confirm">
            <div className="text-xl font-bold mr-4 text-blue-600">Confirm Order</div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="text-xl font-semibold mr-4 text-gray-600">Confirm Order</div>
          </Link>
        )}

        {payment ? (
          <Link to="/payment">
            <div className="text-xl font-bold mr-4 text-blue-600">Payment</div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="text-xl font-semibold mr-4 text-gray-600">Payment</div>
          </Link>
        )}
      </div>
    </Fragment>
  );
}

export default MobCheckOutSteps;
