import React from 'react';
import { Star, MapPinIcon, ExternalLink } from 'lucide-react';

function HotelCard({ hotel }) {
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
    <div className='group cursor-pointer bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col'>
      <div className='p-5 flex flex-col flex-grow gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-lg text-slate-800 leading-tight group-hover:text-blue-600 transition-colors'>
            {hotel?.hotelName || hotel?.HotelName}
          </h2>
          {hotel?.rating && (
            <div className='flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full shrink-0'>
              <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
              <span className='text-xs font-bold text-slate-700'>{hotel?.rating}</span>
            </div>
          )}
        </div>

        <div className='flex items-start gap-2 text-slate-500'>
          <MapPinIcon className='w-4 h-4 mt-0.5 shrink-0 text-slate-400' />
          <p className='text-xs font-medium line-clamp-2 italic flex-1'>{hotel?.hotelAddress || hotel?.address}</p>
          {mapsUrl && (
            <a href={mapsUrl} target='_blank' rel='noopener noreferrer'
              className='shrink-0 text-blue-500 hover:text-blue-700'
              title='Open in Google Maps'>
              <ExternalLink className='w-3.5 h-3.5' />
            </a>
          )}
        </div>

        <div className='mt-auto pt-3 border-t border-slate-50 flex justify-between items-center'>
          <div className='flex items-center gap-1 text-green-600 font-bold'>
            <span className='text-sm font-bold'>
              {hotel?.price || hotel?.Price || hotel?.pricePerNight || hotel?.PricePerNight || hotel?.price_per_night || 'N/A'}
            </span>
          </div>
          <span className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Per Night</span>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
