import React from 'react'
import services4 from "../../image/services4.png"; 

function service() {
  return (
    <section className="bg-green-100 mt-3 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Following are the services that Green Farming market provides for Farmers:
        </p>
        <img
          src={services4}
          alt="Services Illustration"
          className="mt-8 w-full max-w-4xl"
        />
      </div>
    </section>
  )
}

export default service