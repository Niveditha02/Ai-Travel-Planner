import React from 'react';
import { Button } from '../ui/button';

function Header() {
    return (
        <>
            <div className='w-full py-4 px-2 shadow-sm flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src="/logoipsum-295.svg" alt="logo" className='w-5 h-5' />
                    <h2 className='text-xl font-bold'>AI Travel Planner</h2>
                </div>
                <div>
                    <Button variant="ghost" className='text-sm'>Sign In</Button>
                    <Button variant="ghost" className='text-sm'>Sign Up</Button>
                </div>
            </div>
        </>
    )
}

export default Header