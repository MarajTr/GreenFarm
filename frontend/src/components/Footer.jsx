import React from 'react'
import "./Footer.css";
import Vector from "../image/Vector.png";
import Vector1 from "../image/Vector1.png";
import Vector2 from "../image/Vector2.png";
function footer() {
  return (
    <div className="bg-[#219653] inPhone py-20">
    <div className="flex justify-center items-center">
      <div className="flex-1 border-r-2 border-black-600">
        <div
          className="flex justify-center items-center mx-8 cursor-pointer"
        >
          <div className="ml-4">
            <h3 className="text-2xl text-white font-bold mt-4">
              Green <br /> Farming
            </h3>
            <p className="text-md font-normal text-white mt-2">
            The only source for farmers' equipment.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 px-16 border-r-2 border-black-600">
        <div className="flex">
          <ul className="list-none mr-24">
            <li
              className="text-lg text-white font-bold cursor-pointer"
              onClick={() => "/"}
            >
              Home
            </li>
            <li className='text-lg text-white font-medium cursor-pointer'>Menu</li>
            <li className="text-lg text-white font-medium cursor-pointer">
              Market
            </li>
          </ul>
          <ul>
            <li
              className="text-lg text-white font-bold cursor-pointer"
              onClick={() => "/"}
            >
              Support Center
            </li>
            <li
              className="text-lg text-white font-medium cursor-pointer"
              onClick={() => "/"}
            >
              Help Center
            </li>
            <li
              className="text-lg text-white font-medium cursor-pointer"
              onClick={() => "/"}
            >
              Partner Dispute
            </li>
            <li
              className="text-lg text-white font-medium cursor-pointer"
              onClick={() => "/"}
            >
              FAQs
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 px-16 border-r-2 border-black-600">
        <h1 className="text-xl ml-6 text-white font-bold w-2/3">
          Give us a follow on social media
        </h1>
        <div className="flex my-5 justify-left">
          <img
            className="socialIcons mx-3 ml-6 cursor-pointer"
            src={Vector}
            alt=""
          />
          <img
            className="socialIcons mx-3 ml-6 cursor-pointer"
            src={Vector1}
            alt=""
          />
          <img
            className="socialIcons mx-3 ml-6 cursor-pointer"
            src={Vector2}
            alt=""
          />
        </div>
        <p className="text-lg ml-6 text-white">
          Made by : <strong>Team Batterylow</strong>
        </p>
      </div>
    </div>
  </div>
  )
}

export default footer