import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


async function connectDB(){
    try{
        const isConnected = await mongoose.connect(process.env.MONGO_URI);
        if(isConnected) console.log("Database connected Succesfully");  
    }
    catch(err){
        console.log("Database connection failed !"+err);
    }
}

export default connectDB;