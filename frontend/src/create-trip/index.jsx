// Geoapify Geocoder Autocomplete
import React, { useState, useEffect } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Input } from '@/components/ui/input';
import { BudgetOptions, TravelOptions, AI_PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from '@/components/ui/dialog';
import { chatSession } from '@/service/AIModal';
import { useNavigate } from 'react-router-dom';
import { MapPin, CalendarDays, Wallet, Users, Sparkles, Loader2, ArrowRight } from 'lucide-react';

/* ── Step indicator data ───────────────────────────────────── */
const STEPS = [
    { icon: <MapPin className="w-4 h-4" />,       label: 'Destination' },
    { icon: <CalendarDays className="w-4 h-4" />, label: 'Duration'    },
    { icon: <Wallet className="w-4 h-4" />,       label: 'Budget'      },
    { icon: <Users className="w-4 h-4" />,        label: 'Travelers'   },
];

function CreateTrip() {
    const [formData, setFormData]     = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading]       = useState(false);
    const navigate = useNavigate();

    /* Count how many fields are filled for the step indicator */
    const filledCount = [
        !!formData.Location,
        !!formData.noOfDays,
        !!formData.budget,
        !!formData.traveler,
    ].filter(Boolean).length;

    const handleInputChange = (name, value) => {
        if (name === 'noOfDays' && value > 5) return;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log('Updated formData:', formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: tokenInfo => getUserProfile(tokenInfo),
        onError:   error     => console.log(error),
    });

    const getUserProfile = tokenInfo => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'Application/json',
                },
            })
            .then(resp => {
                localStorage.setItem('user', JSON.stringify(resp.data));
                setOpenDialog(false);
                GenerateTrip();
            });
    };

    const GenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) { setOpenDialog(true); return; }
        if (!formData?.Location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast('Please fill all the fields');
            return;
        }
        setLoading(true);
        try {
            const parsedUser = JSON.parse(user);
            const result     = await chatSession.sendMessage({ ...formData, userEmail: parsedUser.email });
            const tripId     = result?.response?.tripId;
            if (tripId) {
                toast('Trip generated and saved successfully!');
                navigate('/view-trip/' + tripId);
            } else {
                throw new Error('No trip ID returned from backend');
            }
        } catch (error) {
            console.error('Generation Error:', error);
            toast('Something went wrong while generating the trip.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

            {/* ── Hero banner ──────────────────────────────── */}
            <div className="relative bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-900 overflow-hidden">
                {/* Blobs */}
                <div className="absolute top-[-40%] left-[-5%] w-72 h-72 rounded-full bg-blue-600/20 blur-[80px]" />
                <div className="absolute bottom-[-40%] right-[-5%] w-64 h-64 rounded-full bg-purple-600/25 blur-[70px]" />

                <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 sm:py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span className="text-xs font-semibold text-white/90 tracking-wider uppercase">AI Trip Generator</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                        Tell Us Your Travel<br />
                        <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                            Preferences 🏕️🌴
                        </span>
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                        Answer a few quick questions and our AI will craft a personalised, day-by-day itinerary just for you.
                    </p>
                </div>
            </div>

            {/* ── Progress steps ───────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6 -mt-5 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-4">
                    <div className="flex items-center justify-between">
                        {STEPS.map((step, i) => {
                            const done    = i < filledCount;
                            const current = i === filledCount;
                            return (
                                <div key={i} className="flex flex-col items-center flex-1 relative">
                                    {/* Connector */}
                                    {i < STEPS.length - 1 && (
                                        <div className={`absolute top-4 left-[55%] w-full h-px transition-colors duration-500 ${done ? 'bg-blue-400' : 'bg-slate-200'}`} />
                                    )}
                                    {/* Circle */}
                                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                        done    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md shadow-blue-200' :
                                        current ? 'bg-blue-50 border-2 border-blue-500 text-blue-600' :
                                                  'bg-slate-100 text-slate-400'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                                        done ? 'text-blue-600' : current ? 'text-blue-500' : 'text-slate-400'
                                    }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Form body ────────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-6 pb-16 pt-8 space-y-6">

                {/* ── Section card wrapper ── */}
                {/* 1. Destination */}
                <SectionCard
                    icon={<MapPin className="w-5 h-5 text-blue-600" />}
                    iconBg="bg-blue-50"
                    number="01"
                    title="What is your destination of choice?"
                    subtitle="Search for any city, region or country"
                >
                    <div className="mt-4 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
                            <GeoapifyGeocoderAutocomplete
                                placeholder="🔍  Search for a city (e.g. Las Vegas)"
                                type="city"
                                placeSelect={value => {
                                    handleInputChange('Location', value?.properties?.formatted);
                                    console.log('Selected Location:', value?.properties?.formatted);
                                }}
                            />
                        </GeoapifyContext>
                    </div>
                    {formData.Location && (
                        <div className="mt-2 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {formData.Location}
                        </div>
                    )}
                </SectionCard>

                {/* 2. Number of Days */}
                <SectionCard
                    icon={<CalendarDays className="w-5 h-5 text-orange-500" />}
                    iconBg="bg-orange-50"
                    number="02"
                    title="How many days are you planning your trip?"
                    subtitle="Maximum 5 days"
                >
                    <div className="mt-4 relative">
                        <Input
                            type="number"
                            placeholder="e.g.  3"
                            min="1"
                            max="5"
                            className="h-12 pl-4 pr-16 text-base rounded-xl border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                            onChange={e => handleInputChange('noOfDays', e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-wider">days</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Enter a number between 1 and 5</p>
                </SectionCard>

                {/* 3. Budget */}
                <SectionCard
                    icon={<Wallet className="w-5 h-5 text-emerald-600" />}
                    iconBg="bg-emerald-50"
                    number="03"
                    title="What is your budget?"
                    subtitle="Select the option that best fits your trip"
                >
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {BudgetOptions.map((item, index) => {
                            const selected = formData.budget === item.title;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleInputChange('budget', item.title)}
                                    className={`relative group p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center overflow-hidden
                                        ${selected
                                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg shadow-blue-100'
                                            : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    {selected && (
                                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                    <span className="text-3xl mb-2 inline-block">{item.icon}</span>
                                    <h3 className={`font-bold text-sm ${selected ? 'text-blue-700' : 'text-slate-700'}`}>{item.title}</h3>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>

                {/* 4. Travelers */}
                <SectionCard
                    icon={<Users className="w-5 h-5 text-purple-600" />}
                    iconBg="bg-purple-50"
                    number="04"
                    title="Who do you plan on travelling with?"
                    subtitle="Choose your travel companion type"
                >
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {TravelOptions.map((item, index) => {
                            const selected = formData.traveler === item.people;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleInputChange('traveler', item.people)}
                                    className={`relative group p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center overflow-hidden
                                        ${selected
                                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg shadow-purple-100'
                                            : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    {selected && (
                                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                    <span className="text-3xl mb-2 inline-block">{item.icon}</span>
                                    <h3 className={`font-bold text-sm ${selected ? 'text-purple-700' : 'text-slate-700'}`}>{item.title}</h3>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>

                {/* ── Generate Button ─────────────────────── */}
                <div className="pt-2">
                    <Button
                        disabled={loading}
                        onClick={GenerateTrip}
                        className="group w-full sm:w-auto sm:min-w-[220px] h-13 py-3.5 px-8 rounded-full font-bold text-base
                            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                            text-white shadow-xl shadow-blue-200 hover:shadow-blue-300 border-0
                            transition-all duration-300 hover:-translate-y-0.5
                            flex items-center justify-center gap-2 mx-auto sm:mx-0 sm:ml-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating your trip...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Generate My Trip
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                    <p className="text-xs text-slate-400 text-center sm:text-right mt-3">
                        Powered by Google Gemini AI · Results in seconds
                    </p>
                </div>
            </div>

            {/* ── Google Sign-In Dialog ─────────────────────── */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md rounded-2xl p-8">
                    <DialogHeader className="flex flex-col items-center text-center">
                        {/* Logo in gradient badge */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-200 mb-5">
                            <img src="/logoipsum-295.svg" alt="logo" className="w-8 h-8 brightness-0 invert" />
                        </div>
                        <h2 className="font-extrabold text-2xl text-slate-900 tracking-tight mb-1">
                            Sign in to Continue
                        </h2>
                        <DialogDescription className="text-center">
                            <span className="text-slate-500 font-medium text-sm block leading-relaxed">
                                Sign in securely with your Google account to generate and save your personalised trip.
                            </span>
                            <span className="text-xs text-slate-400 block mt-3 italic">
                                By signing in you agree to our Terms of Service and Privacy Policy.
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <Button
                        disabled={loading}
                        onClick={login}
                        variant="outline"
                        className="w-full mt-6 h-12 rounded-xl flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-slate-700"
                    >
                        <FcGoogle className="h-6 w-6" />
                        Continue with Google
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

/* ── Reusable section card ─────────────────────────────────── */
function SectionCard({ icon, iconBg, number, title, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8">
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                    {icon}
                </div>
                {/* Title block */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{number}</span>
                    </div>
                    <h2 className="font-bold text-slate-800 text-base sm:text-lg leading-snug">{title}</h2>
                    {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

export default CreateTrip;
