import React from 'react';
import { Clock, Ticket, Star, ExternalLink, MapPin } from 'lucide-react';

function PlaceCard({ place, idx }) {
  const name = place?.placeName || place?.placename;
  const coords = place?.geoCoordinates || place?.geo_coordinates || place?.coordinates;
  let mapsUrl = null;

  if (typeof coords === 'string') {
    const parts = coords.split(',').map(s => s.trim());
    if (parts.length === 2) mapsUrl = `https://www.google.com/maps?q=${parts[0]},${parts[1]}`;
  } else if (coords?.latitude && coords?.longitude) {
    mapsUrl = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
  }

  if (!mapsUrl && name) {
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  }

  return (
    <a 
      href={mapsUrl || '#'} 
      target='_blank' 
      rel='noopener noreferrer'
      className='group block bg-white rounded-3xl border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden no-underline'
    >
      <div className='p-6 flex items-start gap-5'>
        {/* Number Badge */}
        <div className='bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-md shadow-blue-200 shrink-0'>
          {idx + 1}
        </div>

        <div className='flex flex-col justify-center min-w-0 flex-1'>
          <div className='flex items-start justify-between gap-4 mb-2'>
            <h4 className='font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate text-lg sm:text-xl'>
              ✨ {name}
            </h4>
            <ExternalLink className='w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0' />
          </div>
          
          <p className='text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium mb-4'>
            {place?.placeDetails || place?.details}
          </p>

          <div className='flex flex-wrap gap-3'>
            {(place?.timeToVisit || place?.time) && (
              <div className='flex items-center gap-1.5 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100/50'>
                <Clock className='w-3.5 h-3.5 text-blue-500' />
                <span className='text-xs font-bold text-slate-700'>{place?.timeToVisit || place?.time}</span>
              </div>
            )}
            {(place?.ticketPricing || place?.ticketPrice || place?.price) && (
              <div className='flex items-center gap-1.5 bg-green-50/50 px-3 py-1.5 rounded-xl border border-green-100/50'>
                <Ticket className='w-3.5 h-3.5 text-green-500' />
                <span className='text-xs font-bold text-slate-700'>{place?.ticketPricing || place?.ticketPrice || place?.price}</span>
              </div>
            )}
            {place?.rating && (
              <div className='flex items-center gap-1.5 bg-yellow-50/50 px-3 py-1.5 rounded-xl border border-yellow-100/50'>
                <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                <span className='text-xs font-bold text-slate-700'>{place?.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default PlaceCard;
