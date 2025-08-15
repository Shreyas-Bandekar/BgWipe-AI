import { assets } from '../assets/assets.js'

const Result = () => {
  return (
    <div className="mx-2 sm:mx-4 lg:mx-44 my-3 mt-14 min-h-[72vh] w-full overflow-x-hidden">
      <div className="bg-white rounded-lg px-4 sm:px-8 py-6 drop-shadow-sm">
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">

          {/* Original Image */}
          <div className="w-full">
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img className="rounded-md border w-full object-contain" src={assets.image_w_bg} alt="" />
          </div>

          {/* Edited Image */}
          <div className="flex flex-col w-full">
            <p className="font-semibold text-gray-600 mb-2">Background Removed</p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {/* Loader */}
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-4 border-fuchsia-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mt-8 flex-wrap">
          <button
            className="px-6 py-2 text-sm text-fuchsia-600 border border-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700 w-full sm:w-auto text-center"
          >
            Try another image
          </button>
          <a
            href=""
            className="px-6 py-2 text-white text-sm bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700 w-full sm:w-auto text-center"
            download
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  )
}

export default Result;