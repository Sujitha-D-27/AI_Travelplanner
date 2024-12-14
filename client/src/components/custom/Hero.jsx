import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Users, Plane, Check } from 'lucide-react'
import world from '/world.gif';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Hero() {
  const [login,setLogin]=useState(false);
  useEffect(()=>{
    const email=localStorage.getItem("Email");
    setLogin(!email);
  },[])
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">BUDGET QUEST</span>
          </div>
          <div className="flex items-center space-x-4">
          <a href="#home" className="text-gray-500 hover:text-gray-900">Home</a>
            <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-500 hover:text-gray-900">How It Works</a>
            {login?
            (<Link to={'/login'}>
            <Button>
              Signup/Login
            </Button>
            </Link>)
            :
           ( <Link to={'/profile'}>
              <Button>Profile</Button>
            </Link>)
}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
     
        <section id="home" className="bg-gradient-to-r from-purple-800 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Your AI-Powered Travel Companion
                </h1>
                <p className="mt-6 text-xl">
                  Plan your perfect trip in minutes. Tailored itineraries for any destination, budget, and travel style.
                </p>
                <div className="mt-10">
                  <Button>
                    Here is your demo
                  </Button>
                </div>
              </div>
              <div className="mt-12 lg:mt-0">
                <img
                  src={world}
                  alt="AI Travel Planner Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

      
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Plan Smarter, Travel Better
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
              Our AI-powered platform revolutionizes the way you plan your trips.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: MapPin, title: 'Smart Recommendations', description: 'Get personalized suggestions based on your preferences.' },
                { icon: Calendar, title: 'Time-Saving', description: 'Create full itineraries in minutes, not hours.' },
                { icon: DollarSign, title: 'Budget-Friendly', description: 'Find the best experiences within your price range.' },
                { icon: Users, title: 'Group-Oriented', description: 'Plan for solo trips, couples, families, or friend groups.' },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <feature.icon className="h-10 w-10 text-indigo-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-6 md:px-6 lg:ml-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 lg:grid-cols-5">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">1</div>
                <h3 className="text-xl font-bold">Choose Destination</h3>
                <p className="text-gray-500 dark:text-gray-400">Enter your dream destination</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">2</div>
                <h3 className="text-xl font-bold">Set Duration</h3>
                <p className="text-gray-500 dark:text-gray-400">Specify the number of days for your trip</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">3</div>
                <h3 className="text-xl font-bold">Define Budget</h3>
                <p className="text-gray-500 dark:text-gray-400">Input your travel budget</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">4</div>
                <h3 className="text-xl font-bold">Select Traveler Type</h3>
                <p className="text-gray-500 dark:text-gray-400">Choose from solo, couple, family, or friends</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">5</div>
                <h3 className="text-xl font-bold">Get Your Plan</h3>
                <p className="text-gray-500 dark:text-gray-400">Receive a personalized itinerary instantly</p>
              </div>
            </div>
          </div>
        </section>

      
        <section id="get-started" className="bg-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to plan your next adventure?
            </h2>
            <p className="mt-4 text-xl">
              Start your AI-powered travel planning experience today.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link to = {'/create-trip'}>
                <Button size="lg" className="px-8 py-3 text-lg font-semibold bg-white text-indigo-600 hover:bg-gray-50">
                  Get Started for Free
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        

        
      </main>

      <footer className="bg-gray-800 text-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
    
      
       <div className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
      <p className="text-base text-gray-400">&copy; 2023 AI Travel Planner. All rights reserved.</p>
      
    </div>
  </div>
</footer>

    </div>
  )
}