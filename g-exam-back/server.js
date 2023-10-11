const express = require('express');
const mysql = require('mysql');
const mysql2 = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

const pool = mysql2.createPool({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam', 
});

app.use(express.static(path.join(__dirname, '../g-exam-front/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../g-exam-front/build/index.html'));
});

app.post('/login', async(req, res) => {
  const {username, password} = req.body;

  try
  {
    const connection = await pool.getConnection();
    const [results] = await connection.execute('SELECT * FROM user_student where username = ? AND password = ?', [username, password]);
    connection.release();

    if(results.length > 0)
    {
      res.status(200).json({ message: '로그인 성공' });
    }
    else
    {
      res.status(401).json({ message: '로그인 실패' });
    }
  }
  catch(error) 
  {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
});

app.listen(port, () => {
  console.log('서버가 ${port}포트에서 실행 중입니다');
});

/* app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
}); */

/* const connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'My19971108!', 
    database : 'g-exam'
});

connection.connect();

connection.query('SELECT school_name from school_list where (school_grade = "초등")', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
  });
  
  connection.end(); */