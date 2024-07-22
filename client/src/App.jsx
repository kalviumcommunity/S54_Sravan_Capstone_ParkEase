import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Map from './map/Map'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './components/Explore';
import { SignUp } from '@clerk/clerk-react';


function App() {
  const location = useLocation();
  return (
    <>
    <div className={`grid place-items-center ${location.pathname=="/sign-up" && `pt-24`}`}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ProtectedRoutes element={<Map />} />} />
        <Route path='/rent' element={<ProtectedRoutes element={<Explore />} />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes> 
      <ToastContainer />
    </div>
    </>
  )
}

export default App
