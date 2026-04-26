export const TravelOptions = [
    {
        id: 1,
        title: "Just Me",
        desc: "A solo traveler exploring the world",
        icon: "🧍",
        people: "1 Person"
    },
    {
        id: 2,
        title: "Couple",
        desc: "Perfect trip for two people",
        icon: "👫",
        people: "2 People"
    },
    {
        id: 3,
        title: "Family",
        desc: "Fun trip with family members",
        icon: "👨‍👩‍👧‍👦",
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friends",
        desc: "Adventure trip with friends",
        icon: "🧑‍🤝‍🧑",
        people: "5 to 10 People"
    }
];

export const BudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💸"
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰"
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Don't worry about cost",
        icon: "💎"
    }
];

export const AI_PROMPT = 'Generate Travel Plan for Location: {Location}, for {noOfDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placename, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format. Please provide all prices formatted with the correct local currency symbol for the given Location.';





