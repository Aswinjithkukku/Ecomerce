import React, { Fragment } from "react";
import SideBar from "../components/layout/SideBar";
import { Link } from "react-router-dom";

function DashboardScreen() {
  return (
    <Fragment>
      <div className="grid grid-cols-12 overflow-hidden ">
        <div className="col-span-3">
        <SideBar />
        </div>
        <div className="col-span-9">
          <div className="text-6xl font-bold mt-10">Dashboard</div>
          <div className="mt-10">
            <div className="bg-blue-600 rounded-xl h-32 flex justify-center items-center">
              <div className="text">
                <div className="text-white text-xl font-semibold">Total Amount</div>
                <div className="text-white text-xl font-semibold text-center">$4546</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36 border-b-2 flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Product</div>
                  <div className="text-center text-white text-xl font-semibold">56</div>
                  </div>
                </div>
                <Link className="flex justify-between mt-2 mx-5 " to='/admin/product'>
                  <div className="text-white"><i>View Details</i></div>
                  <div className="text-white"> &gt; </div>
                </Link>
              </div>

              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36 border-b-2 flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Orders</div>
                  <div className="text-center text-white text-xl font-semibold">150</div>
                  </div>
                </div>
                <Link className="flex justify-between mt-2 mx-5 " to='/admin/orders'>
                  <div className="text-white"><i>View Details</i></div>
                  <div className="text-white"> &gt; </div>
                </Link>
              </div>

              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36 border-b-2 flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Users</div>
                  <div className="text-center text-white text-xl font-semibold">46</div>
                  </div>
                </div>
                <Link className="flex justify-between mt-2 mx-5 " to='/admin/users'>
                  <div className="text-white"><i>View Details</i></div>
                  <div className="text-white"> &gt; </div>
                </Link>
              </div>

              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36  flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Out of Stock</div>
                  <div className="text-center text-white text-xl font-semibold">4</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DashboardScreen;
