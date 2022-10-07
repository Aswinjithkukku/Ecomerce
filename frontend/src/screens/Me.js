import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/Loader";

function Me() {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
          <div className="my-5">
            <div className="text-3xl font-extrabold text-center text-blue-600 mb-10">
              My Profile
            </div>
            <div className="md:grid md:grid-cols-2 gap-4">
              <div className="left  mt-7">
                <div className="flex justify-center">
                  <img
                    src={
                      user.avatar ? user.avatar.url : "/images/apple-watch.png"
                    }
                    alt={user.name}
                    className=" w-96"
                    style={{ borderRadius: "100%" }}
                  />
                </div>
                <div className="flex justify-center">
                  <Link to="/me/update">
                    <button className="w-96 text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg mb-4 mt-5">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
              <div className="right">
                <div className="md:mx-16 mx-3">
                  <Fragment>
                    <div className="Name">
                      <label className="text-lg font-bold">Name</label>
                      <h4 className="text-xl font-semibold text-gray-700">
                        {user.name}{" "}
                      </h4>
                    </div>
                    <div className="email">
                      <label className="text-lg font-bold">Email</label>
                      <h4 className="text-xl font-semibold text-gray-700">
                        {user.email}{" "}
                      </h4>
                    </div>
                    <div className="password">
                      <label className="text-lg font-bold">Joined On</label>
                      <h4 className="text-lg font-semibold text-gray-700">
                        {String(user.createdAt).substring(0, 10)}{" "}
                      </h4>
                    </div>
                    {user.role !== "admin" && (
                      <Link
                        to="/orders/me"
                        className="flex justify-center my-1"
                      >
                        <button className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-2">
                          My Order
                        </button>
                      </Link>
                    )}
                    <div className="mt-5">
                      <Link
                        to="/password/update"
                        className="flex justify-center"
                      >
                        <button className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-2">
                          Change Password
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Me;
