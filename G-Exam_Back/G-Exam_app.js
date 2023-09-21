const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

app.get('/', (req, res) => {
  res.send('안녕, 이것은 Node.js 백엔드입니다!');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

const pool = new Pool({
  user: 'Total_manager',
  host: 'localhost',
  database: 'G-Exam', // 생성한 데이터베이스 이름
  password: '19971108',
  port: 5432, // PostgreSQL 포트 번호 (기본값)
});

app.get('/users', async (req, res) => {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('에러 발생:', error);
      res.status(500).json({ error: '데이터베이스 에러' });
    }
  });