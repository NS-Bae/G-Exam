const express = require('express');
const router = express.Router(); // 라우터 객체 생성
const db = require('./db/db');



router.get('/myinformation', (req, res) => {
  console.log(`Request received for ${req.url}`);
  db.query('SELECT * FROM user_student', function (error, results, fields) {
    if (error) 
    {
      console.error(error);
      res.status(500).send('Error retrieving data');
    } 
    else 
    {
      res.json(results);
    }
  });
});

module.exports = router;