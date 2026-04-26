import React from 'react';
import { Clock, Ticket, Star } from 'lucide-react';
import { GetPlaceImage } from '../../service/GlobalApi';

const DEFAULT_IMG = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80";

function PlaceCard({ place, idx, location }) {
  const [photoUrl, setPhotoUrl] = React.useState(DEFAULT_IMG);
  const [imgLoading, setImgLoading] = React.useState(true);

  React.useEffect(() => {
    const placeName = place?.placeName || place?.placename;
    if (!placeName) return;

    setImgLoading(true);
    GetPlaceImage(placeName, location || "")
      .then(url => {
        if (url) setPhotoUrl(url);
      })
      .catch(() => {})
      .finally(() => setImgLoading(false));
  }, [place, location]);

  return (
    <div className='group bg-slate-50/50 p-5 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex gap-5'>
      <div className='relative shrink-0'>
        {imgLoading && (
          <div className='w-24 h-24 rounded-2xl bg-slate-200 animate-pulse' />
        )}
        <img
          src={photoUrl}
          alt={place?.placeName}
          onLoad={() => setImgLoading(false)}
          className={`w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform ${imgLoading ? 'hidden' : 'block'}`}
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
  );
}

export default PlaceCard;
