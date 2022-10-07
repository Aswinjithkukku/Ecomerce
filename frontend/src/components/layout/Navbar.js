import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { logout } from "../../actions/UserAction";

import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { cartItems } = useSelector((state) => state.cart);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  const btn = document.querySelector('.menu-button')
  const items = document.querySelector(".menu-items")
  if(btn) {
    btn.addEventListener("click", () => {
      items.classList.toggle("hidden")
    })
  }

  return (
    <nav className="bg-black border-gray-200 px-2 sm:px-4 py-5 md:py-2.5 shadow-2xl">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center group">
          <span className="self-center text-2xl font-semibold  text-white group-hover:text-blue-600 duration-300">
            <SiBrandfolder />
          </span>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600 group-hover:text-white duration-300">
            randShop
          </span>
        </Link>

        <div className="hidden md:flex">
          <form onSubmit={searchHandler}>
            <div className="relative flex">
              <input
                type="text"
                id="search-navbar"
                className="block p-2  md:w-96 text-gray-900 bg-gray-400  sm:text-sm"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-gray-600 duration-300 text-white text-2xl px-2 flex items-center">
                <BsSearch />
              </button>
            </div>
          </form>
        </div>
        {/* menu button here */}
        <div className=" flex md:hidden items-center pr-2">
          <button className="menu-button text-gray-300 text-xl">
            <BsFillMenuButtonWideFill />
          </button>
        </div>
        {/* secondary navs */}
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-2"
          id="navbar-search"
        >
          <Dropdown />
          <Link to="/cart">
            <button className="px-3 py-2 m-2 bg-blue-600 hover:bg-gray-600 duration-300 text-gray-300 rounded-md">
              Cart{" "}
              <span className="ml-1 px-1 bg-gray-300 text-blue-600">
                {cartItems.length}
              </span>
            </button>
          </Link>
        </div>
      </div>
      {/* menu items here */}
      <div className="menu-items hidden mt-7">
      <Link to="/cart">
        <div className="w-full bg-gray-900 pl-10 py-2 text-lg text-blue-600">
          Cart
        </div>
      </Link>
      <Link to="/orders/me">
        <div className="w-full bg-gray-900 pl-10 py-2 text-lg text-blue-600">
          Order
        </div>
      </Link>
      <Link to="/me">
        <div className="w-full bg-gray-900 pl-10 py-2 text-lg text-blue-600">
          Profile
        </div>
      </Link>
      <Link to="/" onClick={logoutHandler}>
        <div className="w-full bg-gray-900 pl-10 py-2 text-lg text-blue-600">
          Logout
        </div>
      </Link>
      </div>
    </nav>
  );
}

export default Navbar;
