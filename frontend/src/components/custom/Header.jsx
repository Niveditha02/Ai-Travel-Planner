import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { User, LogOut, PlusCircle } from 'lucide-react';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    return (
        <header
            className={`
                sticky top-0 z-50 w-full
                transition-all duration-300 ease-in-out
                ${scrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200/60'
                    : 'bg-white/60 backdrop-blur-sm border-b border-transparent shadow-sm'
                }
            `}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between'>

                {/* Brand */}
                <Link to={'/'} className='flex items-center gap-2.5 group cursor-pointer select-none'>
                    {/* Logo mark */}
                    <div className='relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-shadow duration-300'>
                        <img
                            src="/logoipsum-295.svg"
                            alt="AI Travel Planner logo"
                            className='w-4 h-4 brightness-0 invert'
                        />
                        {/* Animated pulse dot */}
                        <span className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse' />
                    </div>

                    {/* Brand name */}
                    <div className='flex flex-col leading-none'>
                        <span className='font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent'>
                            AI Travel Planner
                        </span>
                        <span className='text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em] leading-none mt-0.5'>
                            Your AI Journey Curator
                        </span>
                    </div>
                </Link>

                <div className='flex items-center gap-4 sm:gap-8'>
                    {/* Navigation Links */}
                    <nav className='hidden md:flex items-center gap-6'>
                        <Link to="/" className='text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors'>
                            Home
                        </Link>
                        <Link to="/create-trip" className='text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors'>
                            Plan Trip
                        </Link>
                    </nav>

                    <div className='flex items-center gap-4'>
                        {user ? (
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <Link to='/create-trip' className="hidden lg:block">
                                    <Button variant="outline" className="rounded-full text-xs font-bold h-9 gap-2">
                                        <PlusCircle className="w-3.5 h-3.5" />
                                        New Trip
                                    </Button>
                                </Link>
                                
                                <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-full border border-slate-200">
                                    <div className='w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-slate-100'>
                                        {user.picture && !imgError ? (
                                            <img 
                                                src={user.picture} 
                                                alt="profile" 
                                                className="w-full h-full object-cover" 
                                                onError={() => setImgError(true)}
                                            />
                                        ) : (
                                            <User className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="p-1.5 hover:bg-white hover:text-red-500 rounded-full transition-colors text-slate-400"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to='/create-trip'>
                                <Button className="rounded-full text-xs font-bold h-9 bg-blue-600 hover:bg-blue-700 px-6 shadow-md shadow-blue-100">
                                    Get Started
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;