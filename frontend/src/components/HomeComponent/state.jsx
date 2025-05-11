import React from 'react'
import people from "../../image/people.svg";
import people1 from "../../image/people1.svg";
import { FaChartPie } from 'react-icons/fa';

function state() {
  return (
    <div className="flex items-center justify-center mx-20 my-[75px]">
      <div className="flex flex-1 flex-col justify-center items-center">
        <img className="statsImg" src={people1} alt="" />
        <h1 className="text-2xl font-bold mt-7">1,567,890</h1>
        <p className="text-lg font-normal w-1/2 text-center">
          Latest number of acquired customers.
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <img className="statsImg" src={people} alt="" />
        <h1 className="text-2xl font-bold mt-7">4 out of 5</h1>
        <p className="text-lg font-normal w-1/2 text-center">
          Customers are satisfied with our services.
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
      <FaChartPie className="text-green-600 text-5xl mb-4" />
        <h1 className="text-2xl font-bold mt-7">16% of Crop value</h1>
        <p className="text-lg font-normal w-1/2 text-center">
          Average Equipment Investments
        </p>
      </div>
    </div>
  )
}

export default state