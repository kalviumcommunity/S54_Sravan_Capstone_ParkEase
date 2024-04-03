import React from 'react'
import { GoHome } from "react-icons/go";
import { PiGarage } from "react-icons/pi";
import { PiHourglassHigh } from "react-icons/pi";
import { BiWallet } from "react-icons/bi";
import logo from "../assets/altlogo.png"
import Login from "../loginComponents/Login";
import Logout from "../loginComponents/Logout";
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className=''>

        <div className="h-screen bg-inherit  w-full flex flex-col justify-around items-center">
  {/* <p className="text-white text-xl font-bold mb-16"></p> */}
    <img src={logo} className='' alt="" />
  <ul className="flex flex-col space-y-8 ">
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md ">
        <div className='flex justify-between  items-center w-auto'>
      {/* <img className='mr-3'  src={icon1}/> */}
      <GoHome size={"20px"}  className='mr-3' />
      Home
        </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      {/* <img className='mr-3'  src={icon2}/> */}
      <PiGarage size={"20px"}  className='mr-3'/>
      Garage
  </div>
</button>
     

    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      {/* <img className='mr-3'  src={icon3}/> */}
      <PiHourglassHigh size={"20px"} className='mr-3'/>
    History
  </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      {/* <img className='mr-3'  src={icon4}/> */}
      <BiWallet size={"18px"}  className='mr-3'/>
        Wallet
      </div>
</button>
    </li>
    <li>
      <div className='flex justify-center'>

    {isAuthenticated ? <Logout /> : <Login /> }
      </  div>
    </li>
  </ul>
   
</div>
    </div>
  )
}

export default Navbar