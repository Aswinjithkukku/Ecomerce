import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

import { loadUser } from "./actions/UserAction";
import store from "./Store";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import LoginScreen from "./screens/LoginScreen";
import Me from "./screens/Me";
import ProductDetailScreens from "./screens/ProductDetailScreens";
import RegisterScreen from "./screens/RegisterScreen";
import UpdateProfile from "./screens/UpdateProfile";
import UpdatePassword from "./screens/UpdatePassword";
import ForgotPassword from "./screens/ForgotPassword";
import NewPassword from "./screens/NewPassword";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ConfirmOrders from "./screens/ConfirmOrders";
import PaymentScreen from "./screens/PaymentScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import ListOrderScreen from "./screens/ListOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import DashboardScreen from "./AdminScreens/DashboardScreen";
import ProductListScreen from "./AdminScreens/ProductListScreen";
import NewProductScreen from "./AdminScreens/NewProductScreen";
import UpdateProductScreen from "./AdminScreens/UpdateProductScreen";
import OrderListScreen from "./AdminScreens/OrderListScreen";
import ProcessOrderScreen from "./AdminScreens/ProcessOrderScreen";
import UsersListScreen from "./AdminScreens/UsersListScreen";
import UpdateUserScreen from "./AdminScreens/UpdateUserScreen";
import ProductReviewsScreen from "./AdminScreens/ProductReviewsScreen";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailScreens />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route
            path="/me"
            element={
              <ProtectedRoutes>
                <Me />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/shipping"
            element={
              <ProtectedRoutes>
                <ShippingScreen />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoutes>
                <ConfirmOrders />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentScreen />
                </Elements>
              )
            }
          ></Route>

          <Route
            path="/order/success"
            element={
              <ProtectedRoutes>
                <OrderSuccessScreen />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders/me"
            element={
              <ProtectedRoutes>
                <ListOrderScreen />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoutes>
                <OrderDetailsScreen />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/dashboard"
            element={
              <AdminRoutes isAdmin={true}>
                <DashboardScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoutes isAdmin={true}>
                <ProductListScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/product"
            element={
              <AdminRoutes isAdmin={true}>
                <NewProductScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <AdminRoutes isAdmin={true}>
                <UpdateProductScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoutes isAdmin={true}>
                <OrderListScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <AdminRoutes isAdmin={true}>
                <ProcessOrderScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoutes isAdmin={true}>
                <UsersListScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <AdminRoutes isAdmin={true}>
                <UpdateUserScreen />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminRoutes isAdmin={true}>
                <ProductReviewsScreen />
              </AdminRoutes>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
