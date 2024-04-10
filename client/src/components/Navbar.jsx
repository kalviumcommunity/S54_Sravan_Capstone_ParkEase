import React from 'react'
import { GoHome } from "react-icons/go";
import { PiGarage } from "react-icons/pi";
import { PiHourglassHigh } from "react-icons/pi";
import { BiWallet } from "react-icons/bi";
import logo from "../assets/altlogo.png"
import Login from "../loginComponents/Login";
import Logout from "../loginComponents/Logout";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
    <div className='hidden md:block'>

        <div className="h-screen bg-inherit  w-full flex flex-col justify-around items-center">
  {/* <p className="text-white text-xl font-bold mb-16"></p> */}
    <img src={logo} className='' alt="parkeaselogo" />
  <ul className="flex flex-col space-y-8 ">
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md ">
        <div className='flex justify-between  items-center w-auto'>
      <GoHome size={"20px"}  className='mr-3' />
      Home
        </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      <PiGarage size={"20px"}  className='mr-3'/>
      Garage
  </div>
</button>
     

    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      <PiHourglassHigh size={"20px"} className='mr-3'/>
    History
  </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
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
    <div className='h-10 bg-inherit bg-white w-full fixed flex justify-around items-center bottom-0 z-50 md:hidden '>
        <div className='sm:flex text-xs'>
          <Link to={'/'}>
          <GoHome size={"20px"}  className='m-auto' />Home
          </Link>
          </div>
        <div className='sm:flex text-xs'>
          <Link to={"/test"}>
            <PiGarage size={"20px"}  className='m-auto' />Garage
          </Link>
          </div>
        <div className='sm:flex text-xs'>
          <Link to={"/his"}>
          <PiHourglassHigh size={"20px"}  className='m-auto' />History
          </Link>
          </div>
        <div className='sm:flex text-xs'  >
         <Link to={'/profile'}>
          <BiWallet size={"20px"}  className='m-auto' />Wallet
         </Link>
          </div>
    </div>
    </>
  )
}

export default Navbar