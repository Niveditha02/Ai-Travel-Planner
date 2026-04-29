import React from 'react';
import { Clock, Ticket, Star, MapPin, CheckCircle2 } from 'lucide-react';
import PlaceCard from './PlaceCard';

function Itinerary({ tripPlan }) {
    let itineraryDisplay = [];

    if (tripPlan?.itinerary) {
        if (Array.isArray(tripPlan.itinerary)) {
            itineraryDisplay = tripPlan.itinerary;
        } else if (typeof tripPlan.itinerary === 'object') {
            itineraryDisplay = Object.keys(tripPlan.itinerary).map((key) => ({
                dayOrKey: key,
                ...tripPlan.itinerary[key]
            }));
        }
    }

    if (itineraryDisplay.length === 0) return null;

    return (
        <div className='animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200'>
            <div className='flex items-center gap-2 mb-6 sm:mb-8'>
                <span className='text-2xl sm:text-3xl'>🗺️</span>
                <h2 className='font-extrabold text-lg sm:text-2xl text-slate-800 tracking-tight'>Your Day-by-Day Adventure</h2>
            </div>

            <div className='space-y-12'>
                {itineraryDisplay.map((dayPlan, index) => {
                    const places = dayPlan.places || dayPlan.plan || dayPlan.placesToVisit || [];

                    return (
                        <div key={index} className='relative'>
                            {/* Timeline vertical line */}
                            <div className='absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent md:-translate-x-1/2 opacity-20 hidden md:block'></div>

                            <div className='flex flex-col md:flex-row items-center gap-8 relative'>
                                {/* Day Marker */}
                                <div className='md:absolute md:left-1/2 md:-translate-x-1/2 z-10'>
                                    <div className='bg-blue-600 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-blue-200 border-4 border-white'>
                                        <span className='text-[10px] font-black uppercase leading-none'>Day</span>
                                        <span className='text-xl font-black leading-none'>{dayPlan.day || index + 1}</span>
                                    </div>
                                </div>

                                {/* Day Content */}
                                <div className='w-full'>
                                    <div className='bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-4'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
                                            <CheckCircle2 className='text-green-500 w-4 h-4 sm:w-5 sm:h-5 shrink-0' />
                                            <h3 className='font-black text-base sm:text-xl text-slate-800 leading-snug'>
                                                {dayPlan.theme || dayPlan.title || `Day ${dayPlan.day || index + 1} Exploration`}
                                            </h3>
                                        </div>

                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                                            {places.map((place, idx) => (
                                                <PlaceCard place={place} idx={idx} key={idx} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Itinerary;
