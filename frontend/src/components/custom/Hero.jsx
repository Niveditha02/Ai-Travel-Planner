import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Map, Clock, Shield, Star, ArrowRight, Globe, Wallet, Users } from 'lucide-react';

/* ── Feature cards data ──────────────────────────────────── */
const features = [
    {
        icon: <Sparkles className="w-6 h-6" />,
        color: 'from-violet-500 to-purple-600',
        bg: 'from-violet-50 to-purple-50',
        border: 'border-violet-100',
        title: 'AI-Powered Planning',
        desc: 'Our AI crafts personalised day-by-day itineraries based on your interests, budget, and travel style.',
    },
    {
        icon: <Map className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        bg: 'from-blue-50 to-cyan-50',
        border: 'border-blue-100',
        title: 'Interactive Maps',
        desc: 'Explore every stop on an interactive map with directions, distances, and local tips included.',
    },
    {
        icon: <Clock className="w-6 h-6" />,
        color: 'from-orange-500 to-rose-500',
        bg: 'from-orange-50 to-rose-50',
        border: 'border-orange-100',
        title: 'Ready in Seconds',
        desc: 'No more hours of research. Get a complete travel plan in under 30 seconds — instantly shareable.',
    },
    {
        icon: <Shield className="w-6 h-6" />,
        color: 'from-emerald-500 to-teal-500',
        bg: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-100',
        title: 'Budget Optimised',
        desc: 'Choose economy, standard, or luxury — your plan adapts to keep costs exactly where you want them.',
    },
];

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
    { icon: <Globe className="w-5 h-5" />, value: '120+', label: 'Destinations' },
    { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Happy Travelers' },
    { icon: <Star className="w-5 h-5" />, value: '4.9', label: 'Average Rating' },
    { icon: <Wallet className="w-5 h-5" />, value: '100%', label: 'Free to Use' },
];

/* ── Steps ───────────────────────────────────────────────── */
const steps = [
    { num: '01', title: 'Tell Us Your Preferences', desc: "Pick your destination, travel dates, budget, and who you're travelling with." },
    { num: '02', title: 'AI Builds Your Plan', desc: 'Our AI instantly generates a detailed, personalised itinerary just for you.' },
    { num: '03', title: 'Explore & Enjoy', desc: 'Follow your custom plan, discover hidden gems, and create unforgettable memories.' },
];

function Hero() {
    return (
        <div className="overflow-x-hidden">

            {/* ── HERO SECTION ─────────────────────────────── */}
            <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden">

                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900" />

                {/* Decorative blobs */}
                <div className="absolute top-[-10%] left-[-5%] w-[480px] h-[480px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
                <div
                    className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-purple-600/25 blur-[100px] animate-pulse"
                    style={{ animationDelay: '1.5s' }}
                />
                <div className="absolute top-[30%] right-[10%] w-[260px] h-[260px] rounded-full bg-cyan-500/10 blur-[80px]" />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center px-6 sm:px-10 max-w-5xl mx-auto">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span className="text-xs font-semibold text-white/90 tracking-wider uppercase">AI-Powered Travel Planning</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white text-center leading-[1.08] tracking-tight mb-6">
                        Discover Your Next
                        <br />
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                            Adventure with AI
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg lg:text-xl text-white/70 text-center max-w-2xl leading-relaxed mb-10">
                        Your personal trip planner and travel curator — creating custom itineraries tailored
                        to your interests, budget and travel style in seconds.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link to="/create-trip">
                            <Button className="group h-12 px-8 text-base font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 border-0 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                                Start Planning Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <span className="text-white/40 text-sm font-medium">No sign-up needed to explore</span>
                    </div>

                    {/* Social proof */}
                    <div className="mt-10 flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {['🧑', '👩', '🧔', '👱'].map((e, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white/20 flex items-center justify-center text-sm"
                                >
                                    {e}
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white/60 text-xs mt-0.5">Loved by 50,000+ travelers</p>
                        </div>
                    </div>
                </div>

                {/* Bottom fade into white */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ── STATS BAR ────────────────────────────────── */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 text-center">
                            <div className="text-blue-600 mb-1">{s.icon}</div>
                            <p className="text-2xl sm:text-3xl font-black text-slate-800">{s.value}</p>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ─────────────────────────────────── */}
            <section className="bg-gradient-to-b from-white to-slate-50 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                            Everything you need for the
                            <br className="hidden sm:block" /> perfect trip
                        </h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-base sm:text-lg">
                            Smart AI meets travel expertise to give you plans you'll actually love.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`group relative bg-gradient-to-br ${f.bg} border ${f.border} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default overflow-hidden`}
                            >
                                {/* Shine overlay on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/30 to-transparent rounded-2xl pointer-events-none" />

                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg mb-4`}>
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 text-base mb-2">{f.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────── */}
            <section className="bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/15 blur-[80px] rounded-full" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold text-cyan-300 uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                            Plan your dream trip
                            <br className="hidden sm:block" /> in 3 simple steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative text-center">
                                {/* Connector line between steps */}
                                {i < steps.length - 1 && (
                                    <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />
                                )}
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm text-2xl font-black text-cyan-300 mb-5">
                                    {step.num}
                                </div>
                                <h3 className="font-bold text-white text-base sm:text-lg mb-2">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-14 text-center">
                        <Link to="/create-trip">
                            <Button className="group h-12 px-8 text-base font-bold rounded-full bg-white text-blue-900 hover:bg-white/90 shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2">
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-white/40 text-sm mt-4">No credit card required · Instant results</p>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ───────────────────────────────────── */}
            <footer className="bg-slate-900 py-8 px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-bold text-white text-sm">AI Travel Planner</span>
                </div>
                <p className="text-slate-500 text-xs">© {new Date().getFullYear()} AI Travel Planner. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default Hero;