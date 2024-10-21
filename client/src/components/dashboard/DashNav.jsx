import React, { useState } from "react";
import logo from "../../assets/svg/logo/full-logo.svg";

export default function DashNav({ handleSection }) {
  const [activeItemId, setActiveItemId] = useState(null); // State to track the active item ID

  const handleClick = (e) => {
    const { id } = e.target;
    setActiveItemId(id); 
    console.log(activeItemId);
    
    handleSection(e); 
  };

  return (
    <nav className="bg-b-grey w-[20vw] h-[265vh] flex flex-col">
      <div className="w-[100%] flex justify-center">
        <a href="/">
        <img src={logo} alt="" className="p-4 w-[200px]" />
        </a>
      </div>
      <div className="px-5">
        <div className="current-analytics">
          {/* heading  */}
          <div className="text-white text-2xl">Current Analytics</div>
          <div className="option-holder flex flex-col">
            <div className="nav-option">
              <div
                id="monthly_totals"
                onClick={handleClick}
                className={`my-3 item py-3 px-2 rounded-md cursor-pointer ${
                  activeItemId === "monthly_totals"
                    ? "text-black bg-selected-purple hover:bg-purple-hover hover:text-white transition-colors"
                    : "text-white bg-b-grey hover:bg-purple-hover hover:text-black transition-colors"
                }`}
              >
                Monthly Total
              </div>
              <div
                id="quarterly_totals"
                onClick={handleClick}
                className={`my-3 item py-3 px-2 rounded-md cursor-pointer ${
                  activeItemId === "quarterly_totals"
                    ? "text-black bg-selected-purple hover:bg-purple-hover hover:text-white transition-colors"
                    : "text-white bg-b-grey hover:bg-purple-hover hover:text-black transition-colors" 
                }`}
              >
                Quarterly Total
              </div>
              <div
                id="yearly_totals"
                onClick={handleClick}
                className={`my-3 item py-3 px-2 rounded-md cursor-pointer ${
                  activeItemId === "yearly_totals"
                    ? "text-black bg-selected-purple hover:bg-purple-hover hover:text-white transition-colors"
                    : "text-white bg-b-grey hover:bg-purple-hover hover:text-black transition-colors" 
                }`}
              >
                Yearly Total
              </div>
            </div>
          </div>
        </div>
        <div className="prediction-analytics">
          <div className="text-white text-2xl">Prediction Analytics</div>
          <div className="option-holder flex flex-col">
          <div
                id="price_prediction"
                onClick={handleClick}
                className={`my-3 item py-3 px-2 rounded-md cursor-pointer ${
                  activeItemId === "price_prediction"
                    ? "text-black bg-selected-purple hover:bg-purple-hover hover:text-white transition-colors"
                    : "text-white bg-b-grey hover:bg-purple-hover hover:text-black transition-colors" 
                }`}
              >
                Price Prediction
              </div>
          </div>
          <div className="option-holder flex flex-col">
          <div
                id="quantity_prediction"
                onClick={handleClick}
                className={`my-2 item py-3 px-2 rounded-md cursor-pointer ${
                  activeItemId === "quantity_prediction"
                    ? "text-black bg-selected-purple hover:bg-purple-hover hover:text-white transition-colors"
                    : "text-white bg-b-grey hover:bg-purple-hover hover:text-black transition-colors" 
                }`}
              >
                Quantity Prediction
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
