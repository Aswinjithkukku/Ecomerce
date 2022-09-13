import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoutes from './components/routes/ProtectedRoutes';

import { loadUser } from './actions/UserAction'
import store from './Store'

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


function App() {
  useEffect(() => {
    store.dispatch(loadUser())
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
