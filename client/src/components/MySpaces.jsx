import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ProviderContext";
import axios from "axios";

const MySpaces = () => {
  const { userInfo } = useContext(AppContext);
  const clerkUserId = userInfo?.id;
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(
          `https://parkez-server.vercel.app/users/${clerkUserId}/spaces`
        );
        setSpaces(response.data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, [clerkUserId]);

  return (
    <div>
      <div className="max-w-screen-xl mt-20 mx-auto p-4">
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-center font-mono">
            My Spaces
          </h2>
          <div className="flex mb-4 justify-center">
            <div className="flex overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
              <button
                role="tab"
                type="button"
                className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-blue-500 shadow bg-white dark:text-white dark:bg-blue-500"
                aria-selected=""
              >
                Created
              </button>

              <button
                role="tab"
                type="button"
                className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset hover:text-gray-800 focus:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
              >
                Booked
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.length > 0 &&
            spaces.map((space) => (
              <div
                key={space._id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={space.images[0]}
                  alt="Parking Space Thumbnail"
                  className="rounded-lg mb-4 h-52"
                />
                <h3 className="text-xl font-bold mb-2">
                  {space.owner.name}
                </h3>
                <p className="text-gray-700 mb-2">{space.location.address}</p>
                <p className="text-gray-700 mb-2">
                  {space.price.amount} {space.price.hourly} INR/hour
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-green-500">{space.availability}</p>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <div class="bg-white rounded-lg shadow-md p-4">
            <img
              src="https://placehold.co/300x200"
              alt="Parking Space Thumbnail"
              class="rounded-lg mb-4"
            />
            <h3 class="text-xl font-bold mb-2">Park Inn</h3>
            <p class="text-gray-700 mb-2">Nakodar Road, Jalandhar, Punjab</p>
            <p class="text-gray-700 mb-2">70 INR/hour</p>
            <div class="flex justify-between items-center">
              <p class="text-gray-700">Upcoming</p>
              <div class="flex space-x-2">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Cancel Booking
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpaces;
