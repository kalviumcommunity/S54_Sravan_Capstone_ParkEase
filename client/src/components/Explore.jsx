import React, { useState } from "react";
import pin from "../assets/Pin.svg";
import { CiSearch } from "react-icons/ci";
import data from "./data";
import { PiPlusBold } from "react-icons/pi";
import Form from "./Form";


const Explore = () => {

  return (
    <>
      <div className="w-4/5 mt-24 absolute right-0">
        <div className="w-100lvw text-center">
          <div className="join bg-white rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full max-w-3xl my-6 mx-auto">
            <input
              type="text"
              placeholder="Type here"
              className="input input-ghost w-full focus:outline-none focus:border-none focus:rounded-full"
            />
            <div className=" join-item rounded-r-full text-black p-3 bg-yellow-400">
              <CiSearch className="size-6" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data.map((space, index) => (
            <div
              key={index}
              className="card card-compact w-96 h-80 bg-base-100 shadow-xl relative"
            >
              <img
                src={space.image}
                alt="Parking Space"
                className="size-full rounded-md"
              />
              <div className="card-body absolute bottom-4 w-5/6 left-8 rounded-md bg-white">
                <h2 className="card-title">{space.name}</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <img src={pin} className="size-4 mr-2" alt="" />
                    <p>{space.address}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-red-500 font-bold">
                      ₹ {space.price} <span className="text-black"> / day</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">⭐ {space.rating}</p>
                  </div>
                </div>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary my-8">See All Spaces</button>
      </div>

      <div className="w-1/8  mt-24 fixed divide-y h-screen shadow-md">
        <div className="h-4/5 my-6 mx-4">
          <div className="border-b-1">
            <p className="font-semibold p-3">Filters</p>
          </div>
          <hr />
          <div className="divide-y">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Recommended </span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Available</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Price</span>
              </label>
            </div>
            <input
              type="range"
              min={0}
              max="100" defaultValue={0}  step="25"
              className="range range-primary"
            
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>₹150</span>
              <span>₹200</span>
              <span>₹250</span>
              <span>₹300</span>
              <span>more</span>
            </div>
            <div className="border-b-1 mt-4">
              <p className="font-semibold p-3">Rating</p>
            </div>
            <div>
              <input
                type="range"
                min={0}
                defaultValue="0"
                max="100"
                className="range"
                step="25"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>1⭐</span>
                <span>2⭐</span>
                <span>3⭐</span>
                <span>4⭐</span>
                <span>5⭐</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-20 bottom-0">
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              My Spaces
            </button>
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              My Bookings
            </button>
          </div>
        </div>
      </div>
      <div>
        <PiPlusBold className="bg-white size-12 rounded-full fixed bottom-4 right-8 p-2 z-50 hover:scale-110 hover:bg-gray-100
        hover:cursor-pointer"
        onClick={() => document.getElementById("my_modal_1").showModal()} />
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box p-0">
          <div className="modal-action m-0">
            <form method="dialog">
                <Form />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Explore;
