import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newProduct, clearErrors } from "../actions/ProductAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/layout/MetaData";
import SideBar from "../components/layout/SideBar";
import Loader from "../components/Loader";
import { NEW_PRODUCT_RESET } from "../constants/ProductConstants";

function NewProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/admin/products");
      window.alert("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [error, dispatch, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="grid grid-cols-12 ">
            <div className="col-span-3">
              <SideBar />
            </div>
            <div className="col-span-9">
              <div className="max-w-screen-sm mx-auto mb-10">
                <div className="mx-20 mt-7">
                  <div className="bg-gray-900 rounded-xl py-10">
                    <div className="mx-10">
                      <div className="text-3xl font-extrabold text-blue-600 mb-4">New Product</div>
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >F
                        <div className="Name mb-4">
                          <label
                            htmlFor="input-name"
                            className="text-lg font-bold text-gray-400"
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            className="block p-2 md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Name"
                            id="input-name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="price mb-4">
                          <label
                            htmlFor="input-price"
                            className="text-lg font-bold text-gray-400"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            className="block p-2 md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                            id="input-price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="description mb-4">
                          <label
                            htmlFor="input-description"
                            className="text-lg font-bold text-gray-400"
                          >
                            Description
                          </label>
                          <textarea
                            type="description"
                            className="block p-2  md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter description"
                            id="input-description"
                            name="description"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="category mb-4">
                          <label
                            htmlFor="input-category"
                            className="text-lg font-bold text-gray-400"
                          >
                            Category
                          </label>
                          <select
                            className="block p-2 md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter category"
                            id="input-category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="stock mb-4">
                          <label
                            htmlFor="input-stock"
                            className="text-lg font-bold text-gray-400"
                          >
                            Stock
                          </label>
                          <input
                            type="number"
                            className="block p-2 md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter stock"
                            id="input-stock"
                            name="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </div>
                        <div className="seller mb-4">
                          <label
                            htmlFor="input-seller"
                            className="text-lg font-bold text-gray-400"
                          >
                            Seller Name
                          </label>
                          <input
                            type="name"
                            className="block p-2 md:w-full text-gray-900 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter seller"
                            id="input-seller"
                            name="seller"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                          />
                        </div>

                        <div className="avatar mb-6">
                          <label className="text-lg font-bold text-gray-400">Images</label>
                          <div className="">
                            <input
                              className="block w-full text-lg text-gray-900 bg-gray-400  border-2 border-gray-700 cursor-pointer focus:outline-none  "
                              id="input-images"
                              type="file"
                              name="images"
                              onChange={onChange}
                              multiple
                            />
                          </div>
                        </div>
                        <div className="preview-images mb-4">
                          {imagesPreview.map((img) => (
                            <img
                              key={img}
                              className="p-1 w-12 h-12  ring-2 ring-gray-300"
                              src={imagesPreview}
                              alt="img"
                            />
                          ))}
                        </div>

                        <button
                          type="submit"
                          value="Submit"
                          className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
                          disabled={loading ? true : false}
                        >
                          CREATE
                        </button>
                      </form>
                    </div>
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

export default NewProductScreen;
