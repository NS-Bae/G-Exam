const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
app.use(express.static(path.join(__dirname, '../g-exam-front/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../g-exam-front/build/index.html'));
});

const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam'
});

connection.connect();

connection.query('SELECT * from user_student where (grade = 1)', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
  });
  
  connection.end();