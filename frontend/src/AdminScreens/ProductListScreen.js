import React, { Fragment, useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";
import SideBar from "../components/layout/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../actions/ProductAction";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { DELETE_PRODUCT_RESET } from "../constants/ProductConstants";

function ProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      window.alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      window.alert("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="grid grid-cols-12">
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
                          <td className="py-4 px-6">{product.stock}</td>
                          <td className="py-4 px-6">
                            <div className="text-lg flex hover:underline">
                              <Link to={`/admin/product/${product._id}`}>
                                <span className="text-blue-600">
                                  <AiFillEdit />
                                </span>
                              </Link>
                              <span
                                className="text-red-600 ml-2"
                                onClick={() =>
                                  deleteProductHandler(product._id)
                                }
                              >
                                <AiFillDelete />
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
      )}
    </Fragment>
  );
}

export default ProductListScreen;
