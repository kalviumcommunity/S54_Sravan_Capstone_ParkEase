import React, { useEffect, useRef, useState } from "react";
import park1 from "../assets/Park1.jpg";
import img from "../assets/carouselbtn.png";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { BiUser } from "react-icons/bi";
import AllRoutes from "../routes/AllRoutes";
import AddSpace from "./AddSpace";

const SkeletonLoader = () => (
  <div className="mx-2 px-5 py-4 w-48 h-60 borderShad md:relative mr-10 my-3">
    <div className="font-semibold text-sm py-2 bg-gray-200 animate-pulse" />
    <div className="rounded-lg my-2 h-28 bg-gray-300 animate-pulse" />
    <div className="text-xs bg-gray-200 animate-pulse">
      <div className="h-4 w-24 mb-1 bg-gray-300" />
      <div className="h-4 w-36 bg-gray-300" />
    </div>
    <button className=" mt-2  font-semibold py-1 w-36 rounded-full border-none animate-pulse">
      Park
    </button>
  </div>
);

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [data, setData] = useState([]);
  const cardsContainerRef = useRef(null);

  // function to handle scrolling
  const handleScroll = () => {
    if (cardsContainerRef.current) {
      const cardWidth = 48 + 2 * 2 + 5 * 2;
      const scrollDistance = 5 * cardWidth;

      cardsContainerRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      const spaces = await axios.get(
        "https://parkez-server.vercel.app/spaces/all"
      );
      setData(spaces.data);
    };
    fetchSpaces();
  }, []);

  return (
    <div className="h-screen ">
      <div className=" flex h-1/5 justify-between items-center mt-6 px-12">
        <div className="h-36 w-130  py-8 text-white bg-inherit">
          <h1 className="text-4xl font-semibold">
            Welcome !{" "}
            <span className="text-2xl"> {isAuthenticated && user.name} </span>
          </h1>
          <p className="text-white-100 text-slate-300">
            Safely Park your vehicles
          </p>
        </div>
        {isAuthenticated ? (
          <div>
            <img
              className="size-14 rounded-full"
              src={user.picture}
              alt={user.name}
            />
          </div>
        ) : (
          <BiUser className="size-14" />
        )}
      </div>
      <div className="bg-white  rounded-tl-3xl">
        <div className=" pt-10 pl-12 pr-6">
          <AllRoutes />
          <div className="flex justify-between">
            <div>
              <p className="text-2xl font-bold">Recently Parked</p>
              <p className="text-xs text-gray-400">List of Recently Parked</p>
            </div>
            <div>
              <AddSpace />
            </div>
          </div>

          <div className="flex w-full mb-5  overflow-scroll ">
            <div className="flex overflow-scroll" ref={cardsContainerRef}>
              {data.length !== 0 ? (
                data.map((elem) => (
                  <div
                    className="mx-2 px-5 py-4 w-48 h-60 borderShad md:relative mr-10 my-3"
                    key={elem._id}
                  >
                    <h1 className="font-semibold text-sm py-2">
                      {elem.address}
                    </h1>
                    <img
                      src={elem.image[0] || ""}
                      className="rounded-lg my-2 h-28"
                      alt="parking Space"
                    />
                    <p className="text-xs ">{elem.description}</p>
                    <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-semibold py-1 w-36 rounded-full border-none">
                      Park
                    </button>
                  </div>
                ))
              ) : (
                Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonLoader key={index} />
                ))
              )}
            </div>

            <img
              src={img}
              className="size-20  relative  top-20 -translate-x-8"
              alt="carouselbtn"
              onClick={handleScroll}
            />
          </div>

          <p className="text-2xl font-bold">Nearby Parking Slots </p>
          <p className="text-xs text-gray-400">List of Nearby Parking Slots</p>
          <div className="flex w-full overflow-scroll">
            {data.length !== 0 ? (
              data.map((elem) => (
                <div
                  className="w-48 h-68 px-5 pt-8  borderShad mr-10 my-5"
                  key={elem._id}
                >
                  <img
                    src={park1}
                    className="rounded-lg h-28"
                    alt="parkingspace"
                  />
                  <button className="bg-blue-500 my-4 hover:bg-blue-700 text-white font-semibold py-1 w-36 rounded-full border-none">
                    Park
                  </button>
                </div>
              ))
            ) : (
              Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonLoader />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
 