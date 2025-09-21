
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);
        return {
            "status" : 200,
            "message" : "DB connection successfull..."
        }
    } catch (error) {
        console.log("failed to connect with the database ")
        return {
            "status" : 500,
            "message" : "Failed to connect with the database !"
        }
    }
}


export default connectDB