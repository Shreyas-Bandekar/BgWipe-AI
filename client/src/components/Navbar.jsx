import React, { useEffect,useContext } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import AppContextProvider, { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { isSignedIn } = useUser()
    const { credits, fetchCredits } = useContext(AppContext)

    useEffect(() => {
        if (isSignedIn) {
            fetchCredits()
        }
    }, [isSignedIn])

    return (
        <nav className="w-full bg-white shadow-sm">
            <div className="flex flex-wrap justify-between items-center mx-4 py-3 lg:mx-44">
                <Link to="/" className="flex items-center gap-2">
                    <img src={assets.logo_icon} alt="logo" className="w-7 sm:w-10" />
                    <span className="text-lg font-bold text-zinc-800">BgWipe-AI</span>
                </Link>
                <div className="flex items-center gap-2">
                    {isSignedIn ? (
                        <div className='flex items-center gap-2 sm:gap-3'>
                            <button className='flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-1.5 rounded-full hover:scale-105 transition-all duration-700 '>
                                <img className='w-5' src={assets.credit_icon} alt="" />
                                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits: {credits}</p>
                            </button>
                            <UserButton />
                        </div>
                    ) : (
                        <button
                            onClick={() => openSignIn({})}
                            className="bg-zinc-800 text-white flex items-center gap-2 py-2 px-4 sm:px-8 sm:py-3 text-sm rounded-full transition hover:bg-zinc-700"
                        >
                            <span className="">Get Started</span>
                            <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar