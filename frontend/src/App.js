import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ProductDetailScreens from './screens/ProductDetailScreens';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='max-w-screen-2xl mx-auto'>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetailScreens />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
