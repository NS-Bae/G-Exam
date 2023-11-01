const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 4000;

const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/', routes);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})