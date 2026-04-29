import React from 'react';
import { Star, MapPinIcon, ExternalLink } from 'lucide-react';

function HotelCard({ hotel }) {
  const name = hotel?.hotelName || hotel?.HotelName;
  const coords = hotel?.geoCoordinates || hotel?.geo_coordinates || hotel?.coordinates;
  let mapsUrl = null;

  if (typeof coords === 'string') {
    const parts = coords.split(',').map(s => s.trim());
    if (parts.length === 2) mapsUrl = `https://www.google.com/maps?q=${parts[0]},${parts[1]}`;
  } else if (coords?.latitude && coords?.longitude) {
    mapsUrl = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
  } else if (hotel?.hotelAddress || hotel?.address) {
    const addr = encodeURIComponent(hotel?.hotelAddress || hotel?.address);
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addr}`;
  }

  return (
    <a 
      href={mapsUrl || '#'} 
      target='_blank' 
      rel='noopener noreferrer'
      className='group block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col no-underline'
    >
      <div className='p-6 flex flex-col flex-grow gap-3'>
        <div className='flex items-start justify-between gap-4'>
          <h2 className='font-bold text-xl text-slate-800 leading-tight group-hover:text-blue-600 transition-colors'>
            {name}
          </h2>
          {hotel?.rating && (
            <div className='flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full shrink-0 border border-yellow-100'>
              <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
              <span className='text-xs font-bold text-slate-700'>{hotel?.rating}</span>
            </div>
          )}
        </div>

        <div className='flex items-start gap-2 text-slate-500'>
          <MapPinIcon className='w-4 h-4 mt-0.5 shrink-0 text-blue-400' />
          <p className='text-xs font-medium line-clamp-2 italic flex-1 leading-relaxed'>{hotel?.hotelAddress || hotel?.address}</p>
          <ExternalLink className='w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0' />
        </div>

        <div className='mt-4 pt-4 border-t border-slate-50 flex justify-between items-center'>
          <div className='flex items-center gap-1.5 text-emerald-600'>
            <span className='text-lg font-black'>
              {hotel?.price || hotel?.Price || hotel?.pricePerNight || hotel?.PricePerNight || hotel?.price_per_night || 'N/A'}
            </span>
          </div>
          <span className='text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]'>Per Night</span>
        </div>
      </div>
    </a>
  );
}

export default HotelCard;
