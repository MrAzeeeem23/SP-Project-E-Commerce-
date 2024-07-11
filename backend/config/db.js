import mongoose from 'mongoose'

const connetDB = async () => {
    try {
        // online mongoDB atles

        await mongoose.connect("mongodb+srv://azeemkh528:AzeemKH12@cluster0.lsj6hnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        // await mongoose.connect("mongodb+srv://azeemkhanbeing:AzeemKH12@cluster0.bye8fsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        // offline mongoDB 
        // await mongoose.connect("mongodb://127.0.0.1:27017/AzeemDB")
        console.log("Successfully connected to the mogo")
    } catch (error) {
        console.log(error.message)
    }
}

export default connetDB;