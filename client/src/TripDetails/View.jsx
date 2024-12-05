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


import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";  

function View() {
  const tripData = useSelector((state) => state.travelPlan.plan);
  console.log(tripData);

 

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>{tripData.tripName}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription><strong>Duration:</strong> {tripData.duration}</CardDescription>
          <CardDescription><strong>Budget:</strong> {tripData.budget}</CardDescription>
          <CardDescription><strong>Best Time to Visit:</strong> {tripData.bestTimetoVisit}</CardDescription>
        </CardContent>
      </Card>

      {tripData.days?.length > 0 ? (
        tripData.days.map((day, index) => (
          <Card key={index} className="space-y-4">
            <CardHeader>
              <CardTitle>Day {day.dayNumber}: {day.theme}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {day.plan?.map((place, idx) => (
                  <li key={idx} className="space-y-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>{place.placeName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{place.placeDetails}</CardDescription>
                        <img
                          src={place.placeImageUrl}
                          alt={place.placeName}
                          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                        <CardDescription><strong>Ticket Pricing:</strong> {place.ticketPricing}</CardDescription>
                        <CardDescription><strong>Travel Time:</strong> {place.travelTime}</CardDescription>
                        <CardDescription><strong>Coordinates:</strong> {place.geoCoordinates.join(', ')}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        {/* You can add footer content here, like buttons or links */}
                      </CardFooter>
                    </Card>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No trip data available</div> // Fallback message if no data is found
      )}
    </div>
  );
}

export default View;



