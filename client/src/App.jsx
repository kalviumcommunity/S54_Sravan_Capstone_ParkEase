import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from "react-router-dom";
import Map from './map/Map'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './components/Explore';

function App() {
  return (
    <>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoutes />} >
        <Route path='/explore' element={<Map />} />
        <Route path='/rent' element={<Explore />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
    </>
  )
}

export default App
