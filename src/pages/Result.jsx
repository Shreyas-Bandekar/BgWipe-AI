import React from 'react'
import {assets} from '../assets/assets.js'  

const Result = () => {
  return (
    <div className="mx-2 my-3 lg:mx-44 mt-10 min-h-[75vh]">
      <div className="bg-white rounded-lg px-4 sm:px-8 py-4 sm:py-6 shadow-sm">
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">

          {/* Original Image */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border w-full max-w-xs sm:max-w-full object-contain"
              src={assets.image_w_bg}
              alt=""
            />
          </div>

          {/* Edited Image */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-48 sm:h-full relative bg-layer overflow-hidden flex items-center justify-center">
              {/* Loader */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-fuchsia-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center flex-wrap gap-3 sm:gap-4 mt-6">
          <button className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition">Try another image</button>
          <a
            href=""
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  )
}

export default Result