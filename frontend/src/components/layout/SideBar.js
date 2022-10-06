import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaProductHunt, FaUsers, FaPlus } from "react-icons/fa";
import { BsCartFill, BsStarFill } from "react-icons/bs";
import { DiGhostSmall } from "react-icons/di";
import { AiFillDashboard } from "react-icons/ai";

function SideBar() {

  const extendHandler = () => {
    const extend = document.getElementById('extend')
    if (extend.style.display === "none") {
      extend.style.display = "block";
    } else {
      extend.style.display = "none";
    }
  }

  return (
    <Fragment>
      <div className="w-72 bg-gray-700 h-screen sticky">
        <div className="p-4">
          <div className="text-gray-400 my-4 text-2xl text-center font-bold">
            Dashboard
          </div>
          <Link to="/dashboard">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg">
              <AiFillDashboard />
              Dashboard
            </div>
          </Link>
          <div className="bg-gray-800 rounded-lg">
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 mt-3 rounded-lg" onClick={extendHandler} >
              <FaProductHunt />
              Product
            </div>

            <div id="extend" style={{display: "none"}}>
            <Link to='/admin/products'>
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 ml-2 rounded-lg">
              <DiGhostSmall />
              All
            </div>
            </Link>
            <Link to='/admin/product'>
            <div className="text-white bg-gray-800 text-lg flex justify-center items-center font-bold py-3 ml-2 rounded-lg">
              <FaPlus />
              Create
            </div>
            </Link>
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
              <BsStarFill /> Reviews
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default SideBar;
