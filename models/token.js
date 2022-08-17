const mongoose = require ('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    token: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        expires: 600
    } 
});

const User = mongoose.model("token", tokenSchema);

module.exports = User;