import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";

import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';


function Navbar() {

  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const { cartItems } = useSelector(state => state.cart)
    
  const searchHandler = (e) => {
      e.preventDefault()
      if(keyword.trim()) {
        navigate(`/search/${keyword}`)
      }else {
        navigate('/')
      }
    }

  return (
        
<nav className="bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
  <Link to="/" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="BS Logo"/>
      <span className="self-center text-xl font-semibold whitespace-nowrap">BrandShop</span>
  </Link>

      <form onSubmit={searchHandler}>
      <div className="flex">
        <div className="relative flex">
          <input
            type="text"
            id="search-navbar"
            className="block p-2  md:w-96 text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="bg-gray-600 hover:bg-gray-400 text-white text-2xl px-2 flex items-center">
            <BsSearch />
          </button>
        </div>
      </div>
    </form>

  <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-2" id="navbar-search">
 
    <Dropdown />
    <Link to='/cart'>
    <button className='px-3 py-2 m-2 bg-slate-400 text-white rounded-lg'>Cart <span className='ml-1 px-1 bg-slate-200'>{cartItems.length}</span></button>
    </Link>
    </div>
    
  </div>
</nav>
  )
}

export default Navbar