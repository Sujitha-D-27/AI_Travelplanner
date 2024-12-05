import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Users, Plane, Check } from 'lucide-react'
import world from '/world.gif';
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">BUDGET QUEST</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-500 hover:text-gray-900">How It Works</a>
            <Link to={'/login'}>
            <Button>
              Signup/Login
            </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-800 to-blue-700 text-white">
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
                  <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold">
                    <a href="#get-started">Start Planning</a>
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

        {/* Features Section */}
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

        {/* CTA Section */}
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
                <Button size="lg" className="px-8 py-3 text-lg font-semibold bg-white text-indigo-600 hover:bg-gray-50">
                  Get Started for Free
                </Button>
              </div>
            </div>
          </div>
        </section>

        

        
      </main>

      <footer className="bg-gray-800 text-white">
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="#" className="text-base text-gray-300 hover:text-white">About Us</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Our Team</a></li>
        </ul>
      </div>

     
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Frequently Asked Questions (FAQ)</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Community Guidelines</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Report an Issue</a></li>
        </ul>
      </div>

 
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Data Protection</a></li>
        </ul>
      </div>

   
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider">Install App</h3>
        <ul className="mt-4 space-y-4">
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Download for iOS</a></li>
          <li><a href="#" className="text-base text-gray-300 hover:text-white">Download for Android</a></li>
        </ul>
      </div>
    </div>

    
    <div className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
      <p className="text-base text-gray-400">&copy; 2023 AI Travel Planner. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}