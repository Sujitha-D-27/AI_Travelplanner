// import React from 'react';
// import { useSelector } from 'react-redux';

// function View() {
//   const tripData = useSelector((state) => state.travelPlan.plan);
//   console.log(tripData);
//   // Check if tripData is available and structured correctly
//   if (!tripData || !tripData.days) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{tripData.tripName}</h1>
//       <p>Duration: {tripData.duration}</p>
//       <p>Budget: {tripData.budget}</p>
//       <p>Best Time to Visit: {tripData.bestTimetoVisit}</p>

//       {tripData.days.map((day, index) => (
//         <div key={index}>
//           <h2>Day {day.dayNumber}: {day.theme}</h2>
//           <ul>
//             {day.plan.map((place, idx) => (
//               <li key={idx}>
//                 <h3>{place.placeName}</h3>
//                 <p>{place.placeDetails}</p>
//                 <img src={place.placeImageUrl} alt={place.placeName} style={{ width: '100%', height: 'auto' }} />
//                 <p>Ticket Pricing: {place.ticketPricing}</p>
//                 <p>Travel Time: {place.travelTime}</p>
//                 <p>Coordinates: {place.geoCoordinates.join(', ')}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default View;
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function View() {
  const [tripData, setTripData] = useState('');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("TripData");
      console.log(savedData);
      setTripData(savedData);
      
    } catch (error) {
      console.error("Error parsing trip data:", error);
      setTripData(null);
    }
  }, []);

  if (!tripData || !tripData.days) {
    return <h2>No Trip Data Found</h2>;
  }


  // const tripData={
  //   "tripName": "Luxury Chennai Escape",
  //   "duration": "2 Days",
  //   "budget": "Luxury",
  //   "bestTimetoVisit": "October to March (pleasant weather)",
  //   "days": [
  //     {
  //       "dayNumber": 1,
  //       "theme": "Historical Charm & Coastal Delight",
  //       "plan": [
  //         {
  //           "placeName": "Fort St. George",
  //           "placeDetails": "Explore the historical heart of Chennai, a significant landmark and the first British fort in India.",
  //           "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Fort_St._George.jpg/1280px-Fort_St._George.jpg",
  //           "geoCoordinates": "[13.0827° N, 80.2707° E]",
  //           "ticketPricing": "Free entry",
  //           "travelTime": "30 mins from your hotel (depending on location)"
  //         },
  //         {
  //           "placeName": "Government Museum",
  //           "placeDetails": "Discover a vast collection of Bronze sculptures, art, and artifacts representing South Indian history and culture.",
  //           "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Government_Museum%2C_Chennai.jpg/1280px-Government_Museum%2C_Chennai.jpg",
  //           "geoCoordinates": "[13.0574° N, 80.2713° E]",
  //           "ticketPricing": "Nominal entry fee",
  //           "travelTime": "15 mins from Fort St. George"
  //         },
  //         {
  //           "placeName": "Lunch at The Raintree",
  //           "placeDetails": "Enjoy a luxurious multi-cuisine lunch at this upscale restaurant.",
  //           "placeImageUrl": "https://www.raintreehotels.com/wp-content/uploads/2022/10/raintree-chennai-restaurant.jpg",
  //           "geoCoordinates": "[13.0577° N, 80.2076° E]",
  //           "ticketPricing": "Variable, based on order",
  //           "travelTime": "30 mins from Government Museum"
  //         },
  //         {
  //           "placeName": "Marina Beach",
  //           "placeDetails": "Relax and enjoy the sunset at the longest urban beach in India.",  
  //           "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Marina_Beach_Chennai.jpg/1280px-Marina_Beach_Chennai.jpg",
  //           "geoCoordinates": "[13.0542° N, 80.2727° E]",
  //           "ticketPricing": "Free",
  //           "travelTime": "15 mins from The Raintree"
  //         },
  //         {
  //           "placeName": "Dinner at a fine-dining restaurant (e.g., Peshawri)",
  //           "placeDetails": "Indulge in a delicious dinner at a high-end restaurant known for its exquisite cuisine and ambiance.",
  //           "placeImageUrl": "https://exp.cdn-hotels.com/hotels/15000000/1400000/1390000/1389400/1389378/1389378_11_b.jpg?impolicy=fcrop&w=500&h=333&q=medium",
  //           "geoCoordinates": "[13.0511° N, 80.2655° E]",
  //           "ticketPricing": "Variable, based on order",
  //           "travelTime": "Depending on restaurant choice"
  //         }
  //       ]
  //     },
  //     {
  //       "dayNumber": 2,
  //       "theme": "Spiritual Exploration & Shopping Spree",
  //       "plan": [
  //         {
  //           "placeName": "Kapaleeshwarar Temple",
  //           "placeDetails": "Visit this ancient and beautiful temple dedicated to Lord Shiva.", 
  //           "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Kapaleeshwarar_Temple%2C_Chennai.jpg/1280px-Kapaleeshwarar_Temple%2C_Chennai.jpg",
  //           "geoCoordinates": "[13.0413° N, 80.2406° E]",
  //           "ticketPricing": "Free entry",
  //           "travelTime": "30 mins from your hotel (depending on location)"
  //         },
  //         {
  //           "placeName": "Shopping at Khadi Gramodyog Bhavan",
  //           "placeDetails": "Explore authentic Indian handicrafts and textiles.",
  //           "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Khadi_Gramodyog_Bhavan.jpg/1024px-Khadi_Gramodyog_Bhavan.jpg",
  //           "geoCoordinates": "[13.0571° N, 80.2707° E]",
  //           "ticketPricing": "Variable, based on purchases",
  //           "travelTime": "15 mins from Kapaleeshwarar Temple"
  //         },
  //         {
  //           "placeName": "Lunch at a Luxury Hotel Restaurant",
  //           "placeDetails": "Enjoy a fine dining experience at one of Chennai's upscale hotels.",
  //           "placeImageUrl": "https://example.com/hotel_restaurant_image.jpg",  //replace with actual image URL
  //           "geoCoordinates": "Depends on hotel choice",
  //           "ticketPricing": "Variable, based on order",
  //           "travelTime": "Depending on restaurant choice"
  //         },
  //         {
  //           "placeName": "Shopping at Nungambakkam High Street",
  //           "placeDetails": "Explore high-end boutiques and designer stores.",
  //           "placeImageUrl": "https://example.com/nungambakkam_street_image.jpg", //replace with actual image URL
  //           "geoCoordinates": "[13.0517° N, 80.2624° E]",
  //           "ticketPricing": "Variable, based on purchases",
  //           "travelTime": "30 mins from Khadi Gramodyog Bhavan"
  //         },
  //         {
  //           "placeName": "Farewell Dinner at a rooftop restaurant",
  //           "placeDetails": "Enjoy a romantic farewell dinner with stunning city views.",       
  //           "placeImageUrl": "https://example.com/rooftop_restaurant_image.jpg", //replace with actual image URL
  //           "geoCoordinates": "Depends on restaurant choice",
  //           "ticketPricing": "Variable, based on order",
  //           "travelTime": "Depending on restaurant choice"
  //         }
  //       ]
  //     }
  //   ]
  // }


  return (
    <div>
      <h1>{tripData?.tripName || "Trip Name Unavailable"}</h1>
      <h3>
        {tripData?.duration || "Unknown Duration"} - {tripData?.budget || "Unknown Budget"}
      </h3>
      <p>Best Time to Visit: {tripData.bestTimetoVisit || "N/A"}</p>
      {tripData.days.map((day, index) => (
        <div key={index}>
          <h2>Day {day.dayNumber}: {day?.theme || "No Theme"}</h2>
          {day.plan.map((place, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{place?.placeName || "Unnamed Place"}</CardTitle>
              </CardHeader>
              <CardContent>
                {place.placeImageUrl ? (
                  <img src={place.placeImageUrl} alt={place.placeName || "Image"} />
                ) : (
                  <p>No Image Available</p>
                )}
                <p>{place.placeDetails || "No details available"}</p>
                {/* <p><strong>GeoCoordinates:</strong> {place.geoCoordinates?.join(", ") || "Unknown"}</p> */}
                <p><strong>Ticket Pricing:</strong> {place?.ticketPricing || "Free"}</p>
                <p><strong>Travel Time:</strong> {place?.travelTime || "Unknown"}</p>
              </CardContent>
              <CardFooter>
                <button onClick={() => alert("Booking functionality pending.")}>Book Now</button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}


export default View;





