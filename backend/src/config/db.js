import mongoose, { mongo } from "mongoose";


export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully");
    }catch(error){
        console.error("Error connected to MONGODB", error);
        process.exit(1);
    }
}