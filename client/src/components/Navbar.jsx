import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { PiGarageLight } from "react-icons/pi";
import { PiHourglassThin } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className=''>

        <div className="h-screen bg-inherit  w-full flex flex-col justify-around items-center">
  {/* <p className="text-white text-xl font-bold mb-16"></p> */}

  <ul className="flex flex-col space-y-8 ">
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md ">
        <div className='flex justify-between  items-center w-auto'>

      <GrHomeRounded  className='mr-3' />
      Home
        </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
      <PiGarageLight  className='mr-3' />
      Garage
  </div>
</button>
     

    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
    <PiHourglassThin  className='mr-3'/>
    History
  </div>
</button>
    </li>
    <li>
      <button className="text-white w-full hover:text-blue-300 hover:bg-white  px-16 py-2 rounded-md">
      <div className='flex justify-between  items-center'>
        <IoWalletOutline  className='mr-3' />
        Wallet
      </div>
</button>
    </li>
  </ul>
</div>
    </div>
  )
}

export default Navbar