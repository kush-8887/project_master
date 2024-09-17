import React, { useState } from 'react';

export default function Fileup({ visibility }) {
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

      const responseMsg = await response.text();
      
      if (response.ok) {
        setResponseMsg(responseMsg)
      } else {
        setResponseMsg("Snap! Error occured try uploading again")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className="fileupload-container absolute top-10 left-10 p-8 bg-white shadow-lg">
      <h1 className="text-lg font-bold mb-4">Upload a CSV file</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="myfile">Select a file:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          accept=".csv"
          className="ml-2"
          onChange={handleFileChange}
        />
        <br /><br />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      {responseMsg && ( // Conditionally render the responseMsg if it exists
        <div className="mt-4 text-green-600">{responseMsg}</div>
      )}
    </div>
  );
}
