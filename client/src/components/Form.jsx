import React, { useContext, useState } from "react";
import axios from "axios";
import uploadImage from "../assets/man-uploading-data.svg";
import { AppContext } from "../context/ProviderContext";

const Form = () => {
  const [formData, setFormData] = useState({
    address: "",
    price: {
      hourly: "",
      daily: "",
      monthly: ""
    },
    images: [],
    description: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(null);
  const { Added, userInfo, SetAdded, coordinates } = useContext(AppContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hourlyPrice") {
      const hourlyPrice = parseFloat(value); // Convert value to a float
      if (!isNaN(hourlyPrice)) { // Check if it's a valid number
        const dailyPrice = hourlyPrice * 24;
        const monthlyPrice = hourlyPrice * 24 * 30;

        setFormData((prevData) => ({
          ...prevData,
          price: {
            hourly: hourlyPrice,
            daily: dailyPrice,
            monthly: monthlyPrice,
          },
        }));
      }
    } else if (name === "images") {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
  
    
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...selectedFiles.map(file => URL.createObjectURL(file))]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      for(let i =0; i < files.length; i++) {
        formData.append("files", files[i]);
      }   
  
      const response = await axios.post(
        `${process.env.SERVER_URI}/fileupload/create`, formData );
  
      console.log(response.data.urls);
      setUrl(response.data.urls)
    } catch (error) {
      console.error("Error uploading the files:", error);
    }
  };
  const removeImage = (indexToRemove) => {
    // Remove image from files array
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  
    // Update formData.images as well
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the form data for space creation
      const spaceData = {
        location: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          address: formData.address
        },
        price: {
          hourly: formData.price.hourly,
          daily: formData.price.daily,
          monthly: formData.price.monthly
        },
        features: formData.description,
        owner: {
          name: userInfo.username,
          contact: userInfo.emailAddresses[0].emailAddress
        },
        rating: 0, // Default rating
        reviews: [], // No reviews initially,
        images : url
      };

      console.log(spaceData);

      // Create the space by posting to the server
      const spaceResponse = await axios.post(
        `${process.env.SERVER_URI}spaces/`,
        spaceData
      );

      // Increment the counter
      SetAdded(Added + 1);

      // Log response if needed
      console.log("Space created:", spaceResponse.data);

      // Reset form data and current step
      setCurrentStep(1);
      setFormData({
        address: "",
        price: {
          hourly: "",
          daily: "",
          monthly: ""
        },
        images: [],
        description: "",
      });
      setFiles([])
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  return (
    <div className="grow self-stretch">
      <div className="flex">
        <ul className="steps grow steps-horizontal">
          <li className={`step ${currentStep === 1 ? "step-primary" : ""}`} onClick={() => setCurrentStep(1)}>Upload Images</li>
          <li className={`step ${currentStep === 2 ? "step-primary" : ""}`} onClick={() => setCurrentStep(2)}>Location & Price</li>
          <li className={`step ${currentStep === 3 ? "step-primary" : ""}`} onClick={() => setCurrentStep(3)}>Description</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="m-4">
        {currentStep === 1 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Step 1: Upload Images</h2>
    <div className="file-upload text-center">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <img src={uploadImage} className="w-52" alt="" />
        <h1 className="text-gray-700 mb-3 font-semibold ">
          Upload your images
        </h1>
        <input
          id="dropzone-file"
          type="file"
          onChange={handleInputChange}
          className="hidden"
          multiple
          name="images"
        />
      </label>
      <div className="w-full text-start">
        <h4 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
          To Upload
        </h4>
        <ul className="flex flex-wrap -m-1">
          {formData.images.length === 0 && (
            <li className="h-full w-full text-center flex flex-col items-center justify-center">
              <img
                className="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span className="text-small text-gray-500">
                No files selected
              </span>
            </li>
          )}
          {formData.images.map((image, index) => (
            <li key={index} className="m-1">
              <div className="relative">
                <img
                  src={image}
                  alt={`file-${index}`}
                  className="w-32"
                />
                <button
                  className="btn btn-xs btn-circle btn-error absolute right-0 top-0"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}

          {/* Additional steps for Location and Description */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Step 2: Location & Price
              </h2>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  name="hourlyPrice"
                  value={formData.price.hourly}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Step 3: Description
              </h2>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          )}
        </div>
        <div className="my-4 flex justify-end">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn mr-[7%]"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
           {currentStep == 1 && (
            <button
              type="button"
              className="btn mr-[7%]"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              type="submit"
              className="btn btn-outline"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
