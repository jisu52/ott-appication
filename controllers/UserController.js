const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices.js')

router.post('/register', (req, res, next) => {
    const {password} = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body).then(
        () => res.send('success')
    ).catch(
        err => next(err)
    )
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    userServices.login({ username, password })
        .then(user => {
            res.json(user)
        }
    ).catch(err => next(err))
})

router.put('/editChoice/:user', function(req, res, next){
    const { choices } = req.body;
    userServices.updateUserChoice(req.params.user, choices )
        .then(user => {
            res.json(user)
        }
    ).catch(err => next(err))
});

router.put('/editLanguage/:user', function(req, res, next){
    const { language } = req.body;
    userServices.updateUserLanguage(req.params.user, language)
        .then(user => {
            res.json(user)
        }
    ).catch(err => next(err))
});

router.put('/editProfilePicture/:user', function(req, res, next){
    const { url } = req.body;
    userServices.updateUserProfilePicture(req.params.user, url)
        .then(user => {
            res.json(user)
        }
    ).catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;