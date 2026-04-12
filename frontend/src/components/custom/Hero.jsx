import React from 'react'
import { Button } from '../ui/button'

import { Link } from 'react-router-dom'

function Hero() {
    return (
        <>
            <div className='flex flex-col items-center mx-56 gap-9'>
                <div>
                    <h1 className='font-extrabold text-[60px] text-center mt-16'><span className='text-[#ff6464d2]'>Discover Your Next Adventure with AI:</span>Personalized Travel Plans at Your Fingertips</h1>
                    <p className='text-xl text-gray-500 text-center mt-4'>Your personal trip planner and travel curator, creating custom iternities tailored to your interests and budget</p>
                </div>
                <Link to={'/create-trip'}>
                    <Button className='bg-[#000000] text-[#ffffff] py-3 px-6 rounded-lg font-bold text-lg hover:bg-[#6c6464] transition-all'>
                        Get Started, It's Free!
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default Hero