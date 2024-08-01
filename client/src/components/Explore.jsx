import React, { useContext, useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import Form from "./Form";
import axios from "axios";
import { AppContext } from "../context/ProviderContext";
import { toast } from "react-toastify";

const Explore = () => {
  const [spacesData, setSpacesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Added, userInfo } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://parkez-server.vercel.app/spaces/all"
        );
        setSpacesData(response.data);
        setLoading(false); // data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data", {
          position: "top-center"
        });
      }
    };

    fetchData();
  }, [Added]);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen bg-img text-center md:text-left">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <img
            src="https://media.istockphoto.com/id/1217060814/vector/parking-lot-background-3d-render-of-car-park-with-empty-wall-wall-graphic-background.jpg?s=612x612&w=0&k=20&c=z6GP9bZMt_0SXGW4fJrq1OD2dTiDaplw5CUx6k7XRcM="
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold">
              Make money by <br /> renting out your space{" "}
            </h1>
            <p className="py-8 font-semibold">
              Start earning money by listing your space / spot in our platform.
            </p>
            <button
              className="btn btn-outline btn-md text-lg "
              onClick={() => document.getElementById("my_modal_1").showModal()}>
              Get Started
              <svg class="w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        viewBox="0 0 24 24" className="w-6 h-6 ml-2">
        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <PiPlusBold
          className="bg-white size-12 rounded-full fixed bottom-12 right-28 p-2 z-50 hover:scale-110 hover:bg-gray-100
        hover:cursor-pointer"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        />
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box p-0 ">
          <div className="modal-action flex justify-normal p-4">
            <Form method="dialog" />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Explore;