import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import LineGraph from "./LineGraph";

export default function monthly_totals() {
  //Year states
  const [yearData, setYearData] = useState([]);
  const [currentYear, setCurrentYear] = useState("");

  //month states
  const [quarterData, setQuarterData] = useState([]);
  const [currentQuarter, setCurrentQuarter] = useState("");

  //Handle year change
  const handleYear = (e) => {
    setCurrentYear(e.target.value);
  };

  //handle month change
  const handleQuarter = (e) => {
    setCurrentQuarter(e.target.value);
  };

  // Common fetch quarters method
  const fetchQuarters = async (year) => {
    try {
      let response = await fetch(`http://localhost:8000/getQuarters/${year}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        let res = await response.json();
        let quarters = res.quarters;
        
        setQuarterData(quarters); // Set the month data
        setCurrentQuarter(quarters[0]); // Directly use the fetched quarters array
      } else {
        console.error("Failed to fetch quarters data");
      }
    } catch (error) {
      console.error("Error fetching months data:", error);
    }
  };

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

          // Fetch months for the first year
          fetchQuarters(yearsArr[0]); // Pass the year explicitly
        } else {
          console.error("Failed to fetch years data");
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };
  
    fetchYears();
  }, []);

  //Handle current year changes and fetch data accordingly
  useEffect(() => {
    fetchQuarters(currentYear);
  }, [currentYear]);

  return (
    <div className="flex">
      <section className="h-[fit-content] w-[80vw] bg-b-grey">
        <div className="heading-cont m-5 p-5 bg-c-grey rounded-xl flex justify-between items-center">
          <div className="heading text-white text-3xl">Quarterly Totals</div>
          <div className="year-select">
            <select
              name="year"
              id="year"
              className="w-[100px] p-2 rounded-sm bg-selected-purple text-black"
              onChange={handleYear}
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
                Products sold in: {currentQuarter}
              </div>
              <div className="month-cont">
                <select
                  name="month"
                  id="month"
                  className="w-[100px] p-1 rounded-sm bg-selected-purple text-black"
                  onChange={handleQuarter}
                >
                  {quarterData.length == 0 ? (
                    <p>No data</p>
                  ) : (
                    quarterData.map((element) => {
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
            <PieChart
              link={`http://localhost:8000/getPie/quarter/${currentQuarter}`}
              height={"400px"}
              width={"100%"}
            />
          </div>
          <div className="m-5 bg-c-grey w-[555px] rounded-xl p-5">
            <div className="w-[100%] flex justify-between items-center">
              <div className="sub-heading text-white text-xl">
                Revenue from Products: {currentQuarter}
              </div>
              <div className="month-cont">
                <select
                  name="month"
                  id="month"
                  className="w-[100px] p-1 rounded-sm bg-selected-purple text-black"
                  onChange={handleQuarter}
                >
                  {quarterData.length == 0 ? (
                    <p>No data</p>
                  ) : (
                    quarterData.map((element) => {
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
            <PieChart
              link={`http://localhost:8000/getPricePie/quarter/${currentQuarter}`}
              height={"400px"}
              width={"100%"}
            />
          </div>
        </div>
        
        {/* Line Charts */}
        <div className="m-5 bg-c-grey w-[fit-content] rounded-xl p-5">
          <div className="w-[100%] flex flex-col justify-between items-center">
              <div className="sub-heading text-white text-xl">
                Products sold in: {currentYear}
              </div>
              <LineGraph link={`http://localhost:8000/getLineGP/quarter/${currentYear}`} height={"500px"} width={"1110px"}/>
          </div>
        </div>
        <div className="m-5 bg-c-grey w-[fit-content] rounded-xl p-5 mt-[43px]">
          <div className="w-[100%] flex flex-col justify-between items-center">
              <div className="sub-heading text-white text-xl">
                Quantity sold in: {currentYear}
              </div>
              <LineGraph link={`http://localhost:8000/getLineGP/quantity/quarter/${currentYear}`} height={"500px"} width={"1110px"}/>
          </div>
        </div>
      </section>
    </div>
  );
}
