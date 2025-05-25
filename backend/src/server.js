import express from "express"; // const express = require("express");
import notesRouter from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5001;

//middleware - The work done before sending response back. 
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());  // To paras the req.body 
app.use(rateLimiter);



app.use("/api/notes", notesRouter);

connectDB().then(() =>{
    app.listen(PORT, ()=>{
    console.log("app is listening to PORT:",PORT);
})
})
