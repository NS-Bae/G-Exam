const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user')

module.exports = () => {
    passport.use(new localStrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async (email, password, done) => {
        try {
            const logUser = await User.findOne({where : {email}})
            if (logUser) {
                const result = await bcrypt.compare(password, logUser.password)
                if (result) {
                    done(null, logUser);
                } else {
                    done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
                }
            } else {
                done(null, false, { message : '가입되지 않은 회원입니다.' })
            }
        } catch (error) {
            console.error(error);
            done(error)
        }
    }))
}