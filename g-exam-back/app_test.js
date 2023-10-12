const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
dotenv.config();

const passport = require('passport');
const passportConfig = require('./passport');

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');

sequelize.sync({force : false}).then(() => {console.log('DB CONNECTION OK')}).catch((error) => {console.error(error)});

const app = express();

passportConfig();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app, 
    watch : true, 
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false, 
    saveUninitialized : false, 
    secret : process.env.COOKIE_SECRET, 
    cookie : {
        httpOnly : true, 
        secure : false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 존재하지 않습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번포트에서 대기중');
});3