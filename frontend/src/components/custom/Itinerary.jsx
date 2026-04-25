import React from 'react';
import { Clock, Ticket, Star, MapPin, CheckCircle2 } from 'lucide-react';

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
            <div className='flex items-center gap-2 mb-8'>
                <span className='text-3xl'>🗺️</span>
                <h2 className='font-extrabold text-2xl text-slate-800 tracking-tight'>Your Day-by-Day Adventure</h2>
            </div>

            <div className='space-y-12'>
                {itineraryDisplay.map((dayPlan, index) => {
                    const places = dayPlan.places || dayPlan.plan || dayPlan.placesToVisit || [];

                    return (
                        <div key={index} className='relative pl-8 md:pl-0'>
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
                                    <div className='bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 mb-4'>
                                        <div className='flex items-center gap-3 mb-6'>
                                            <CheckCircle2 className='text-green-500 w-5 h-5' />
                                            <h3 className='font-black text-xl text-slate-800'>
                                                {dayPlan.theme || dayPlan.title || `Day ${dayPlan.day || index + 1} Exploration`}
                                            </h3>
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            {places.map((place, idx) => (
                                                <div key={idx} className='group bg-slate-50/50 p-5 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex gap-5'>
                                                    <div className='relative shrink-0'>
                                                        <img
                                                            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80"
                                                            alt={place?.placeName}
                                                            className='w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform'
                                                        />
                                                        <div className='absolute -top-2 -left-2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-xs font-bold'>
                                                            {idx + 1}
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-col justify-center min-w-0'>
                                                        <h4 className='font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate'>
                                                            ✨ {place?.placeName || place?.placename}
                                                        </h4>
                                                        <p className='text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-medium'>
                                                            {place?.placeDetails || place?.details}
                                                        </p>

                                                        <div className='mt-4 flex flex-wrap gap-2'>
                                                            {(place?.timeToVisit || place?.time) && (
                                                                <div className='flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm'>
                                                                    <Clock className='w-3 h-3 text-blue-500' />
                                                                    <span className='text-[10px] font-bold text-slate-600'>{place?.timeToVisit || place?.time}</span>
                                                                </div>
                                                            )}
                                                            {(place?.ticketPricing || place?.price) && (
                                                                <div className='flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm'>
                                                                    <Ticket className='w-3 h-3 text-green-500' />
                                                                    <span className='text-[10px] font-bold text-slate-600'>{place?.ticketPricing || place?.price}</span>
                                                                </div>
                                                            )}
                                                            <div className='flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm'>
                                                                <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                                                                <span className='text-[10px] font-bold text-slate-600'>{place?.rating || '4.8'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
