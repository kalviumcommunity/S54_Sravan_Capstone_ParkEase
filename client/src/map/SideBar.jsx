import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoCall } from "react-icons/io5";
import { AppContext } from "../context/ProviderContext";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const SideBar = ({ data, onFocusMarker }) => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const { searchTerm, setSearchTerm } = useContext(AppContext);
  const [filteredData, setFilteredData] = useState(data);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  const openModal = (elem) => {
    setSelectedDiv(elem);
    setShowBookingDetails(false);
    setFromDate(null); // Reset fromDate
    setToDate(null); // Reset toDate
    const modal = document.getElementById("my_modal_4");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedDiv(null);
    setShowBookingDetails(false);
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
    console.log("Div clicked:", elem);
    onFocusMarker([elem.location.latitude, elem.location.longitude]);
  };

  const calculateTotalCost = () => {
    if (fromDate && toDate && selectedDiv) {
      const hours = Math.abs(toDate - fromDate) / 36e5;
      setTotalCost(hours * selectedDiv.price.hourly);
    }
  };

  useEffect(() => {
    calculateTotalCost();
  }, [fromDate, toDate]);

  const handlePayment = async (event) => {
    if (
      window.confirm(
        `The total cost is ₹${totalCost.toFixed(
          2
        )}. Do you want to proceed to payment?`
      )
    ) {
      const amount = Math.round(totalCost * 100);
      const currency = "INR";
      const receiptId = "1234567890";

      try {
        const order = await axios.post(
          "http://localhost:3003/payment/order",
          {
            amount,
            currency,
            receipt: receiptId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("order order ", order.data);
        const options = {
          key: "rzp_test_OZ7AqYammx4KXp",
          amount: amount,
          currency: currency,
          name: "Parkez",
          image: "https://static.vecteezy.com/system/resources/previews/009/653/577/original/parking-icon-logo-illustration-car-parking-symbol-template-for-graphic-and-web-design-collection-free-vector.jpg",
          order_id: order.data.id,
          description: "Test Transaction",
          handler: async function (response) {
            const body = { ...response };
            console.log("body", body);
            try {
              const validateResponse = await axios.post(
                "http://localhost:3003/payment/validate",
                JSON.stringify(body),
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const jsonResponse = validateResponse.data;
              console.log("jsonResponse", jsonResponse);
              toast.success("Payment Successful: " + jsonResponse.paymentId, {
                position: "top-center"
              });
            } catch (error) {
              console.error("Error validating response:", error);
              toast.error("Payment Validation Failed", {
                position: "top-center"
              });
            }
          },
          prefill: {
            name: "",
            email: "user@parkez.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
          toast.error("Payment Failed", {
            position: "top-center"
          });
        });

        rzp1.open();
        event.preventDefault();
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Error creating payment order", {
          position: "top-center"
        });
      }
    }
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
            <div className="bg-white z-10 rounded-md md:flex ">
              <div>
                <img src={selectedDiv.images[0]} className="w-96" alt="" />
              </div>
              <div className="text-center flex flex-col justify-between p-4">
                <div className="text-start">
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
                {showBookingDetails && (
                  <div className="bg-white z-10 rounded-md text-start mt-3 text-center">
                    <div className="">
                      <label className="text-purple-600 text-md font-medium text-gray-900 dark:text-white">
                        From :{" "}
                      </label>
                      <DatePicker
                        className="input input-bordered input-info w-full max-w-xs"
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="mr-5 text-green-600 text-md font-medium text-gray-900 dark:text-white">
                        To :{" "}
                      </label>
                      <DatePicker
                        className="input input-bordered input-info w-full max-w-xs"
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                      />
                    </div>
                  </div>
                )}
                <div className="m-3 ml-4 flex justify-between">
                  <button
                    className="bg-blue-600 glass btn  hover:bg-blue-500 text-white rounded-lg"
                    style={{ width: `${showBookingDetails ? "50%" : "100%"}` }}
                  >
                    <a
                      href={`https://maps.google.com/?daddr=${selectedDiv.location.latitude},${selectedDiv.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </button>
                  {showBookingDetails && (
                    <button
                      className="btn btn-outline btn-error w-[45%] text-white font-semibold rounded-lg"
                      onClick={handlePayment}
                    >
                      Pay ₹ {totalCost.toFixed(2)}
                    </button>
                  )}
                </div>
                <div className="pl-4">
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
            <div className="modal-action bg-slate-100 p-2 m-0">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <div className="absolute bottom-7 left-12 flex items-center">
                  <div className="avatar online">
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                  <p className="pl-2 text-sm font-medium">Listed 12 days ago</p>
                </div>
                <button className="btn btn-sm bg-white border-cyan-700">
                  <IoCall />
                  {selectedDiv.owner.contact}
                </button>
                <button
                  className="btn btn-outline btn-sm ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowBookingDetails(true);
                  }}
                >
                  Book
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SideBar;
