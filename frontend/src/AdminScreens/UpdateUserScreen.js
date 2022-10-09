import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUserDetails, clearErrors } from "../actions/UserAction";
import Loader from "../components/Loader";
import MetaData from "../components/layout/MetaData";
import SideBar from "../components/layout/SideBar";
import { UPDATE_USER_RESET } from "../constants/UserConstants";

function UpdateUserScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { loading, user } = useSelector((state) => state.userDetails);
  const { error, isUpdated } = useSelector((state) => state.user);

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("User Updated Successfully");
      navigate("/admin/users");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, user, error, isUpdated, navigate, userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };
  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <Fragment>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <SideBar />
          </div>
          <div className="col-span-9">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="max-w-screen-sm mx-auto mb-10">
                  <div className="mx-20 mt-48">
                    <div className="bg-gray-500 rounded-xl">
                      <div className="mx-10">
                        <div className="text-3xl font-extrabold">
                          Update User
                        </div>
                        <form
                          onSubmit={submitHandler}
                          encType="multipart/form-data"
                        >
                          <div className="Name">
                            <label
                              htmlFor="input-name"
                              className="text-lg font-bold"
                            >
                              Name
                            </label>
                            <input
                              type="name"
                              className="block p-2 md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                              id="input-name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="email">
                            <label
                              htmlFor="input-email"
                              className="text-lg font-bold"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="block p-2 md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                              id="input-email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="role">
                            <label
                              htmlFor="input-role"
                              className="text-lg font-bold"
                            >
                              Role
                            </label>
                            <select
                              className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                              id="input-role"
                              name="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            value="Submit"
                            className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full my-3"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default UpdateUserScreen;
