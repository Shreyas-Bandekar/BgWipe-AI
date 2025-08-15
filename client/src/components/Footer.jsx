import React from 'react';
import { assets } from '../assets/assets.js';

const Footer = () => {
        return (
                <footer className="w-full bg-white border-t border-gray-200">
                        <div className="flex flex-row items-center justify-between px-4 md:px-20 py-4">
                                {/* Logo, name, and copyright (desktop) */}
                                <div className="flex items-center gap-3">
                                        <img width={40} src={assets.logo_icon} alt="BG-Wipe AI Logo" />
                                        <span className="hidden lg:inline text-xl font-bold text-gray-700 tracking-wide">
                                                BG-Wipe AI
                                        </span>
                                        <span className="hidden md:inline text-xs text-gray-400 ml-4">
                                                © 2025 BG-Wipe AI. All rights reserved.
                                        </span>
                                </div>
                                {/* Social icons */}
                                <div className="flex gap-3">
                                        <a href="#" aria-label="Google Plus" className="hover:scale-110 transition-transform">
                                                <img width={28} src={assets.google_plus_icon} alt="Google Plus" />
                                        </a>
                                        <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
                                                <img width={28} src={assets.facebook_icon} alt="Facebook" />
                                        </a>
                                        <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
                                                <img width={28} src={assets.twitter_icon} alt="Twitter" />
                                        </a>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;
