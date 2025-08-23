import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="pb-16">
      {/* Title */}
      <div className="text-center py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-slate-800 bg-clip-text text-transparent">
            See the magic. Try now
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of users who trust our AI-powered background removal tool
          </p>
          
          <div className="flex flex-col items-center space-y-6">
            <input
              onChange={(e) => removeBg(e.target.files[0])}
              type="file"
              accept="image/*"
              id="upload2"
              hidden
            />
            <label
              className="inline-flex gap-3 px-10 py-4 rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group text-base"
              htmlFor="upload2"
            >
              <img width={24} src={assets.upload_btn_icon} alt="" className="group-hover:scale-110 transition-transform" />
              <span>Upload your image</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </label>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>1M+ images processed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>99.9% accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>3s average time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;