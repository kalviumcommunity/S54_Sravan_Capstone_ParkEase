import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoCall } from "react-icons/io5";
import { AppContext } from "../context/ProviderContext";

const SideBar = ({ data, onFocusMarker }) => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  const [filteredData, setFilteredData] = useState(data);

  const openModal = (elem) => {
    setSelectedDiv(elem);
    console.log(elem);
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedDiv(null);
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.close();
  };

  const handleSearch = () => {
    const filtered = data.filter((elem) =>
      elem.location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [data, searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDivClick = (elem) => {
    console.log("Div clicked:", elem); // Add this line
    onFocusMarker([elem.location.latitude, elem.location.longitude]);
  };

  return (
    <div>
      <div className="w-1/4 mt-20 fixed right-0 divide-y h-screen shadow-md">
        <div className="h-4/5 mb-3 mx-2 bg-white overflow-auto">
          <div className="join bg-white rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full max-w-3xl my-6 mx-auto">
            <input
              type="text"
              placeholder="Type here"
              className="input input-ghost w-full focus:outline-none focus:border-none focus:rounded-full"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <div
              className="join-item rounded-r-full text-black p-3 bg-yellow-400 cursor-pointer"
              onClick={handleSearch}
            >
              <CiSearch className="size-6" />
            </div>
          </div>
          {filteredData.length > 0 ? (
            filteredData.map((elem, index) => (
              <div
                key={index}
                className="m-2 shadow-md rounded-md hover:scale-105 cursor-pointer"
                onClick={() => handleDivClick(elem)}
              >
                <h3 className="bg-blue-500 text-lg p-1 text-white rounded-t-md">
                  {elem.location.address}
                </h3>
                <div className="flex justify-around text-3xl p-3">
                  <p className="">₹{elem.price.hourly}</p>
                  <button
                    className="text-blue-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-100 font-semibold rounded-md text-sm px-2 py-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(elem);
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No Places Exist
            </div>
          )}
        </div>
      </div>
      {selectedDiv && (
        <dialog id="my_modal_4" className="modal m-0">
          <div className="modal-box w-11/12 max-w-4xl m-0">
            <div className="bg-white  z-10 rounded-md md:flex ">
              <div>
                <img src={selectedDiv.images[0]} className="w-96" alt="" />
              </div>
              <div className="text-center flex flex-col justify-between">
                <div className="text-start p-4">
                  <h2 className="text-xl mb-2">{selectedDiv.owner.name}</h2>
                  <p className="text-2xl font-semibold mb-4">
                    {selectedDiv.price.hourly} INR/hour
                  </p>
                  <p>
                    {selectedDiv.features.map((elem, index) => (
                      <span key={index}>{elem.toUpperCase()} | </span>
                    ))}
                  </p>
                </div>
                <button className="bg-blue-600 glass mx-8 btn hover:bg-blue-500 text-white rounded">
                  <a
                    href={`https://maps.google.com/?daddr=${selectedDiv.location.latitude},${selectedDiv.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </button>
                <div className="p-4">
                  <p className="flex items-center">
                    {" "}
                    <span className="pr-2">
                      <SlLocationPin />
                    </span>
                    {selectedDiv.location.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-action bg-slate-100	p-2 m-0">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <div className=" absolute bottom-7 left-12 flex items-center">
                  <div className="avatar online">
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="pl-2 text-sm font-medium">Listed 12 days ago</p>
                </div>
                <button className="btn btn-sm bg-white border-cyan-700	 ">
                  <IoCall />
                  {selectedDiv.owner.contact}
                </button>
                <button className="btn btn-outline btn-sm ml-2">Book </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SideBar;
