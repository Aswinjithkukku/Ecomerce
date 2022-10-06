import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../actions/CartAction";
import MetaData from "../components/layout/MetaData";
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";

function CartScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth)

  const increaseQty = (id, quantity, stock) => {
    console.log(quantity);
    const newQty = quantity + 1

    if( newQty > stock ) return

    dispatch(addItemToCart(id, newQty))
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1

    if( newQty <= 0 ) return

    dispatch(addItemToCart(id, newQty))
  };

  const removeHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }
  const checkoutHandler = () => {
    if(!isAuthenticated){
      navigate('/login')
   } else{
      navigate('/shipping')
   }
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <h2 className="mt-7 font-bold text-3xl">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="md:mt-4 my-4 font-bold text-3xl">
            Your Cart : <b>{cartItems.length} items</b>
          </h2>
          <div className="main">
            <div className="md:grid md:grid-cols-4 md:gap-16">
              <div className="col-span-3">
                <table className="w-full text-left ">
                  <tbody className="border-y-2 ">
                  {cartItems.map((item) => (
                      <tr key={item.name} >
                      <td className="flex items-center w-20">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="110"
                          width="110"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/products/${item.product._id}`}
                          className=" text-sm md:text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td>
                        <h4 className="text-sm md:text-xl font-bold">${item.price}</h4>
                      </td>
                      <td>
                        <div className="flex mr-20">
                          <span
                            className="bg-red-500 p-2 flex items-center rounded-lg"
                            onClick={() => decreaseQty(item.product, item.quantity)}
                          >
                            <FaMinus />
                          </span>
                          <input
                            type="number"
                            className="count md:mx-5 w-10 text-center text-sm md:text-xl font-semibold flex items-center"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="bg-green-500 p-2 flex items-center rounded-lg"
                            onClick={() => increaseQty(item.product, item.quantity, item.stock)}
                          >
                            <FaPlus />
                          </span>
                        </div>
                      </td>
                      <td>
                        <h4 className="font-semibold text-2xl text-red-600 pr-2">
                          <span className="cursor-pointer" onClick={() => removeHandler(item.product)}><FaRegTrashAlt /></span>
                        </h4>
                      </td>
                      </tr>
                  ))}
                    </tbody>
                </table>
              </div>
              <div className="col-span-1">
                <div className="main mt-10 md:mt-0">
                  <div className="bg-gray-400 rounded-xl mx-10 md:mx-0">
                    <h1 className="text-xl font-semibold border-b-2">
                      order summary
                    </h1>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="">
                    <h5 className="text-xl font-medium">Subtotal:</h5>
                      </div>
                      <div className="text-right pr-4">
                      {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}(units)
                      </div>
                      <div className="">
                    <h5 className="text-xl font-medium">Est. total:</h5>
                      </div>
                      <div className="text-right pr-4">
                        ${cartItems.reduce((acc, item) => (acc + item.quantity * item.price),0).toFixed(2)}
                      </div>
                    </div>
                    {/* <Link to='/shipping'> */}
                    <button onClick={checkoutHandler} className="rounded-lg w-full bg-zinc-800 text-white">
                      Check out
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default CartScreen;
