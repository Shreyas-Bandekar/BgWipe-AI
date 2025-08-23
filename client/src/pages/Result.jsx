import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets.js';

const Result = () => {
  const { image, resultImage, setImage, setResultImage, isProcessing } = useContext(AppContext);
  const navigate = useNavigate();

  // Redirect to home if no image is selected
  useEffect(() => {
    if (!image) {
      navigate('/');
    }
  }, [image, navigate]);

  const handleTryAnother = () => {
    setImage(false);
    setResultImage(false);
    navigate('/');
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'bg-removed-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-4 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-100/50 p-3 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-slate-800 bg-clip-text text-transparent mb-2">
              Background Removal Result
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Compare your original image with the processed result
            </p>
          </div>

          {/* Images Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Original Image */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <h2 className="font-bold text-slate-700 text-base sm:text-lg md:text-xl">
                Original Image
              </h2>
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <img
                  className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] object-contain rounded-xl border-2 border-purple-200/50 shadow-lg hover:shadow-purple-200/50 transition-shadow"
                  src={image ? URL.createObjectURL(image) : assets.image_w_bg}
                  alt="Original"
                />
              </div>
            </div>

            {/* Processed Image */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <h2 className="font-semibold text-gray-700 text-base sm:text-lg md:text-xl">
                Background Removed
              </h2>
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl border-2 border-gray-200 bg-layer shadow-lg overflow-hidden">
                  {resultImage ? (
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={resultImage}
                      alt="Background Removed"
                    />
                  ) : (
                    /* Loader */
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
                      <div className="border-4 border-fuchsia-600 rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 border-t-transparent animate-spin mb-3 sm:mb-4"></div>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">
                        {isProcessing ? "Processing your image..." : "Loading..."}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        This may take a few seconds
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6">
            <button
              onClick={handleTryAnother}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-fuchsia-600 border-2 border-fuchsia-500 rounded-full hover:bg-fuchsia-50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
            >
              Try Another Image
            </button>
            <button
              onClick={handleDownload}
              disabled={!resultImage}
              className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                resultImage 
                  ? 'bg-gradient-to-r from-blue-600 to-fuchsia-500 hover:scale-105 hover:shadow-lg cursor-pointer focus:ring-blue-500' 
                  : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              {resultImage ? 'Download Image' : 'Processing...'}
            </button>
          </div>

          {/* Processing Info */}
          {isProcessing && (
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{animationDelay: '0.2s'}}></div>
                <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{animationDelay: '0.4s'}}></div>
              </div>
              <p className="text-center text-blue-700 text-xs sm:text-sm mt-2 font-medium">
                AI is removing the background from your image
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;