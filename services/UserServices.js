const User = require('../models/UserModels')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')



async function login({ username, password }) {
    try{
        const user = await User.findOne({username});
        if(!user){
            throw new Error('User Not Found')
        }
        // synchronously compare user entered password with hashed password
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(username);

            // call toJSON method applied during model instantiation
            return {...user.toJSON(), token}
        }
    } catch(err) {
        throw new Error(err);
    }
}

async function register(params) {
    params.created_date = new Date();
    params.updated_date = new Date();
    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
}


async function getUserProfile({username, email}) {
    try {
        const user = await User.find({username});
        return user.toJSON();
    } catch (err) {
        throw new Error('Error: ' + err);
    }
} 

async function updateUserChoice(username, newChoice) {
    try{
        await User.findOneAndUpdate({username}, {$set: {
            choices: newChoice,
            updated_date: new Date()
        }});
    } catch(err){
        throw new Error(err);
    }
}

async function updateUserLanguage(username, newLanguage) {
    try {
        await User.findOneAndUpdate({username}, {$set: {
            language: newLanguage,
            updated_date: new Date()
        }});
    } catch(err) {
        throw new Error(err);
    }
}

async function updateUserProfilePicture(username, url) {
    try {
        await User.findOneAndUpdate({username}, {$set: {
            profile_picture: url,
            updated_date: new Date()
        }});
    } catch(err) {
        throw new Error(err);
    }
}

async function getById(id) {

    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getUserProfile,
    updateUserChoice,
    updateUserLanguage,
    updateUserProfilePicture,
    getById
};