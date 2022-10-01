import React, { Fragment, useEffect } from "react";
import SideBar from "../components/layout/SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../actions/ProductAction'
import { allOrders } from '../actions/OrderAction'
import Loader from "../components/Loader";
import MetaData from "../components/layout/MetaData";

function DashboardScreen() {

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { loading, orders, totalAmount } = useSelector(state => state.allOrders)

  let outOfStock = 0
  products.forEach(product => {
    if(product.stock === 0) {
      outOfStock+= 1
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(allOrders())
  },[dispatch])
  return (
    <Fragment>
      <div className="grid grid-cols-12 ">
        <div className="col-span-3">
        <SideBar />
        </div>
        <div className="col-span-9">
          <div className="text-6xl font-bold mt-10">Dashboard</div>
          { loading ? <Loader /> : (
            <Fragment>
              <MetaData title={'Admin Dashboard'} />
              <div className="mt-10">
            <div className="bg-blue-600 rounded-xl h-32 flex justify-center items-center">
              <div className="text">
                <div className="text-white text-xl font-semibold">Total Amount</div>
                <div className="text-white text-xl font-semibold text-center">${totalAmount && totalAmount}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36 border-b-2 flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Product</div>
                  <div className="text-center text-white text-xl font-semibold">{products && products.length} </div>
                  </div>
                </div>
                <Link className="flex justify-between mt-2 mx-5 " to='/admin/products'>
                  <div className="text-white"><i>View Details</i></div>
                  <div className="text-white"> &gt; </div>
                </Link>
              </div>

              <div className="rounded-md bg-green-600 h-48">
                <div className=" h-36 border-b-2 flex justify-center items-center">
                  <div className="text">
                  <div className="text-white text-xl font-semibold">Orders</div>
                  <div className="text-center text-white text-xl font-semibold">{orders && orders.length} </div>
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
                  <div className="text-center text-white text-xl font-semibold">{outOfStock}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

            </Fragment>
          )}
          
        </div>
      </div>
    </Fragment>
  );
}

export default DashboardScreen;
