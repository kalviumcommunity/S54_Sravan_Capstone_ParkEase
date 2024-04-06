import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddSpace = () => {
    const { handleSubmit, register } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [Imagepath, setImagepath] = useState("");
    const [coordinates, setCoordinates] = useState({ longitude: '', latitude: '' });

    const toggleModal = () => {
        setIsOpen(!isOpen); // Toggle state on click
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                setCoordinates({ longitude: Number(position.coords.longitude),latitude : Number(position.coords.latitude) });
            });
        }
    };

    const imageUpload = async () => {
        const formData = new FormData();
        formData.append('file', Imagepath);
        formData.append('upload_preset', 'image_upload');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/djiigiq9w/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            return response.data.secure_url; // Return the image URL
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        data.hourly_rate = Number(data.hourly_rate);
        console.log(data)
        try {
            // Upload image and get image URL
            const imageUrl = await imageUpload();
            console.log(data)
            // Send POST request with form data
            const response = await axios.post('https://parkez-server.vercel.app/spaces', {
            // const response = await axios.post('http://localhost:3003/spaces/', {
                ...data,
                image: [imageUrl],
                provider_id : '65edda314aa9d8555e3dc09e',
                location: {
                    coordinates: [coordinates.longitude, coordinates.latitude]
                }
            });

            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

    return (
        <>
            <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleModal} // Call toggle function on click
            >
                Create Space
            </button>
           
            {isOpen && (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Space
                                </h3>
                                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address </label>
                                        <input type="text" name="address" id="address" className={inputStyles} placeholder="" {...register('address', { required: true })} />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        <input type="number" name="price" id="price" className={inputStyles} placeholder="" {...register('hourly_rate', { required: true })} />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Image </label>
                                        <input type="file" className={inputStyles} onChange={(e) => { setImagepath(e.target.files[0]) }} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                                        <input type="number" name="longitude" id="longitude" className={inputStyles} placeholder="Longitude" value={coordinates.longitude} onChange={(e) => setCoordinates({ ...coordinates, longitude: e.target.value })}  />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                                        <input type="number" name="latitude" id="latitude" className={inputStyles} placeholder="Latitude" value={coordinates.latitude} onChange={(e) => setCoordinates({ ...coordinates, latitude: e.target.value })} />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Description</label>
                                        <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" {...register('description', { required: true })}></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddSpace;
