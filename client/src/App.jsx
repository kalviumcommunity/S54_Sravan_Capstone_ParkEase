import { useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload'
// import Bg from './components/Bg'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Explore from './components/Explore'
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      {/* <ImageUpload /> */}
      <Navbar />
      {/* <Home /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
      </Routes>
    </div>
    </>
  )
}

export default App
