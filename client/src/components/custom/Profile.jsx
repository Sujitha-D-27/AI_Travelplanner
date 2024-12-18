import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon,MoreVerticalIcon,Ticket,Clock } from "lucide-react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const user = {
  name: localStorage.getItem("name"),
  email:localStorage.getItem("Email"), 
  avatar: "https://github.com/shadcn.png",
  role: "Traveler",
};

export default function Profile() {
  const [planHistory, setPlanHistory] = useState([]);
  const[email,setEmail]=useState(null);
  const [filter, setFilter] = useState("all");
  const [filteredPlans, setFilteredPlans] = useState([]);
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
  useEffect(() => {
    const applyFilter = () => {
      if (filter === "completed") {
        setFilteredPlans(planHistory.filter((item) => item.completed));
      }
       else {
        setFilteredPlans(planHistory);
      }
    };

    applyFilter();
  }, [filter, planHistory]);
  const handleDelete = async (placeName) => {
    try {
      const response = await axios.delete('http://localhost:5000/delete', {
        data: { 
          email: email,
          placeName: placeName
        }
      });

      if (response.status === 200) {
        setPlanHistory(planHistory.filter(item => item.placeName !== placeName)); 
        toast.success("Successfully deleted the item", placeName);
      }
    } catch (error) {
      console.error("Error while deleting item", error);
    }
  };
  

  const handleComplete = async (placeName) => {
    try {
      const response = await axios.patch("http://localhost:5000/complete", {
        email: email,
        placeName: placeName,
      });

      if (response.status === 200) {
        setPlanHistory(
          planHistory.map((item) =>
            item.placeName === placeName ? { ...item, completed: true } : item
          )
        );
        toast.success(`Marked ${placeName} as completed.`);
      }
    } catch (error) {
      console.error("Error while updating completion status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="filter" className="font-semibold mr-2">
              Filter by:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              
            </select>
          </div>
          </div>
        <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-visible transition-shadow hover:shadow-lg"
              >
                <CardHeader className=" relative bg-primary/5 pb-4">
                  <CardTitle className="mt-2">{item.placeName}</CardTitle>
                  <CardDescription>{item.placeDetails}</CardDescription>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-2 right-2">
                      <MoreVerticalIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute z-50 bg-white shadow-lg rounded-md top-8 right-0">
                      <DropdownMenuItem  onClick={() => handleComplete(item.placeName)}>
                      {item.completed ? "Completed" : "Complete"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.placeName)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  {/* <p className="text-sm leading-relaxed">
                    {item.ticketPricing} | {item.travelTime} 
                  </p>
                  <p className="text-sm leading-relaxed">
                    {item.addedAt}
                  </p> */}
                   <div className="flex flex-wrap items-center gap-4 mb-4">
                          <Badge
                            variant="secondary"
                            className="flex items-center"
                          >
                            <Ticket className="w-4 h-4 mr-1" />
                            {item.ticketPricing}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center"
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            {item.travelTime}
                          </Badge>
                        </div>
                  {item.completed && <Badge variant="success">Completed</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
