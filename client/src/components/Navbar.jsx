import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to={"/"} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <img 
                className="w-9 sm:w-11 transition-all duration-300 group-hover:scale-110 drop-shadow-sm" 
                src={assets.logo_icon} 
                alt="BG-Wipe AI Logo" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent hidden xs:block leading-tight">
                BG-Wipe AI
              </p>
              <p className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent xs:hidden leading-tight">
                BG-Wipe
              </p>
              <p className="text-xs text-gray-500 font-medium hidden sm:block -mt-1">
                AI Background Removal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isSignedIn ? (
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {/* Credits */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full shadow-sm">
                <img className="w-4 h-4" src={assets.credit_icon} alt="" />
                <p className="text-sm font-semibold text-gray-700">
                  {credit}
                </p>
                <span className="text-xs text-gray-500 hidden lg:inline">credits</span>
              </div>
              
              {/* History Button */}
              <button
                onClick={() => navigate("/history")}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200 border border-transparent hover:border-purple-200"
              >
                History
              </button>
              
              {/* Welcome Message */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-600 font-medium">
                  {user?.firstName || 'User'}
                </p>
              </div>
              
              {/* User Button */}
              <div className="relative">
                <div className="ring-2 ring-purple-200 hover:ring-purple-300 rounded-full transition-all duration-200">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                        userButtonPopoverCard: "shadow-xl border border-purple-100",
                        userButtonPopoverActionButton: "hover:bg-purple-50"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={() => openSignIn({})}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 group"
              >
                Get Started
                <img className="w-3 group-hover:translate-x-0.5 transition-transform" src={assets.arrow_icon} alt="" />
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {isSignedIn ? (
              <>
                {/* Mobile Credits */}
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full">
                  <img className="w-3 h-3" src={assets.credit_icon} alt="" />
                  <p className="text-xs font-semibold text-gray-700">{credit}</p>
                </div>
                
                {/* Hamburger Menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-5 w-5`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-5 w-5`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={() => openSignIn({})}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:scale-105"
              >
                Sign In
                <img className="w-3" src={assets.arrow_icon} alt="" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isSignedIn && (
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="px-3 pt-3 pb-4 space-y-3 bg-white border-t border-gray-100">
              {/* Welcome Message */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {(user?.firstName?.[0] || user?.fullName?.[0] || 'U').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Welcome back!
                  </p>
                  <p className="text-xs text-gray-600">
                    {user?.firstName || user?.fullName || 'User'}
                  </p>
                </div>
              </div>
              
              {/* History Button */}
              <button
                onClick={() => {
                  navigate("/history");
                  closeMobileMenu();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 border border-transparent hover:border-purple-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View History
              </button>
              
              {/* User Button Container */}
              <div className="flex justify-center pt-2">
                <div className="ring-2 ring-purple-200 rounded-full">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverCard: "shadow-xl border border-purple-100"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;