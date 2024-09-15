import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import Navbar from "./utils/Navbar";
import dashboard from "../assets/imgs/login/dashboard.jpg";
import dashboard2 from "../assets/imgs/login/dashboard2.png";

export default function Home() {
  const e1 = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["PREDICTIONS", "ANALYTICS", "INVENTORY MANAGEMENT"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true, 
      showCursor: false, // Added loop for continuous typing effect
    };

    if (e1.current) {
      typed.current = new Typed(e1.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row font-popins">
        <div className="left w-[60%] bg-b-grey h-[88vh]">
          <div className="flex flex-col main relative backdrop-blur-xl h-[100%] text-5xl leading-[4.5rem] text-white uppercase items-center justify-center mx-10">
            <div className="ml-[-190px]">Unlocking Sales Potential <br /> with Data-Driven Insights <br />GET</div>
            <div className="features w-[100%] text-selected-purple" ref={e1}>
              {/* Typing effect appears here */}
            </div>
            {/* <button className="leading-1 h-2 bg-c-grey text-[20px] text-white px-2 py-2 rounded-lg font-bold transition-colors hover:bg-selected-purple hover:text-black">
              Submit
            </button> */}
          </div>
        </div>
        <div className="right w-[40%] bg-b-grey h-[88vh] backdrop-blur-xl relative">
          <div className="backdrop-blur-xl absolute rounded-custom top-[75px] left-[140px] h-[390px] w-[400px] bg-selected-purple"></div>
          <div className="h-[88vh]">
            <div className="main relative backdrop-blur-xl h-[77%] flex flex-col items-center justify-center">
              <div className="relative">
                <img src={dashboard} alt="Dashboard" className="h-[250px]" />
              </div>
              <div className="absolute top-[270px] right-[41px]">
                <img src={dashboard2} alt="Dashboard" className="h-[250px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
