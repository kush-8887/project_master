import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    let valid = true;

    if (!email || email === '') {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      try {
        const response = await fetch(`http://localhost:8000/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        // Capture the HTTP status code
        const statusCode = response.status;
        const responseData = await response.json(); //body  

        navigate("/status", { state: { statusCode: statusCode, message: responseData } });
        
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div>
      <div className="errorpage bg-b-grey h-[100vh] flex flex-col items-center ">
        <div className="w-[40%] bg-c-grey my-[100px] p-10 rounded-xl">
          <div className="">
            <p className="text-white text-3xl">Forgot your password?</p>
            <p className="text-white my-3">
              Enter the email associated with your account, we'll send a
              password reset link.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-[100%]">
            <div className="w-[100%] mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-bold mb-2 text-white "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 rounded-m border-2 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg font-bold transition-colors hover:bg-selected-purple hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
