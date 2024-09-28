import React, { useState , useRef } from 'react';
import DashNav from './DashNav';
import DashNav2 from './DashNav2';
import Fileup from './Fileup';
import MonthlyTotals from '../dashboard/MonthlyTotals';
import QuarterlyTotals from '../dashboard/QuarterlyTotals';
import YearlyTotals from '../dashboard/YearlyTotals';

export default function DashBoard() {
  const [fileVisibility, setFileVisibility] = useState(false);
  const [CurrentSection, setCurrentSection] = useState(() => MonthlyTotals); 
  const mainContainerRef = useRef(null);

  const uploadHandler = () => {
    setFileVisibility(!fileVisibility);
    const mainContainer = mainContainerRef.current;
  
    // Check if the mainContainer exists
    if (mainContainer) {
      // Get the current className
      let containerClass = mainContainer.className;
  
      // Modify the className on the DOM element directly
      if (containerClass === "flex flex-row w-[98.9vw] h-[fit-content]") {
        mainContainer.className = "flex flex-row w-[98.9vw] h-[fit-content] z-[-1] relative";
      } else {
        mainContainer.className = "flex flex-row w-[98.9vw] h-[fit-content]";
      }
  
      console.log(mainContainer.className); // Log the updated className
    }
  };
  

  const handleSection = (section) => {
    const current_id = section.target.id; 
    if (current_id === 'monthly_totals') {
      setCurrentSection(() => MonthlyTotals); 
    }
    if(current_id === "quarterly_totals"){
      setCurrentSection(() => QuarterlyTotals); 
    }
    if(current_id === "yearly_totals"){
      setCurrentSection(() => YearlyTotals); 
    }
  };
  return (
    <>
      <Fileup visibility={fileVisibility} uploadHandler={uploadHandler} />
      <div ref={mainContainerRef} className='flex flex-row w-[98.9vw] h-[fit-content]'>
        <DashNav handleSection={handleSection} />
        <div className="cont-2 w-[80vw] bg-b-grey ">
          <DashNav2 uploadHandler={uploadHandler} />
          <div>
            {/* Conditionally render the component */}
            {CurrentSection && <CurrentSection />} 
          </div>
        </div>
      </div>
    </>
  );
}
