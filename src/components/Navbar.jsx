import React from 'react'
import {assets} from '../assets/assets.js'
const Navbar = () => {
return (
    <div className='flex justify-between items-center mx-4 py-3 lg:mx-44'>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
        <button className='bg-zinc-800 text-white flex item-center gap-1 py-2 px-4 sm:px-8 sm:py-3 text-sm rounded-full'>
            Get Started <img src={assets.arrow_icon} alt="arrow" />
        </button>
    </div>
)
}

export default Navbar