import React, { useState } from 'react';
import cross from '../../assets/svg/utils/cross-close.svg'

export default function Fileup({ visibility , uploadHandler}) {
  const [file, setFile] = useState(null);
  const [responseMsg,setResponseMsg] = useState('');

  if (!visibility) return null; // Conditionally render the component based on the visibility prop

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file in state
  };

  //Do not modify!
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('myfile', file);

    try {
      // Send a POST request to the server
      const response = await fetch('http://localhost:8000/upload-csv', {
        method: 'POST',
        body: formData,
        credentials: 'include' //very important for sending cookies
      });

      const responseMsg = await response.json();
      const msg = responseMsg["message"]
      
      
      if (response.ok) {
        setResponseMsg(msg)
      } else {
        setResponseMsg("Snap! Error occured try uploading again")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className="fileupload-container fixed top-[100px] left-0 right-0 flex justify-center z-99">
  <div className="p-9 bg-c-grey shadow-2xl rounded-lg w-80 relative">
      <button onClick={uploadHandler} className='absolute right-3 top-5 '><img src={cross} alt="" className='h-5 invert hover:invert-0'/></button>
    <h1 className="text-2xl font-bold mb-6  text-white text-center">Upload a CSV File</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="myfile" className="block text-lg font-semibold text-white mb-3">
        Select a file:
      </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
        accept=".csv"
        className="block w-full text-sm text-white border border-gray-500 rounded-lg p-2 bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none cursor-pointer mb-6"
        onChange={handleFileChange}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-black text-white font-semibold text-lg rounded-lg  hover:bg-selected-purple hover:text-black focus:ring-2 focus:ring-gray-500 focus:outline-none transition ease-in-out duration-150"
      >
        Submit
      </button>
    </form>
    {responseMsg && ( // Conditionally render the responseMsg if it exists
      <div className="mt-6 text-green-400 text-lg font-semibold text-center">{responseMsg}</div>
    )}
  </div>
</div> );
}
