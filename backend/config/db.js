import mongoose from 'mongoose'

const connetDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/test")
        console.log("Successfully connected to the mogo")
    } catch (error) {
        console.log(error.message)
    }
}

export default connetDB;