import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import { MdTaskAlt } from "react-icons/md";

function OrderSuccessScreen() {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      <Fragment>
        <div className=" text-center lg:my-72 md:my-52">
          <div className="flex items-center justify-center">
            <div className="text-5xl font-semibold text-blue-900">
              Order Placed Successfully
            </div>
            <div className="text-9xl text-green-600">
              <MdTaskAlt />
            </div>
          </div>
          <div className="font-bold text-2xl text-green-500">
            <Link to="/orders/me">Go to Orders</Link>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default OrderSuccessScreen;
