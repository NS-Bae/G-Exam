const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const randomstring = require('randomstring');

const app = express();
const port = 4000;

const routes = require('./routes');
const db = require('./db/db');

const secret = randomstring.generate();

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secret: secret, // 세션 시크릿 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // HTTPS를 사용하지 않을 경우 false
}));

app.use(cors());
app.use(morgan('dev'));

app.use('/', routes);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM user_student WHERE id = ?', [id], function (err, results) {
        if (err || results.length === 0) {
        return done(err, null);
        }
        return done(null, results[0]);
    });
});

passport.use(new LocalStrategy({
    usernameField:'id', 
    passwordField:'pw',
  },async function(id, pw, done)
  {
    var sql='select id, pw from user_student where id like?;';
    var params=[id]; 
    db.query(sql, params, function(err, rows)
    {
      if(err) return done(err);
      if(rows.length === 0)
      {
        console.log("등록되지 않은 사용자입니다.");
        return done(null, false, { message: "등록되지 않은 사용자입니다." });
      }
      if(rows[0].pw!==pw) 
      { 
        console.log('비밀번호가 일치하지 않습니다.');
        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }
      if(rows[0].pw===pw)
      {
        console.log('모든정보가 일치합니다.');
        var user= rows[0];
        return done(null, user); 
      }
    })
}));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})