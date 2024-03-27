import React from 'react'
import park1 from '../assets/Park1.jpg'
import data from '../dummydata.json'
import { useAuth0 } from "@auth0/auth0-react";
import { BiUser } from "react-icons/bi";

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className='h-screen '>
        <div className=' flex h-1/5 justify-between items-center mt-6 px-12'>
        <div className='h-36 w-130  py-8 text-white bg-inherit'>
            <h1 className='text-4xl font-semibold'>Welcome to Parkez! {isAuthenticated && user.name}</h1>
            <p className='text-white-100 text-slate-300'>Safely Park your vehicles</p>
        </div> 
       { isAuthenticated ? (
      <div>
        <img className='size-14 rounded-full' src={user.picture} alt={user.name} />
      </div> ) :
      <BiUser className='size-14' />
        // <div className='h-12 w-12 bg-gray-300 rounded-full '></div>
      }
        </div>
        <div className='bg-white rounded-tl-3xl'> 
        <div className=' pt-10 pl-20'>

        <p  className='text-2xl font-bold' >Recently Parked</p >
        <p className='text-xs text-gray-400'>List of Recently Parked</p>
        <div className='flex overscroll-x-auto	'>
          {
            data.map((elem)=>{
              return (

        <div className='w-48 h-68 px-5 pt-8  borderShad mr-10 my-5' key={elem.id}>
          <img src={park1} className='rounded-lg h-28' alt="" />
          <h1 className='font-semibold py-0.5 ml-1'>{elem.name} </h1>
          <button className='bg-blue-500 my-4 hover:bg-blue-700 text-white font-semibold py-1 w-36 rounded-full border-none'>Park</button>
        </div>
              )
            })
          }
        </div>
        <p  className='text-2xl font-bold' >Nearby Parking Slots </p >
        <p className='text-xs text-gray-400'>List of Nearby Parking Slots</p>
        <div className='flex'>
          {
            data.map((elem)=>{
              return (

        <div className='w-48 h-68 px-5 pt-8  borderShad mr-10 my-5' key={elem.id}>
          <img src={park1} className='rounded-lg h-28' alt="" />
          <h1 className='font-semibold py-0.5 ml-1'>{elem.name} </h1>
          <button className='bg-blue-500 my-4 hover:bg-blue-700 text-white font-semibold py-1 w-36 rounded-full border-none'>Park</button>
        </div>
              )
            })
          }
        </div>
        </div>
        </div> 
    </div>
  )
}

export default HomePage