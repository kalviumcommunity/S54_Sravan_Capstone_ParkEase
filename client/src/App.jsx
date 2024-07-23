import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Map from './map/Map'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './components/Explore';
import { SignUp } from '@clerk/clerk-react';
import About from './components/About';


function App() {
  return (
    <>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ProtectedRoutes element={<Map />} />} />
        <Route path='/rent' element={<ProtectedRoutes element={<Explore />} />} />
        <Route path='/about' element={<ProtectedRoutes element={<About />} />} />
        <Route path='/sign-up' element={<div className='grid place-items-center pt-24'><SignUp /></div>} />
      </Routes> 
      <ToastContainer />
    </div>
    </>
  )
}

export default App
