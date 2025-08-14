import React from 'react'
import {assets} from '../assets/assets.js'  

const Result = () => {
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[72vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>

          {/* Original Image */}
            <div>
              <p className='font-semibold text-gray-600 mb2'>Original</p>
              <img className='rounded-md border' src={assets.image_w_bg} alt="" />
            </div>

          {/* Edited Image */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb2'>Background Removed</p>

            <div className='rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden'>
              {/* <img className='rounded-md border' src={assets.image_wo_bg} alt="" /> */}
              {/* Loader */}
              <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                <div className='border-4 border-fuchsia-600 rounded-full h-12 w-12 border-t-transparent animate-spin'>

                </div>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className='flex justify-center sm:justify-end items-center flex-wrap '>
            <button>Try another image</button>
            <a href="">Download Image</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Result