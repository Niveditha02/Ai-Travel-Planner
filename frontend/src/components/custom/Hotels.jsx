import React from 'react';
import { BedDouble, Star, MapPinIcon, DollarSign } from 'lucide-react';

function Hotels({ tripPlan }) {
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
          <div key={index} className='group cursor-pointer bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col'>
            <div className='relative overflow-hidden h-44'>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt={hotel?.hotelName || "Hotel"}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                <span className='text-xs font-bold text-slate-700'>{hotel?.rating || '4.5'}</span>
              </div>
            </div>

            <div className='p-5 flex flex-col flex-grow gap-2'>
              <h2 className='font-bold text-lg text-slate-800 leading-tight group-hover:text-blue-600 transition-colors'>
                {hotel?.hotelName || hotel?.HotelName}
              </h2>

              <div className='flex items-start gap-2 text-slate-500'>
                <MapPinIcon className='w-4 h-4 mt-0.5 shrink-0 text-slate-400' />
                <p className='text-xs font-medium line-clamp-2 italic'>{hotel?.hotelAddress || hotel?.address}</p>
              </div>

              <div className='mt-auto pt-3 border-t border-slate-50 flex justify-between items-center'>
                <div className='flex items-center gap-1 text-green-600 font-bold'>
                  <DollarSign className='w-4 h-4' />
                  <span className='text-sm'>{hotel?.price || hotel?.Price}</span>
                </div>
                <span className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Per Night</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
