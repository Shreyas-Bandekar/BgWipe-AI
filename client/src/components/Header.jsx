import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="flex items-center justify-around max-sm:flex-col-reverse gap-y-10 px-4 sm:px-8 my-10 lg:px-44 sm:mt-20">
      {/* Left Side */}
      <div className="flex-1 max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full shadow-sm mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">AI-Powered • Try Free</span>
        </div>

        <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-800 leading-tight">
          Remove the <br className="max-md:hidden" />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" />
          images for free.
        </h1>
        
        <p className="my-6 text-[15px] text-slate-600 leading-relaxed">
          Transform your images with AI-powered background removal.
          <br className="max-sm:hidden" /> Professional results in seconds, perfect for e-commerce, social media,
          <br className="max-sm:hidden" />
          and creative projects. Try it free today!
        </p>
        
        <div className="space-y-6">
          <input
            onChange={(e) => removeBg(e.target.files[0])}
            type="file"
            accept="image/*"
            id="upload1"
            hidden
          />
          <label
            className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 m-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
            htmlFor="upload1"
          >
            <img width={20} src={assets.upload_btn_icon} alt="" className="group-hover:scale-110 transition-transform" />
            <p className="text-white text-sm font-medium">Upload your image</p>
          </label>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">1 Free Image</p>
                <p className="text-xs text-gray-600">Try without signup</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">2 Credits</p>
                <p className="text-xs text-gray-600">After signup</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">AI-Powered</p>
                <p className="text-xs text-gray-600">High quality</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100/50">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Fast Process</p>
                <p className="text-xs text-gray-600">In seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-md lg:max-w-lg">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform rotate-1 scale-105 opacity-10"></div>
          
          {/* Main image */}
          <div className="relative">
            <img 
              src={assets.header_img} 
              alt="Background removal demonstration" 
              className="w-full h-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 animate-pulse">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Processing
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;