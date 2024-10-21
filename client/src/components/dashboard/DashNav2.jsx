import { useState, useEffect } from "react";
import React from "react";
import Cookies from 'js-cookie';

export default function DashNav2({ uploadHandler }) {
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/getProfile", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setProfileName(data.userData.fullName);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []); 
  const logout = () => {
    // Delete the logout token from cookies
    Cookies.remove('token'); // Replace 'logoutToken' with the actual name of your token
  
    // Optionally, you might want to clear any other user-related data if necessary
    // Cookies.remove('otherUserData'); // Example
  
    // Reload the page
    window.location.reload();
  };
  
  return (
    <nav className="bg-b-grey w-[100%] h-[10vh] flex justify-between items-center">
      <div className="text-white profile-container ml-5">
        Welcome, {profileName || "Guest"} {/* Show "Guest" if profileName is empty */}
      </div>
      <div className="upload-csv-container mr-5">
        <a
          className="p-2 rounded-md text-white bg-black hover:bg-selected-purple transition-colors"
          href="/how-to"
        >
          How to upload?
        </a>
        <button
          onClick={uploadHandler}
          className="p-2 rounded-md text-white bg-black hover:bg-selected-purple transition-colors ml-5"
        >
          Upload CSV
        </button>
        <button
        onClick={logout}
          className="p-2 rounded-md text-white bg-black hover:bg-selected-purple transition-colors ml-5"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
