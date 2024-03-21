import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nav" element={<Navbar />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
