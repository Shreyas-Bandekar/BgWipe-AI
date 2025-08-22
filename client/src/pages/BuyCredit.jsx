import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BuyCredit = () => {
  const { credit } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Credits Information
        </h1>
        <p className="text-center text-gray-600 mt-2">
          You have <span className="font-bold">{credit}</span> credits left
        </p>

        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            Free Usage Policy
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Every user gets one free background removal. After using your free removal,
            you'll need credits for additional operations.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-center text-gray-700">
              <span className="font-bold">How it works:</span>
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li className="text-gray-600 mb-1">First background removal is free</li>
              <li className="text-gray-600 mb-1">Each additional removal costs 1 credit</li>
              <li className="text-gray-600">Initial account balance: 5 credits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;