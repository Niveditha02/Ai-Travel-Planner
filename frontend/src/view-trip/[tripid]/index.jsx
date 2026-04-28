//new code

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Hotels from '../../components/custom/Hotels';
import Itinerary from '../../components/custom/Itinerary';
import TripMap from '../../components/custom/TripMap';
import { Compass, Calendar, Wallet, Users, MapPin, Home, Sunrise } from 'lucide-react';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    const GetTripData = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`http://localhost:5000/api/get-trip/${tripId}`);
            console.log("Fetched Trip:", resp.data);
            setTrip(resp.data);
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error("Failed to load trip details.");
        } finally {
            setLoading(false);
        }
    }

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Full width header — no image, gradient only */}
            <div className="relative h-[300px] w-full bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="h-full flex flex-col justify-center items-center text-white px-4">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 mb-6">
                        <Compass className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-center mb-3">
                        {trip?.location || "Your Journey"}
                    </h1>
                    <p className="text-xl text-white/90 text-center max-w-2xl">
                        Expertly curated travel experience just for you
                    </p>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">

                {/* Trip Details Cards - Fixed Height Single Line */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Destination - Single Line */}
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-50/30 rounded-xl min-w-0">
                            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                                <MapPin className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-0.5">Destination</p>
                                <div className="text-sm font-bold text-slate-800">
                                    <span className="inline-block max-w-full break-words">
                                        {trip?.location || "Not set"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Duration - Single Line */}
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-50/30 rounded-xl">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Duration</p>
                                <p className="text-sm font-bold text-slate-800">{trip?.noOfDays} {trip?.noOfDays === 1 ? 'Day' : 'Days'}</p>
                            </div>
                        </div>

                        {/* Budget - Single Line */}
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-50/30 rounded-xl">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Wallet className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-green-600 font-semibold uppercase tracking-wider">Budget</p>
                                <p className="text-sm font-bold text-slate-800 capitalize">{trip?.budget || "Not set"}</p>
                            </div>
                        </div>

                        {/* Travelers - Single Line */}
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-50/30 rounded-xl">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Travelers</p>
                                <p className="text-sm font-bold text-slate-800">{trip?.traveler}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Content */}
                <div className="space-y-8 pb-12">
                    {/* Map Section */}
                    {parsedTripPlan && (() => {
                        const allPlaces = [];
                        const itinerary = parsedTripPlan?.itinerary;
                        const days = Array.isArray(itinerary)
                            ? itinerary
                            : Object.values(itinerary || {});
                        days.forEach(day => {
                            const places = day.places || day.plan || day.placesToVisit || [];
                            places.forEach(p => {
                                const coords = p?.geoCoordinates || p?.geo_coordinates || p?.coordinates;
                                let lat, lng;
                                if (typeof coords === 'string') {
                                    // Handle "lat, lng" string format
                                    const parts = coords.split(',').map(s => parseFloat(s.trim()));
                                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                                        [lat, lng] = parts;
                                    }
                                } else if (typeof coords === 'object' && coords !== null) {
                                    lat = coords?.latitude ?? coords?.lat;
                                    lng = coords?.longitude ?? coords?.lng;
                                }
                                if (lat && lng) {
                                    const name = p?.placeName || p?.placename || p?.name || '';
                                    console.log('Pushing place:', name, lat, lng);
                                    allPlaces.push({ lat: Number(lat), lng: Number(lng), name });
                                }
                            });
                        });
                        if (allPlaces.length === 0) return null;
                        return (
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-6 h-6 text-white" />
                                        <h2 className="text-xl font-bold text-white">Interactive Map</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <TripMap places={allPlaces} zoom={12} />
                                </div>
                            </div>
                        );
                    })()}

                    {/* Hotels Section */}
                    {parsedTripPlan && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Home className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Recommended Hotels</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <Hotels tripPlan={parsedTripPlan} location={trip?.location} />
                            </div>
                        </div>
                    )}

                    {/* Itinerary Section */}
                    {parsedTripPlan && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Sunrise className="w-6 h-6 text-white" />
                                    <h2 className="text-xl font-bold text-white">Daily Itinerary</h2>
                                </div>
                            </div>
                            <div className="p-6">
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