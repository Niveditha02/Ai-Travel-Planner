import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Hotels from '../../components/custom/Hotels';
import Itinerary from '../../components/custom/Itinerary';
import TripMap from '../../components/custom/TripMap';
import { Compass, Calendar, Wallet, Users, MapPin, Home, Sunrise, ExternalLink } from 'lucide-react';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [heroPhoto, setHeroPhoto] = useState('/placeholder.jpg');

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    useEffect(() => {
        if (trip?.location) {
            GetHeroPhoto();
        }
    }, [trip]);

    const GetTripData = async () => {
        setLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            const resp = await axios.get(`${baseUrl}/api/get-trip/${tripId}`);
            setTrip(resp.data);
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error("Failed to load trip details.");
        } finally {
            setLoading(false);
        }
    }

    const GetHeroPhoto = async () => {
        try {
            const resp = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(trip?.location)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`);
            if (resp.data.results.length > 0) {
                setHeroPhoto(resp.data.results[0].urls.regular);
            }
        } catch (error) {
            console.error("Hero photo error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mb-6"></div>
                <p className="text-slate-700 font-semibold text-lg">Loading Your Adventure...</p>
                <p className="text-slate-400 text-sm mt-2">Please wait while we prepare your travel plan</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center items-center">
                <div className="bg-white rounded-full p-6 shadow-lg mb-6">
                    <Compass className="w-16 h-16 text-blue-600" />
                </div>
                <p className="text-slate-700 font-semibold text-2xl mb-2">No Trip Found!</p>
                <p className="text-slate-400 text-base">Please check your trip ID or create a new trip.</p>
            </div>
        );
    }

    let parsedTripPlan = null;
    if (trip?.tripPlan) {
        if (typeof trip.tripPlan === 'object') {
            parsedTripPlan = trip.tripPlan;
        } else if (typeof trip.tripPlan === 'string') {
            try {
                let jsonString = trip.tripPlan.replace(/```json/gi, '').replace(/```/g, '').trim();
                parsedTripPlan = JSON.parse(jsonString);
            } catch (e) {
                console.error("Failed to parse tripPlan JSON", e);
            }
        }
    }

    // Prepare all places for the map
    const allPlaces = [];
    if (parsedTripPlan?.itinerary) {
        const itinerary = parsedTripPlan.itinerary;
        const days = Array.isArray(itinerary) ? itinerary : Object.values(itinerary);
        days.forEach(day => {
            const places = day.places || day.plan || day.placesToVisit || [];
            places.forEach(p => {
                const coords = p?.geoCoordinates || p?.geo_coordinates || p?.coordinates;
                let lat, lng;
                if (typeof coords === 'string') {
                    const parts = coords.split(',').map(s => parseFloat(s.trim()));
                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) [lat, lng] = parts;
                } else if (typeof coords === 'object' && coords !== null) {
                    lat = coords?.latitude ?? coords?.lat;
                    lng = coords?.longitude ?? coords?.lng;
                }
                if (lat && lng) {
                    allPlaces.push({ lat: Number(lat), lng: Number(lng), name: p?.placeName || p?.placename || p?.name || '' });
                }
            });
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] sm:h-[450px] w-full overflow-hidden">
                <img src={heroPhoto} alt={trip?.location} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col justify-center items-center text-white px-4">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 mb-4 sm:mb-6">
                        <Compass className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip?.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-0 leading-tight px-2 underline decoration-blue-500/50">
                            {trip?.location || "Your Journey"}
                        </h1>
                        <ExternalLink className="w-6 h-6 text-white/70 group-hover:text-white" />
                    </a>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 lg:-mt-20 relative z-30">
                
                {/* Trip Details Cards */}
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-xl">
                            <MapPin className="w-5 h-5 text-red-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Destination</p>
                                <p className="text-sm font-bold text-slate-800 truncate">{trip?.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Duration</p>
                                <p className="text-sm font-bold text-slate-800">{trip?.noOfDays} Days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl">
                            <Wallet className="w-5 h-5 text-green-600" />
                            <div className="flex-1">
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Budget</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{trip?.budget}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl">
                            <Users className="w-5 h-5 text-purple-600" />
                            <div className="flex-1">
                                <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Travelers</p>
                                <p className="text-sm font-bold text-slate-800">{trip?.traveler}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section - Prominent position */}
                {allPlaces.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-6 h-6 text-white" />
                                <h2 className="text-xl font-bold text-white">Interactive Route Map</h2>
                            </div>
                        </div>
                        <div className="p-4">
                            <TripMap places={allPlaces} zoom={12} />
                        </div>
                    </div>
                )}

                {/* Trip Content */}
                <div className="space-y-8 pb-12">
                    {/* Hotels Section */}
                    {parsedTripPlan && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4">
                                <div className="flex items-center gap-3">
                                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    <h2 className="text-base sm:text-xl font-bold text-white">Recommended Hotels</h2>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <Hotels tripPlan={parsedTripPlan} location={trip?.location} />
                            </div>
                        </div>
                    )}

                    {/* Itinerary Section */}
                    {parsedTripPlan && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-4 sm:px-6 py-3 sm:py-4">
                                <div className="flex items-center gap-3">
                                    <Sunrise className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    <h2 className="text-base sm:text-xl font-bold text-white">Daily Itinerary</h2>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <Itinerary tripPlan={parsedTripPlan} location={trip?.location} />
                            </div>
                        </div>
                    )}

                    {/* Fallback for text-based trip plan */}
                    {!parsedTripPlan && trip?.tripPlan && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Compass className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Your Travel Plan</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
                                    <p className="text-amber-800 text-sm font-medium">✨ AI-Generated Travel Itinerary</p>
                                </div>
                                <div className="prose max-w-none">
                                    <pre className="whitespace-pre-wrap font-sans text-slate-700 bg-slate-50 p-6 rounded-xl text-sm leading-relaxed">
                                        {trip.tripPlan}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-12 py-8 border-t border-slate-200">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Compass className="w-5 h-5 text-blue-600" />
                            <p className="text-slate-600">
                                Powered by <span className="font-bold text-blue-600">AI Travel Planner</span>
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                            <span>✈️ Safe Travels</span>
                            <span>🌟 Create Memories</span>
                            <span>📸 Enjoy Every Moment</span>
                        </div>
                        {trip?.userEmail && (
                            <p className="text-slate-400 text-xs mt-4">
                                Curated exclusively for {trip.userEmail}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewTrip;