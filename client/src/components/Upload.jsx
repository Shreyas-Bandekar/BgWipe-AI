import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="pb-16">
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-slate-800 bg-clip-text text-transparent py-6 md:py-16">
        See the magic. Try now
      </h1>
      <div className="text-center mb-24">
        <input
          onChange={(e) => removeBg(e.target.files[0])}
          type="file"
          accept="image/*"
          id="upload2"
          hidden
        />
        <label
          className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 m-auto hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="" className="group-hover:scale-110 transition-transform" />
          <p className="text-white text-sm font-medium">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;