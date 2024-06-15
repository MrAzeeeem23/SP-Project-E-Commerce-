import mongoose from 'mongoose'


// this is a structure of user table

const userTable = mongoose.Schema({
    username: {
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
        type: Boolean,
        require: true,
        default: false
    },
},

{ timestamp: true }

)

// this is user model
const User = mongoose.model('User', userTable)

export default User