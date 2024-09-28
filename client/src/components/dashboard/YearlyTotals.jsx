import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineGraph from "./LineGraph";

export default function monthly_totals() {
  //Year states
  const [yearData, setYearData] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [lowerYears,setLowerYears] = useState([]);
  const [currentLowerYear,setCurrentLowerYear] = useState()

  //Handle year change
  const handleMainYear = (e) => {
    setCurrentYear(e.target.value);
    const selectedYear = parseInt(e.target.value, 10);  
    const filteredYears = yearData.filter(year => parseInt(year, 10) < selectedYear);
    setLowerYears(filteredYears);
    setCurrentLowerYear(filteredYears[0]);
    console.log(filteredYears);
  };

  //Handle other year change

  // Handle lowerYearChange 
  const handleLowerYearChange = (e)=>{
    setCurrentLowerYear(e.target.value);
  }

  //Setter function
  useEffect(() => {
    const fetchYears = async () => {
      try {
        let response = await fetch("http://localhost:8000/getYears", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          let years = await response.json();
          let yearsArr = years.years;
  
          // Set starting year
          setYearData(yearsArr);
          setCurrentYear(yearsArr[0]);
  
          // Filter and set lowerYears array
          const selectedYear = parseInt(yearsArr[0], 10); 
          const filteredYears = yearsArr.filter(year => parseInt(year, 10) < selectedYear);        
          setLowerYears(filteredYears);
          setCurrentLowerYear(filteredYears[0]);

        } else {
          console.error("Failed to fetch years data");
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };
  
    fetchYears();
  }, []);

  return (
    <div className="flex">
      <section className="h-[fit-content] w-[80vw] bg-b-grey">
        <div className="heading-cont m-5 p-5 bg-c-grey rounded-xl flex justify-between items-center">
          <div className="heading text-white text-3xl">Yearly Totals</div>
          <div className="year-select">
            <select
              name="year"
              id="year"
              className="w-[100px] p-2 rounded-sm bg-selected-purple text-black"
              onChange={handleMainYear}
            >
              {yearData.length == 0 ? (
                <p>No data</p>
              ) : (
                yearData.map((element) => {
                  return (
                    <option className="" key={element} value={element}>
                      {" "}
                      {element}{" "}
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>
        
        {/* Pie Charts */}
        <div className="flex w-[100%] ">
          <div className="m-5 bg-c-grey w-[555px] rounded-xl p-5">
            <div className="w-[100%] flex justify-between items-center">
              <div className="sub-heading text-white text-xl">
                Products sold in: {currentYear}
              </div>
              <div className="month-cont">
                <select
                  name="month"
                  id="month"
                  className="w-[100px] p-1 rounded-sm bg-selected-purple text-black"
                >
                  <option value={currentYear}>{currentYear}</option>
                </select>
              </div>
            </div>
            <PieChart
              link={`http://localhost:8000/getPie/year/${currentYear}`}
              height={"400px"}
              width={"100%"}
            />
          </div>
          <div className="m-5 bg-c-grey w-[555px] rounded-xl p-5">
            <div className="w-[100%] flex justify-between items-center">
              <div className="sub-heading text-white text-xl">
                Revenue from Products: {currentYear}
              </div>
              <div className="month-cont">
                <select
                  name="month"
                  id="month"
                  className="w-[100px] p-1 rounded-sm bg-selected-purple text-black"
                >
                  <option value={currentYear}>{currentYear}</option>
                </select>
              </div>
            </div>
            <PieChart
              link={`http://localhost:8000/getPricePie/year/${currentYear}`}
              height={"400px"}
              width={"100%"}
            />
          </div>
        </div>
        
        {/* Line Charts */}
        <div className="m-5 bg-c-grey w-[fit-content] rounded-xl p-5">
        <div className="w-[100%] flex flex-col justify-between items-center">
              <div className="flex justify-between items-center w-[100%] mx-10">
                <div className="sub-heading text-white text-xl">
                  Quantity sold in: {currentYear} 
                </div>
                <div className="flex">
                   <div className="from text-white">
                      From: 
                      <select name="lower_year" id="lower_year" className="w-[100px] p-1 rounded-sm bg-selected-purple text-black mx-5"  onChange={handleLowerYearChange}>
                       {
                        lowerYears.length == 0 ? (<option value= {currentYear} selected>{currentYear}</option>) 
                        : (
                          lowerYears.map(element => {
                            return (
                              <option value= {element} selected>{element}</option>
                            )
                          })
                        ) 

                       }
                      </select>
                   </div>
                   <div className="to text-white">
                      To:
                      <select name="name" id="name" className="w-[100px] p-1 rounded-sm bg-selected-purple text-black mx-5">
                        <option value= {currentYear} selected>{currentYear}</option>
                      </select>
                   </div>
                </div>
              </div>
              {
                lowerYears.length == 0 ? (
                  <LineGraph link={`http://localhost:8000/getLineGP/year/${currentYear}/${currentYear}`} height={"500px"} width={"1110px"}/>
                ) : (
                  <LineGraph link={`http://localhost:8000/getLineGP/year/${currentLowerYear}/${currentYear}`} height={"500px"} width={"1110px"}/>
                )
              }
          </div>
        </div>
        <div className="m-5 bg-c-grey w-[fit-content] rounded-xl p-5 mt-7">
          <div className="w-[100%] flex flex-col justify-between items-center">
              <div className="flex justify-between items-center w-[100%] mx-10">
                <div className="sub-heading text-white text-xl">
                  Quantity sold in: {currentYear} 
                </div>
                <div className="flex">
                   <div className="from text-white">
                      From: 
                      <select name="lower_year" id="lower_year" className="w-[100px] p-1 rounded-sm bg-selected-purple text-black mx-5"  onChange={handleLowerYearChange}>
                       {
                        lowerYears.length == 0 ? (<option value= {currentYear} selected>{currentYear}</option>) 
                        : (
                          lowerYears.map(element => {
                            return (
                              <option value= {element} selected>{element}</option>
                            )
                          })
                        ) 

                       }
                      </select>
                   </div>
                   <div className="to text-white">
                      To:
                      <select name="name" id="name" className="w-[100px] p-1 rounded-sm bg-selected-purple text-black mx-5">
                        <option value= {currentYear} selected>{currentYear}</option>
                      </select>
                   </div>
                </div>
              </div>
              {
                lowerYears.length == 0 ? (
                  <LineGraph link={`http://localhost:8000/getLineGP/year/${currentYear}/${currentYear}`} height={"500px"} width={"1110px"}/>
                ) : (
                  <LineGraph link={`http://localhost:8000/getLineGP/year/${currentLowerYear}/${currentYear}`} height={"500px"} width={"1110px"}/>
                )
              }
          </div>
        </div>
      </section>
    </div>
  );
}
