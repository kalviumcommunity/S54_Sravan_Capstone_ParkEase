import React, { useContext, useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import Form from "./Form";
import axios from "axios";
import { AppContext } from "../context/ProviderContext";

const SkeletonLoading = () => (
  <div className="flex flex-col gap-4 w-96 h-80">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);

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
      }
    };

    fetchData();
  }, [Added]);

  return (
    <>
      <div className="hero bg-base-200 min-h-screen bg-img">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://media.istockphoto.com/id/1217060814/vector/parking-lot-background-3d-render-of-car-park-with-empty-wall-wall-graphic-background.jpg?s=612x612&w=0&k=20&c=z6GP9bZMt_0SXGW4fJrq1OD2dTiDaplw5CUx6k7XRcM="
            className="max-w-md rounded-lg shadow-2xl"
          />
          <div className="">
            <h1 className="text-6xl font-bold">
              Make money by <br /> renting out your space{" "}
            </h1>
            <p className="py-8 font-semibold">
              Start earning money by listing your space / spot in our platform.
            </p>
            <button
              className="btn btn-outline btn-lg "
              onClick={() => document.getElementById("my_modal_1").showModal()}>
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div>
        <PiPlusBold
          className="bg-white size-12 rounded-full fixed bottom-4 right-8 p-2 z-50 hover:scale-110 hover:bg-gray-100
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