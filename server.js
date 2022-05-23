const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./helpers/jwt.js')
const unless = require('express-unless')
const users = require('./controllers/UserController.js')
const errors = require('./helpers/errorHandler.js')

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/users/login', methods: ['POST']},
        { url: '/users/register', methods: ['POST']}
    ]
}))

app.use(express.json()) // middleware for parsing application/json
app.use('/users', users) // middleware for listening to routes
app.use(errors.errorHandler); // middleware for error responses


// MongoDB connection, success and error event responses
const uri = "mongodb://localhost:27017/myFirstDatabase";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${uri}`));


app.listen(3002);