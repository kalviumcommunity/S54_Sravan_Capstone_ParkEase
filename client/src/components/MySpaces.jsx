import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ProviderContext";
import axios from "axios";

const MySpaces = () => {
  const { userInfo } = useContext(AppContext);
  const clerkUserId = userInfo?.id;
  const [spaces, setSpaces] = useState([]);
  const [bookedSpaces, setBookedSpaces] = useState([]);
  const [activeTab, setActiveTab] = useState("created");

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

    if (activeTab === "created") {
      fetchSpaces();
    }
  }, [clerkUserId, activeTab]);

  useEffect(() => {
    const fetchBookedSpaces = async () => {
      try {
        const response = await axios.get(
          `https://parkez-server.vercel.app/users/${clerkUserId}/booked-spaces`
        );
        setBookedSpaces(response.data);
      } catch (error) {
        console.error("Error fetching booked spaces:", error);
      }
    };

    if (activeTab === "booked") {
      fetchBookedSpaces();
    }
  }, [ activeTab]);

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
                className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${activeTab === "created" ? "text-blue-500 shadow bg-white dark:text-white dark:bg-blue-500" : "hover:text-gray-800 focus:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"}`}
                onClick={() => setActiveTab("created")}
              >
                Created
              </button>

              <button
                role="tab"
                type="button"
                className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${activeTab === "booked" ? "text-blue-500 shadow bg-white dark:text-white dark:bg-blue-500" : "hover:text-gray-800 focus:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"}`}
                onClick={() => setActiveTab("booked")}
              >
                Booked
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "created" && spaces.length > 0 &&
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
         {activeTab === "booked" && bookedSpaces.length > 0 &&
  bookedSpaces.map((booking) => {
    // Calculate the duration in hours and round it
    const durationInHours = Math.round(booking.duration / 60); // assuming duration is in minutes

    // Format the createdAt date
    const formattedCreatedAt = new Date(booking.createdAt).toLocaleString();

    return (
      <div
        key={booking._id}
        className="bg-white rounded-lg shadow-md p-4"
      >
        <img
          src={booking.parkingSpace.images[0]}
          alt="Parking Space Thumbnail"
          className="rounded-lg mb-4 h-52"
        />
        <h3 className="text-xl font-bold mb-2">
          {booking.parkingSpace.owner.name}
        </h3>
        <p className="text-gray-700 mb-2">{booking.parkingSpace.location.address}</p>
        <p className="text-gray-700 mb-2">
  Duration: {Math.ceil(booking.duration)} hour{Math.ceil(booking.duration) !== 1 ? 's' : ''}
</p>

        <div className="flex justify-between">
        <p className="text-gray-700 mb-2">
          Booked At: {formattedCreatedAt} 
        </p>
        <p className="text-red-700 mb-2">
           Paid: ₹{Math.round(booking.amountPaid)}
        </p>
        </div>
      </div>
    );
  })}

        </div>
      </div>
    </div>
  );
};

export default MySpaces;
