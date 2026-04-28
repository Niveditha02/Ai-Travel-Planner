import React from 'react';
import { Clock, Ticket, Star, ExternalLink } from 'lucide-react';

function PlaceCard({ place, idx }) {
  const coords = place?.geoCoordinates || place?.geo_coordinates || place?.coordinates;
  let mapsUrl = null;
  if (typeof coords === 'string') {
    const parts = coords.split(',').map(s => s.trim());
    if (parts.length === 2) mapsUrl = `https://www.google.com/maps?q=${parts[0]},${parts[1]}`;
  } else if (coords?.latitude && coords?.longitude) {
    mapsUrl = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
  }

  return (
    <div className='group bg-slate-50/50 p-5 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex gap-5'>
      <div className='bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 self-start mt-1'>
        {idx + 1}
      </div>

      <div className='flex flex-col justify-center min-w-0'>
        <div className='flex items-center gap-2'>
          <h4 className='font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate'>
            ✨ {place?.placeName || place?.placename}
          </h4>
          {mapsUrl && (
            <a href={mapsUrl} target='_blank' rel='noopener noreferrer'
              className='shrink-0 text-blue-500 hover:text-blue-700'
              title='Open in Google Maps'>
              <ExternalLink className='w-3.5 h-3.5' />
            </a>
          )}
        </div>
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
          {(place?.ticketPricing || place?.TicketPricing || place?.ticketPrice || place?.ticket_pricing || place?.price) && (
            <div className='flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm'>
              <Ticket className='w-3 h-3 text-green-500' />
              <span className='text-[10px] font-bold text-slate-600'>{place?.ticketPricing || place?.TicketPricing || place?.ticketPrice || place?.ticket_pricing || place?.price}</span>
            </div>
          )}
          {place?.rating && (
            <div className='flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm'>
              <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
              <span className='text-[10px] font-bold text-slate-600'>{place?.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
