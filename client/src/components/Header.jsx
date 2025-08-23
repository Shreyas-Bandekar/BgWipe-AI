import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="flex items-center justify-around max-sm:flex-col-reverse gap-y-10 px-4 sm:px-8 my-10 lg:px-44 sm:mt-20">
      {/* Left Side */}
      <div>
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
        <div>
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
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;