import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    
    if(!username || !email || !password){
        throw new Error("Please Fill all the inputs")
    }

    const userExits = await User.findOne({email})

    if(userExits) res.status(400).send("User Already Exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username, email, password: hashedPassword})

    try {
        await newUser.save()
        createToken(res, newUser._id)
        
        // for showing the user details
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })

    } catch (error) {
        res.status(400)
        console.log(error.message)
        throw new Error("Invalid User Data", error.massage)
        
    }
});

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if(existingUser){
        const ispasswordvalid = await bcrypt.compare(password, existingUser.password)

        if(ispasswordvalid){
            createToken(res, existingUser._id)

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
            return // exit the function after sending the data

        }
    }
})

const logoutCurrentUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "successfully logout" })
});

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

export { createUser, loginUser, logoutCurrentUser, getAllUsers}