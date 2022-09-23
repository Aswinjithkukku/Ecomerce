import React, { Fragment, useEffect } from 'react'
import MetaData from '../components/layout/MetaData'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors } from '../actions/ProductAction'

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
            {products &&
              products.map((product) => (
                <tr className="bg-white border-b " key={product._id}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {product._id}
                  </th>
                  <td className="py-4 px-6">{product.length}</td>
                  <td className="py-4 px-6">{`$${product.totalPrice}`}</td>
                  <td className="py-4 px-6">
                   hgdfhgfds
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/product/${product._id}`}
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
  )
}

export default ProductListScreen