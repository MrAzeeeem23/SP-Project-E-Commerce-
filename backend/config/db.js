import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

const connetDB = async () => {
    try {
        // online mongoDB atles

        await mongoose.connect(process.env.MONGO_URI)

        // offline mongoDB 
        // await mongoose.connect(process.env.MONGO_URI_LOCAL)
        
        console.log("Successfully connected to the mogo 🎉")
    } catch (error) {
        console.log(error.message)
    }
}

export default connetDB;