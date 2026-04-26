import React from 'react';
import { Star, MapPinIcon } from 'lucide-react';
import { GetPlaceDetails } from '../../service/GlobalApi';

function HotelCard({ hotel, location }) {
  const [photoUrl, setPhotoUrl] = React.useState("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80");

  React.useEffect(() => {
    const baseName = hotel?.hotelName || hotel?.HotelName;
    const queryName = location ? `${baseName} ${location} hotel` : baseName;
    if (queryName) {
      GetPlaceDetails(queryName).then(resp => {
        if (resp.data?.results?.length > 0) {
          setPhotoUrl(resp.data.results[0].urls.regular);
        }
      }).catch((e) => {
        console.error("Unsplash API Error:", e.response?.data || e.message);
      });
    }
  }, [hotel]);

  return (
    <div className='group cursor-pointer bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col'>
      <div className='relative overflow-hidden h-44'>
        <img
          src={photoUrl}
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
            <span className='text-sm font-bold'>{hotel?.price || hotel?.Price}</span>
          </div>
          <span className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Per Night</span>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
