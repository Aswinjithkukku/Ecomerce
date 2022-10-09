import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, clearErrors } from "../actions/UserAction";
import Loader from "../components/Loader";
import MetaData from "../components/layout/MetaData";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/apple-watch.png");

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="max-w-screen-sm mx-auto mb-14 md:mb-24">
            <div className="mx-3 md:mx-20 mt-24 md:mt-36">
              <div className="bg-gray-900 rounded-xl py-10">
                <div className="mx-10">
                  <div className="text-3xl font-extrabold text-blue-600 mb-6">
                    Register
                  </div>
                  <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="Name mb-5">
                      <label
                        htmlFor="input-name"
                        className="text-lg font-bold text-gray-400"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Name"
                        id="input-name"
                        name="name"
                        value={name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="email mb-5">
                      <label
                        htmlFor="input-email"
                        className="text-lg font-bold text-gray-400"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="block p-2 w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                        id="input-email"
                        name="email"
                        value={email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="password mb-5">
                      <label
                        htmlFor="input-password"
                        className="text-lg font-bold text-gray-400"
                      >
                        password
                      </label>
                      <input
                        type="password"
                        className="block p-2  w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter password"
                        id="input-password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </div>
                    <div className="avatar mb-7">
                      <label className="text-lg font-bold text-gray-400">
                        Avatar
                      </label>
                      <div className="flex justify-between">
                        <span className="preview-avatar">
                          <img
                            className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300"
                            src={avatarPreview}
                            alt="avatar preview"
                          />
                        </span>
                        <span className="upload-avatar ml-3">
                          <input
                            className="block w-full text-lg text-gray-900 bg-gray-400  border-2 border-gray-700 cursor-pointer focus:outline-none  "
                            id="input-avatar"
                            type="file"
                            name="avatar"
                            accept="images/*"
                            onChange={onChange}
                          />
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      value="Submit"
                      className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
                      disabled={loading ? true : false}
                    >
                      Register
                    </button>
                  </form>
                  <div className="flex justify-end">
                    <Link
                      to="/login"
                      className="text-base font-bold text-blue-600"
                    >
                      Already have an account?
                    </Link>
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

export default RegisterScreen;
