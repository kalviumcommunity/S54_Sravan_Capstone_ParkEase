import React from 'react'

const Details = () => {
  return (
        <div className="w-1/8  mt-0 fixed right-0 divide-y h-screen shadow-md ">
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
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              My Spaces
            </button>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 w-full focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              My Bookings
            </button>
          </div>
        </div>
      </div>
  )
}

export default Details