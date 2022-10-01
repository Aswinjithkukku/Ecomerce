import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios';
import ProtectedRoutes from './components/routes/ProtectedRoutes';

import { loadUser } from './actions/UserAction'
import store from './Store'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import LoginScreen from './screens/LoginScreen';
import Me from './screens/Me';
import ProductDetailScreens from './screens/ProductDetailScreens';
import RegisterScreen from './screens/RegisterScreen';
import UpdateProfile from './screens/UpdateProfile';
import UpdatePassword from './screens/UpdatePassword';
import ForgotPassword from './screens/ForgotPassword';
import NewPassword from './screens/NewPassword';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import ConfirmOrders from './screens/ConfirmOrders';
import PaymentScreen from './screens/PaymentScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import ListOrderScreen from './screens/ListOrderScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import DashboardScreen from './AdminScreens/DashboardScreen';
import ProductListScreen from './AdminScreens/ProductListScreen';
import NewProductScreen from './AdminScreens/NewProductScreen';
import UpdateProductScreen from './AdminScreens/UpdateProductScreen';
import OrderListScreen from './AdminScreens/OrderListScreen';
import ProcessOrderScreen from './AdminScreens/ProcessOrderScreen';



function App() {

  const [ stripeApiKey, setStripeApiKey ] = useState('')

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } =  await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
  
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-2xl mx-auto'>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:keyword' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetailScreens />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/me' element={<Me />} />
        <Route path='/me/update' element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<NewPassword />} />

        <Route path='/cart' element={<CartScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/order/confirm' element={<ConfirmOrders />} />  

          <Route path='/payment' element={ stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PaymentScreen />
            </Elements> } >
          </Route>

        <Route path='/order/success' element={<OrderSuccessScreen />} />  
        <Route path='/orders/me' element={<ListOrderScreen />} />  
        <Route path='/order/:id' element={<OrderDetailsScreen />} />  

        <Route path='/dashboard' element={<DashboardScreen />} />  
        <Route path='/admin/products' element={<ProductListScreen />} />  
        <Route path='/admin/product' element={<NewProductScreen />} />  
        <Route path='/admin/product/:id' element={<UpdateProductScreen />} />  
        <Route path='/admin/orders' element={<OrderListScreen />} />  
        <Route path='/admin/order/:id' element={<ProcessOrderScreen />} />  

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
