import React from 'react'
import { Button } from '../ui/button';

function Header() {
    return (
        <>
            <div className='w-full py-4 px-2 shadow-sm flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src="/logoipsum-295.svg" alt="logo" className='w-10 h-10' />
                    <h2>AI Travel Planner</h2>
                </div>
                <div>
                    <Button variant="ghost">Sign In</Button>
                    <Button variant="ghost">Sign Up</Button>
                </div>
            </div>
        </>
    )
}

export default Header