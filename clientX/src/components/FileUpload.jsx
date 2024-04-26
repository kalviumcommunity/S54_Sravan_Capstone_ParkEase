import axios from "axios";
import React, { useState } from "react";
import uploadImage from "../assets/man-uploading-data.svg";
// import { fields } from "../../../backend/middleware/multerSetup";

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      for(let i =0; i < files.length; i++) {
        formData.append("files", files[i]);
      }   
  
      const response = await axios.post(
        "https://parkez-server.vercel.app/api/fileupload/create", formData );
  
      console.log(response.data);
    
    } catch (error) {
      console.error("Error uploading the files:", error);
    }
  };
    

  return (
    <div className="file-upload text-center ">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <img src={uploadImage} className="w-52" alt="" />
          <h1 className="text-gray-700 mb-3 font-semibold ">
            {" "}
            Upload your images{" "}
          </h1>
          <input
            id="dropzone-file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </label>
      </div>
      <div className="w-full text-start">
        <h4 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
          To Upload
        </h4>
    
        <ul className="flex flex-wrap -m-1">
          {files.length === 0 && (
            <li
              id="empty"
              className="h-full w-full text-center flex flex-col items-center justify-center"
            >
              <img
                className="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span className="text-small text-gray-500">No files selected</span>
            </li>
          )}
          {files.map((file, index) => (
            <li key={index} className="m-1">
              <img src={URL.createObjectURL(file)} alt={`file-${index}`} className="w-32" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end px-8 pb-8 pt-4">
        <button
          id="submit"
          className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
          onClick={handleFileUpload}
        >
          Upload now
        </button>
        <button
          id="cancel"
          className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={ () => {
            setFiles([]);
            setUrl(null);
          }}
        >
          Cancel
        </button>
      </div>
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
}

export default FileUpload;
