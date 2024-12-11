// const express=require('express');
// const cors=require('cors');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const mongoose=require('mongoose');
// const Plan=require('./model/Plan.model.js');
// require("dotenv").config();

// const app=express();
// app.use(cors());
// app.use(express.json());
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err.message));

   
// app.post('/gemini',async(req,res)=>{
//     const location=req.body.query;
//     const days=req.body.days;
//     const amount=req.body.budget; 
//     const people=req.body.people;
//     const prompt =  `Generate Travel Plan for Location: ${location}, for ${days} Days for ${people} with a ${amount} budget. Suggest an itinerary in JSON format with the following fields:
//     - tripName
//     - duration
//     - budget
//     - bestTimetoVisit
//     - days (each day containing day number, theme, and plan with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, travelTime)`;

//     try{
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     console.log(model);
//             if (!model) {
//                 console.error("Model initialization failed.");
//                 return res.status(500).json({ error: "Model not available." });
//             }
    
//             const result = await model.generateContent(prompt);
    
//             if (!result || !result.response) {
//                 console.error("Invalid response from model.");
//                 return res.status(500).json({ error: "Error generating" });
//             }
    
            
//             const tripData= result.response.text();
            
//              res.status(200).json(tripData);          
//     }
//     catch(e){
//         console.log("message from server",e);
//     }
// })
// // app.get("/",(req,res)=>{
// //     res.send("HI")
// //     }
// // )
// app.listen(5000,()=>{
//     console.log('server is running');
// })



const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const Plan = require('./model/Plan.model.js');
const User=require('./model/User.model.js');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI( process.env.API_KEY );
let model;

(async () => {
    try {
        
        model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Model initialized:", model);
    } catch (err) {
        console.error("Error initializing Generative Model:", err.message);
    }
})();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

// Route to handle travel plan generation
app.post('/gemini', async (req, res) => {
    const { query: location, days, budget: amount, people } = req.body;
    const prompt = `
        
Generate a travel plan for the following details:
- Location: ${location}
- Duration: ${days} Days
- Number of People: ${people}
- Budget: ${amount}

The itinerary should be provided in JSON format and include the following fields:
1. tripName
2. duration
3. budget
4. bestTimetoVisit
5. days: Each day should include :
   - dayNumber
   - theme
   - plan: A list of 4 places, where each place contains:
     - placeName
     - placeDetails
     - placeImageUrl
     - description (100 words)
     -address(detailed address for placename)
     - geoCoordinates
     - ticketPricing
     - travelTime
Ensure the response includes the JSON block properly formatted with necessary data and avoid giving "json three backticks" at starting and at ending and don't include any comments inside the json.
`;

    try {
        if (!model) {
            console.error("Model is not initialized.");
            return res.status(500).json({ error: "Model not available. Please try again later." });
        }

        const result = await model.generateContent(prompt);
      

        if (!result || !result.response) {
            console.error("Invalid response from model.");
            return res.status(500).json({ error: "Failed to generate travel plan." });
        }
       

        const tripData=result.response.text();
        console.log(tripData)
        res.status(200).json(tripData);
        const parse=JSON.parse(tripData);
        const newTrip = new Plan(parse);
        const savedTrip = await newTrip.save();
        console.log("Trip data saved:", savedTrip);
    } catch (err) {
        console.error("Error in /gemini route:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
});








// app.post('/user',async(req,res)=>{
//    const {username,email,password, isgoogleuser =false}=req.body;
//    try{
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }
//     const userdata=new User({username,email,password});
//     await userdata.save();
//     res.status(201).json({ message: 'User registered successfully' });
//    }
//    catch(e){
//     console.log("unsuccessful registration:",e);
//     res.status(500).json({ message: 'User registered unsuccessfully' });
//    }
   

// })

app.post('/user', async (req, res) => {
    const { username, email, password, isgoogleuser = false } = req.body;
console.log(username);
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
   
 
        const userdata = new User({ username, email, password, isgoogleuser });
        await userdata.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Error during user registration:", err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});



