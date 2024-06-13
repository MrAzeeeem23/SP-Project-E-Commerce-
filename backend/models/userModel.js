import mongoose from 'mongoose'


// this is a structure of user table

const userTable = mongoose.Schema({
    usename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        require: true,
        default: false
    },
},

{ timestamp: true }

)

// this is user model
const User = mongoose.model('User', userTable)

export default User