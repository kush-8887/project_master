import React, { useState } from 'react';
import DashNav from './DashNav';
import DashNav2 from './DashNav2';
import Fileup from './Fileup';
import MonthlyTotals from '../dashboard/MonthlyTotals';
import QuarterlyTotals from '../dashboard/QuarterlyTotals';
import YearlyTotals from '../dashboard/YearlyTotals';

export default function DashBoard() {
  const [fileVisibility, setFileVisibility] = useState(false);
  const [CurrentSection, setCurrentSection] = useState(() => MonthlyTotals); 

  const uploadHandler = () => {
    setFileVisibility(!fileVisibility);
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
      <div className='flex flex-row w-[98.9vw] h-[fit-content]'>
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
