import mongoose from "mongoose";

const connectDB= async()=>{
    try{

        await mongoose.connect(process.env.MONGODB);
        console.log("database Connected")
    }
    catch(error){
        console.log("database connection failed");
        process.exit();
    }
    
}

export default connectDB;