const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/join', isNotLoggedIn, async(req, res, next) => {
    try
    {
        const {email, nick, password} = req.body;
        exUser = await User.findOne({where : {email}});
        if(exUser)
        {
            return res.redirect('/join?error=exists');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email, 
            nick, 
            password : hash
        })
        return res.redirect('/');
    }
    catch(error)
    {
        console.error(error);
        next(error);
    }
})

Router.post('/login', isNotLoggedIn, (req, res, next) => {
    const {email, password} = req.body;

    passport.authenticate('local', (authError, user, info) => {
        if(authError)
        {
            console.error(authError);
            return next(authError);
        }
        if(!user)
        {
            return res.redirect(`/?loginError=${info.message}`);
        }

        return req.login(user, (loginError) => {
            if(loginError)
            {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })
    (req, res, next);
})

Router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destory();
    res.redirect('/');
})

module.exports = router;