import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


const user = {
  name: "sujii",
  email:"suji@gmail.com", 
  avatar: "https://github.com/shadcn.png",
  role: "Traveler",
};

export default function Profile() {
  const [planHistory, setPlanHistory] = useState([]);
  const[email,setEmail]=useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    
    const storedEmail = localStorage.getItem("Email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (email) {
          const response = await axios.get(`http://localhost:5000/wishlist/${email}`);
          setPlanHistory(response.data.wishlist || []); 
          console.log("Successfully fetched data:", response.data.wishlist);
        } else {
          console.error("Email is not available in localStorage.");
        }
      } catch (error) {
        console.error("Error while getting profile page data:", error);
      }
    };

    fetchWishlist();
  }, [email]);
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-foreground h-32" />
        <CardHeader className="relative pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-background absolute -top-12 sm:relative sm:top-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left mt-12 sm:mt-0">
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-md">{user.email}</CardDescription>
              <Badge variant="outline" className="mt-2">
                {user.role}
              </Badge>
              <Button onClick={logout} className="px-11 ml-96">
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ClockIcon className="mr-2 h-6 w-6 text-primary" />
          AI Planner History
        </h2>
        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planHistory.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="mt-2">{item.placeName}</CardTitle>
                  <CardDescription>{item.placeDetails}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <p className="text-sm leading-relaxed">
                    {item.ticketPricing} | {item.travelTime}
                  </p>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
