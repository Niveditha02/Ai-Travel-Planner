import React from 'react';
import { BedDouble, Star, MapPinIcon } from 'lucide-react';

import HotelCard from './HotelCard';

function Hotels({ tripPlan, location }) {
  const hotelOptions = tripPlan?.hotelOptions || tripPlan?.hotel_options || tripPlan?.hotels || [];

  if (!hotelOptions || hotelOptions.length === 0) return null;

  return (
    <div className='animate-in fade-in slide-in-from-bottom-5 duration-700'>
      <div className='flex items-center gap-2 mb-6'>
        <span className='text-3xl'>🏨</span>
        <h2 className='font-extrabold text-2xl text-slate-800 tracking-tight'>Handpicked Stays for You</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {hotelOptions.map((hotel, index) => (
          <HotelCard hotel={hotel} location={location} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
