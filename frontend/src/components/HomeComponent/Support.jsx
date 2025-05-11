import React from 'react'
import vector11 from "../../image/vector11.svg";
import vector22 from "../../image/vector22.svg";
import vector33 from "../../image/vector33.svg";

function Support() {
  return (
    <div className="flex justify-center gap-8 p-10 bg-white">
      {/* Card 1 */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 hover:shadow-xl transition-shadow">
        <img src={vector11} alt="Support Icon" className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">24×7 customer support</h3>
        <p className="text-gray-600">We’re just one call away.</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 hover:shadow-xl transition-shadow">
        <img src={vector22} alt="Handshake Icon" className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">24×7 customer support</h3>
        <p className="text-gray-600">We’re just one call away.</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-64 hover:shadow-xl transition-shadow">
        <img src={vector33} alt="Check Icon" className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">24×7 customer support</h3>
        <p className="text-gray-600">We’re just one call away.</p>
      </div>
    </div>
  );
}

export default Support