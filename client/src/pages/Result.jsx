import { assets } from '../assets/assets.js'

const Result = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-7xl flex flex-col">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-center justify-center w-full">
          {/* Original Image */}
          <div className="flex flex-col items-center w-full lg:w-1/2 mb-8 lg:mb-0">
            <p className="font-semibold text-gray-600 mb-3 text-base sm:text-lg lg:text-xl">Original</p>
            <img
              className="rounded-xl border-2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain"
              src={assets.image_w_bg}
              alt="Original"
            />
          </div>

          {/* Edited Image */}
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <p className="font-semibold text-gray-600 mb-3 text-base sm:text-lg lg:text-xl">Background Removed</p>
            <div className="rounded-xl border-2 border-gray-300 bg-layer flex items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl min-h-[200px] sm:min-h-[300px] md:min-h-[350px] relative">
              {/* Loader */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-fuchsia-600 rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 w-full">
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 text-base text-fuchsia-600 border-2 border-fuchsia-500 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center font-semibold"
          >
            Try another image
          </button>
          <a
            href=""
            className="px-6 sm:px-8 py-2 sm:py-3 text-white text-base bg-gradient-to-r from-blue-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center font-semibold"
            download
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;