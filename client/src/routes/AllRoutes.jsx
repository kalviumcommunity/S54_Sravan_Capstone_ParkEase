import React, { Profiler } from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../loginComponents/Profile"
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import HomePage from "../components/HomePage";
import Test from "../components/Test";
import FileUpload from "../components/FileUpload";

const AllRoutes = () => {
  return (
    <div className="">
       <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/garage" element={<FileUpload />} />
        <Route path="/his" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default AllRoutes;
