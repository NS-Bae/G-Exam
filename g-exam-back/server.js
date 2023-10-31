const express = require('express')
const session = require('express-session')
const path = require('path');
const app = express()
const port = 4000

const db = require('./db/db');
const sessionOption = require('./db/sessionOption');
const routes = require('./routes');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})