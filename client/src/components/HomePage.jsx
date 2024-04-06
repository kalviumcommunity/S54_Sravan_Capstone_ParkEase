import React, { useEffect, useRef, useState } from 'react'
import park1 from '../assets/Park1.jpg'
import img from '../assets/carouselbtn.png'
import axios from 'axios';
// import data from '../dummydata.json'
import { useAuth0 } from "@auth0/auth0-react";
import { BiUser } from "react-icons/bi";
import AddSpace from './AddSpace';

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [data,setData] = useState([]);
  const cardsContainerRef = useRef(null);

  // function to handle scrolling
  const handleScroll = () => {
    if (cardsContainerRef.current) {
    // the width of a single card
    const cardWidth = 48 + 2 * 2 + 5 * 2; // width + horizontal margins + padding
    // distance to scroll
    const scrollDistance = 5 * cardWidth;

    // Scrolling the container by the calculated distance
    cardsContainerRef.current.scrollBy({
      left: scrollDistance,
      behavior: 'smooth' 
    });
  }
  };

  useEffect(()=>{
    const fetchSpaces = async()=>{
        const spaces = await axios.get("https://parkez-server.vercel.app/spaces/all")
        // const spaces = await axios.get("http://localhost:3003/spaces/all")
        setData (spaces.data)
        console.log(spaces.data)
    }
    fetchSpaces()
  },[])



  return (
    <div className='h-screen '>
        <div className=' flex h-1/5 justify-between items-center mt-6 px-12'>
        <div className='h-36 w-130  py-8 text-white bg-inherit'>
            <h1 className='text-4xl font-semibold'>Welcome ! <span className='text-2xl'> {isAuthenticated && user.name} </span></h1>
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
        <div className='bg-white  rounded-tl-3xl'> 
        <div className=' pt-10 pl-12 pr-6'>

        <div className='flex justify-between'>

        <div>
        <p  className='text-2xl font-bold' >Recently Parked</p >
        <p className='text-xs text-gray-400'>List of Recently Parked</p>
        </div>
        <div>
        <AddSpace />
        </div>
        </div>
       
        <div className='flex w-full mb-5  overflow-scroll '>
          <div className='flex overflow-scroll ' ref={cardsContainerRef} >

          {
            data.map((elem)=>{
              return (
                <div className=' mx-2 px-5 py-4 w-48 h-60 borderShad relative mr-10 my-3' key={elem._id}>
          <h1 className='font-semibold text-sm py-2'>{elem.address} </h1>
          <img src={elem.image[0]} className='rounded-lg my-2 h-28' alt="" />
          <p className='text-xs '>{elem.description}</p>
          <button className='bg-blue-500 mt-2 hover:bg-blue-700 text-white font-semibold py-1 w-36 rounded-full border-none'>Park</button>
        </div>
              )
            })
          }
          </div>
          {/* scroll button  */}
          <img src={img}  className='size-20  relative  top-20 -translate-x-8' alt="carouselbtn" onClick={handleScroll} />

        </div>


        <p  className='text-2xl font-bold' >Nearby Parking Slots </p >
        <p className='text-xs text-gray-400'>List of Nearby Parking Slots</p>
        <div className='flex w-full overflow-scroll'>
          {
            data.map((elem)=>{
              return (

        <div className='w-48 h-68 px-5 pt-8  borderShad mr-10 my-5' key={elem._id}>
          <img src={park1} className='rounded-lg h-28' alt="" />
          {/* <h1 className='font-semibold text-sm py-0.5 ml-1'>{elem.address} </h1> */}
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
