import React from "react";
import Navbar from "./utils/Navbar";
import dashboard from "../assets/imgs/login/dashboard.jpg";
import dashboard2 from "../assets/imgs/login/dashboard2.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="left w-[60%] bg-b-grey h-[70vh]">
          <div className="main relative backdrop-blur-xl h-[100%] text-3xl text-white uppercase flex items-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, in.
          </div>
        </div>
        <div className="right w-[40%] bg-b-grey h-[100vh] backdrop-blur-xl relative">
        <div className="backdrop-blur-xl absolute rounded-custom top-[75px] left-[140px] h-[390px] w-[400px] bg-selected-purple"></div>
          <div className="h-[70vh]">
            <div className="main relative backdrop-blur-xl h-[100%] flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={dashboard}
                  alt="img"
                  srcset=""
                  className="h-[250px]"
                />
              </div>
              <div className="absolute top-[180px] right-[41px]">
                <img
                  src={dashboard2}
                  alt="img"
                  srcset=""
                  className="h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
