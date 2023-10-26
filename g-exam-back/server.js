const express = require('express')
const session = require('express-session')
const path = require('path');
const app = express()
const port = 4000

const db = require('./db/db');
const sessionOption = require('./db/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    console.log(`Request received for ${req.url}`);
    db.query('SELECT * FROM user_student', function (error, results, fields) {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      } else {
        console.log('All User Student Data:', results);
        res.json(results);
      }
    });
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})