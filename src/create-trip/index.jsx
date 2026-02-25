import React from 'react'

function CreateTrip() {
    return (
        <div className="sm-px md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            {/* To create a trip we need to enter some details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                    <h2 className='text-3xl font-bold'>Tell us your travel preferences</h2>
                    <p className='text-gray-500'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip