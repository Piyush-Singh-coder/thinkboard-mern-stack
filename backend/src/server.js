import express from "express"; // const express = require("express");
import notesRouter from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
console.log(__dirname)

//middleware - The work done before sending response back. 

if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173",
}));
}

app.use(express.json());  // To paras the req.body 
app.use(rateLimiter);



app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production"){
    
    if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get(/.*/  , (req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
})
}
}




connectDB().then(() =>{ 
    app.listen(PORT, ()=>{
    console.log("app is listening to PORT:",PORT);
})
})
