import React from 'react'
import img from "../assets/imgs/how-to.jpg";
import decorator from '../assets/imgs/decorator.jpg'
import Navbar from './utils/Navbar'

export default function HowTo() {
  return (
    <div>
      <Navbar />
      <div className="guide bg-b-grey flex">
        <div className="text-4xl text-white m-3 p-5 leading-[50px] w-[70vw] ">
          <div>How to upload?</div>
          <div className="content text-[22px] my-2">
            <h3>Guidelines for Uploading CSV Files</h3>
            <ul className="mx-5 list-disc">
              <li>
                Ensure the file format is <strong>.csv</strong>.
              </li>
              <li className="mx-7">
                The following columns are mandatory:
                <ul className="mx-7">
                  <li>
                    <strong>item_id</strong> – Unique identifier for each item.
                  </li>
                  <li>
                    <strong>date</strong> – Date of the transaction in the
                    format YYYY-MM-DD.
                  </li>
                  <li>
                    <strong>item_quantity</strong> – Number of items sold.
                  </li>
                  <li>
                    <strong>item_price</strong> – Price per unit of the item.
                  </li>
                </ul>
              </li>
              <li className="mx-10">
                Do not include additional columns beyond the predefined
                structure.
              </li>
              <li>Ensure all dates are valid and correctly formatted.</li>
              <li className="mx-7">
                Verify that all numerical data (item_quantity, item_price) is
                accurate.
              </li>
              <li className="mx-7">Upload files with no empty rows or missing data.</li>
              <li className="mx-7">
                File size should not exceed <strong>5MB</strong>.
              </li>
            </ul>
          </div>

          <div className="how w-[80%] my-10 text-2xl">
            Following is a example : <br/> <br/>
            <img src={img} alt="" />
          </div>
        </div>
        <div className="decorator flex justify-center items-center w-[30vw]">
              <img className="w-[80%] rounded-lg" src={decorator} alt="" />
        </div>
      </div>
    </div>
  )
}
