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
      //const savedData = localStorage.getItem("TripData");
      const savedData = JSON.parse(localStorage.getItem("TripData"));
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





