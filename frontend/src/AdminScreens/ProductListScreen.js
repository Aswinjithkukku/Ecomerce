import React, { Fragment, useEffect } from 'react'
import MetaData from '../components/layout/MetaData'
import Loader from '../components/Loader'
import SideBar from '../components/layout/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors } from '../actions/ProductAction'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function ProductListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAdminProducts())

        if( error) {
            window.alert(error)
            dispatch(clearErrors())
        }
    },[dispatch,error])

  return (
    <Fragment>
      <MetaData title={'All Products'} />
      <Fragment>
        <div className='grid grid-cols-12'>
        <div className="col-span-3">
        <SideBar />
        </div>
        <div className="col-span-9">

        
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="py-3 px-6">
                 ID
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Stock
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr className="bg-white border-b " key={product._id}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {product._id}
                  </th>
                  <td className="py-4 px-6">{product.name}</td>
                  <td className="py-4 px-6">{`$${product.price}`}</td>
                  <td className="py-4 px-6">
                   {product.stock}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-lg flex hover:underline">
                      <span className='text-blue-600'>
                        <AiFillEdit/>
                        </span>
                      <span className='text-red-600 ml-2'>
                      <AiFillDelete/>
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
  )
}

export default ProductListScreen