import React, { Fragment, useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";
import SideBar from "../components/layout/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, clearErrors } from "../actions/UserAction";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { DELETE_USER_RESET } from "../constants/UserConstants";

function UsersListScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { isDeleted } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(allUsers());
  
      if (error) {
        window.alert(error);
        dispatch(clearErrors());
      }
      if(isDeleted) {
          window.alert('User Deleted Successfully')
          navigate('/admin/users')
          dispatch({ type: DELETE_USER_RESET })
      }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteHandler = (id) => {
      dispatch(deleteUser(id))
    }
  return (
    <Fragment>
      <MetaData title={"All Orders"} />
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
                      User ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Role
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr className="bg-white border-b " key={user._id}>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {user._id}
                        </th>
                        <td className="py-4 px-6">{user.name}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">
                          {user.role}
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-lg flex hover:underline">
                            <Link to={`/admin/user/${user._id}`}>
                              <span className="text-blue-600">
                              <AiFillEdit/>
                              </span>
                            </Link>
                            <span className="text-red-600 ml-2" onClick={() => deleteHandler(user._id)} >
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
    </Fragment>
  )
}

export default UsersListScreen