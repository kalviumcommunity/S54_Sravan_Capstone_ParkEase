import React from "react";
import { Route, Routes } from "react-router-dom";

// import Navbar from "../components/Navbar";
import Home from "../components/Home";

const AllRoutes = () => {
  return (
    <div className="">
       <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/nav" element={<Navbar />} /> */}
      
      </Routes>
    </div>
  )
}

export default AllRoutes;
