
// Geoapify Geocoder Autocomplete
import React, { useState, useEffect } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Input } from '@/components/ui/input';
import { BudgetOptions, TravelOptions, AI_PROMPT } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';


import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/service/AIModal';


function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);





    const handleInputChange = (name, value) => {
        if (name === "noOfDays" && value > 5) {
            console.log("Please enter trip days less than 5");
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (tokenInfo) => getUserProfile(tokenInfo),
        onError: (error) => console.log(error),
    });

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp.data);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            GenerateTrip();
        })
    }

    const GenerateTrip = async () => {

        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDialog(true);
            return;
        }
        if (!formData?.Location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast("Please fill all the fields")
            return;
        }

        setLoading(true);
        try {
            // We pass the formData object directly to our new backend service
            const result = await chatSession.sendMessage(formData);
            console.log("--- AI GENERATED TRIP PLAN ---");
            console.log(result.response.text());
            console.log("-------------------------------");
            toast("Trip generated successfully! Check your console.");
        } catch (error) {
            console.error("Generation Error:", error);
            toast("Something went wrong while generating the trip.");
        } finally {
            setLoading(false);
        }
    }





    return (
        <div className="px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72">
            <div>
                <h2 className='text-3xl font-bold'>Tell us your travel preferences 🏕️🌴</h2>
                <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information,
                    and our trip planner will generate a customized itinerary based on your preferences</p>
            </div>

            <div className='mt-10 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice? 🏖️</h2>

                    {/* Geoapify Geocoder Autocomplete */}
                    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
                        <GeoapifyGeocoderAutocomplete
                            placeholder="Search for a city (Ex. Las Vegas)"
                            type="city"
                            placeSelect={(value) => {
                                handleInputChange('Location', value?.properties?.formatted);
                                console.log("Selected Location:", value?.properties?.formatted);
                            }}
                        />
                    </GeoapifyContext>
                </div>
            </div>

            {/* Number of days */}
            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip? 🗓️</h2>
                <Input type="number" placeholder="Number of days" min="1" max="5"
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
            </div>

            {/* Budget */}
            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>What is your budget? 💳</h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5'>
                    {BudgetOptions.map((item, index) => (
                        <div key={index} onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all 
                            hover:shadow-lg hover:border-black/30 hover:-translate-y-1 bg-card 
                            dark:hover:border-white/30 text-center ${formData.budget == item.title ?
                                    'shadow-lg border-black/30' : ''}`}>
                            <span className='text-2xl mb-1 inline-block'>{item.icon}</span>
                            <h3 className='font-bold text-sm text-card-foreground'>{item.title}</h3>
                            <p className='text-xs text-muted-foreground mt-1'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Traveler */}
            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on
                    your next adventure? 🥂</h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5'>
                    {TravelOptions.map((item, index) => (
                        <div key={index} onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all 
                            hover:shadow-lg hover:border-black/30 hover:-translate-y-1 
                            bg-card dark:hover:border-white/30 text-center 
                            ${formData.traveler == item.people ? 'shadow-lg border-black/30' : ''}`}>
                            <span className='text-2xl mb-1 inline-block'>{item.icon}</span>
                            <h3 className='font-bold text-sm text-card-foreground'>{item.title}</h3>
                            <p className='text-xs text-muted-foreground mt-1'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Generate Trip */}
            <div className='my-10 flex justify-end'>
                <Button 
                    disabled={loading}
                    onClick={GenerateTrip} 
                >
                    {loading ? "Generating..." : "Generate Trip"}
                </Button>
            </div>





            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent >
                    <DialogHeader className="flex flex-col items-center">
                        <img src="/logoipsum-295.svg" width={50} height={50} />
                        <h2 className='font-bold text-2xl mt-7 text-slate-900 tracking-tight'>
                            Sign In With Google
                        </h2>
                        <DialogDescription className="text-center pt-2">
                            <span className='text-slate-500 font-medium text-base block'>
                                Sign in to the App with Google authentication securely
                            </span>
                            <p className="text-xs text-slate-400 text-center mt-4 px-4 italic leading-relaxed">
                                By signing in, you agree to our Terms of Service and Privacy Policy. All your data is handled securely.
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={login}
                        className="w-full mt-6 h-11 flex items-center justify-center gap-3 transition-all hover:bg-slate-50"
                        variant="outline"
                    >
                        <FcGoogle className='h-7 w-7' />
                        Sign in with Google
                    </Button>
                </DialogContent>
            </Dialog>

        </div>

    )
}

export default CreateTrip



