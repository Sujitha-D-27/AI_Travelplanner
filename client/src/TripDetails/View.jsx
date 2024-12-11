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
import { CalendarDays, DollarSign, Clock, Ticket, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button } from "@/components/ui/button";

const UNSPLASH_API_KEY = "y9a0zjGlZAxJbelRiKSSyTZT92tmT97NBoVaUjOOrRk";

function View() {
  const [tripData, setTripData] = useState("");
  const [placeImages, setPlaceImages] = useState({});

  const fetchImage = async (placeName) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${placeName}&per_page=1&client_id=${UNSPLASH_API_KEY}`
      );
      const imageUrl = response.data.results[0]?.urls?.regular || "https://via.placeholder.com/600x400?text=No+Image+Found";
      setPlaceImages((prev) => ({ ...prev, [placeName]: imageUrl }));
    } catch (error) {
      console.error(`Error fetching image for ${placeName}:`, error);
    }
  };

  const parseCoordinates = (geoString) => {
    const match = geoString.match(/([-+]?[0-9]*\.?[0-9]+)°?\s*([NS]),\s*([-+]?[0-9]*\.?[0-9]+)°?\s*([EW])/);
    if (!match) return null;

    const lat = parseFloat(match[1]) * (match[2] === "S" ? -1 : 1);
    const lng = parseFloat(match[3]) * (match[4] === "W" ? -1 : 1);
    return { lat, lng };
  };

  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem("TripData"));
      setTripData(savedData);

      if (savedData && savedData.days) {
        savedData.days.forEach((day) => {
          day.plan.forEach((place) => {
            if (place.placeName) {
              fetchImage(place.placeName);
            }
          });
        });
      }
    } catch (error) {
      console.error("Error parsing trip data:", error);
      setTripData(null);
    }
  }, []);

  if (!tripData || !tripData.days) {
    return <h2>No Trip Data Found</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">{tripData.tripName}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex flex-wrap justify-between items-center">
         <div className="flex items-center mb-4 md:mb-0">
          <CalendarDays className="w-6 h-6 text-blue-600 mr-2" />
          <p className="text-lg"><strong>Duration:</strong> {tripData.duration}</p>
        </div>
       <div className="flex items-center mb-4 md:mb-0">
         <DollarSign className="w-6 h-6 text-green-600 mr-2" />
           <p className="text-lg"><strong>Budget:</strong> {tripData.budget}</p>         </div>
         <div className="flex items-center">
          <Clock className="w-6 h-6 text-orange-600 mr-2" />
          <p className="text-lg"><strong>Best Time:</strong> {tripData.bestTimetoVisit}</p>
         </div>
      </div>
      </div>
      {tripData.days.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">
            Day {day.dayNumber}: {day.theme}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {day.plan.map((place, placeIndex) => {
              const coordinates = parseCoordinates(place.geoCoordinates);
              return (
                <Dialog key={placeIndex}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                      <div className="relative h-64">
                        <img
                          src={placeImages[place.placeName] || "https://via.placeholder.com/600x400?text=Loading..."}
                          alt={place.placeName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                          {place.placeName}
                        </h3>
                      </div>
                      <CardContent className="p-6">
                        <p className="mb-4 text-gray-600">{place.placeDetails}</p>
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary" className="flex items-center">
                    <Ticket className="w-4 h-4 mr-1" />
                     {place.ticketPricing}
                   </Badge>
                  <Badge variant="outline" className="flex items-center">
                     <Clock className="w-4 h-4 mr-1" />
                     {place.travelTime}
                   </Badge>
                 </div>
                 <Button className="w-full">
                   Explore More
                   <a className="w-4 h-4 ml-2" href="#" ></a>
                 </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>{place.placeName}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-4">
                      {coordinates && (
                        <MapContainer
                          center={coordinates}
                          zoom={13}
                          className="w-full h-64 rounded-lg"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            // attribution="© OpenStreetMap contributors"
                          />
                          <Marker position={coordinates}></Marker>
                        </MapContainer>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <p className="text-gray-700 mb-4">{place.description}</p>
                        {/* <p>
                          <strong>Ticket Pricing:</strong> {place.ticketPricing}
                        </p> */}
                        <Badge variant="secondary" className="flex items-center">
                    <Ticket className="w-4 h-4 mr-1" />
                     {place.ticketPricing}
                   </Badge>
                   <Badge variant="outline" className="flex items-center">
                     <Clock className="w-4 h-4 mr-1" />
                     {place.travelTime}
                   </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default View;


