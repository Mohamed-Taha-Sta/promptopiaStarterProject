import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptia_nextJS",
        });
        isConnected = true;
        console.log("MongoDB connection initialised")
    }
    catch (error){
        console.log("Error linking MongoDB ",error)
    }
}