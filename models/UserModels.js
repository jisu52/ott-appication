const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    middle_name:{
        type: String,
    },
    birthdate:{
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    choices: {
        type: [String],
    },
    created_date:{
        type: Date,
        required: true,
    },
    updated_date: {
        type: Date,
        required: true,
    },
    profile_picture:{
        type: String,
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User =  mongoose.model("user", UserSchema);

module.exports = User;