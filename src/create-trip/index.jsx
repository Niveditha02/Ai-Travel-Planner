
// Geoapify Geocoder Autocomplete
import React, { useState, useEffect } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Input } from '@/components/ui/input';
import { BudgetOptions, TravelOptions } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState({});

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

    const GenerateTrip = () => {
        if (formData?.noOfDays > 5 && !formData?.Location || !formData?.budget || !formData?.traveler) {
            toast("Please fill all the fields")
            return;
        }
        console.log(formData);
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
                            type="city" // This limits results to cities only
                            placeSelect={(value) => {
                                setPlace(value);
                                console.log("Selected Place:", value);
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
            <div className='my-20 flex justify-end'>
                <Button onClick={GenerateTrip} >Generate Trip</Button>
            </div>
        </div>
    )
}

export default CreateTrip



