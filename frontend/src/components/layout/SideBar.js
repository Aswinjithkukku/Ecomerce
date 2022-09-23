import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaProductHunt, FaUsers } from "react-icons/fa";
import { BsCartFill, BsStarFill } from "react-icons/bs";

function SideBar() {

  const extendHandler = () => {
    const extend = document.getElementById('extend')
    if (extend.style.display === "block") {
      extend.style.display = "none";
    } else {
      extend.style.display = "block";
    }
  }

  return (
    <Fragment>
      <div className="w-72 bg-gray-700 h-screen">
        <div className="p-4">
          <div className="text-gray-400 my-4 text-2xl text-center font-bold">
            Dashboard
          </div>
          <div className="bg-gray-800 rounded-lg">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg" onClick={extendHandler} >
              <FaProductHunt />
              Product
            </div>

            <div id="extend" className="block">

            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 ml-2 rounded-lg">
              <FaProductHunt />
              Link
            </div>
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 ml-2 rounded-lg">
              <FaProductHunt />
              NEw
            </div>
            </div>

          </div>



          <Link to="/admin/orders">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg">
              <BsCartFill />
              Orders
            </div>
          </Link>
          <Link to="/admin/users">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg">
              <FaUsers />
              Users
            </div>
          </Link>
          <Link to="/admin/reviews">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg">
              <BsStarFill /> Users
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default SideBar;
