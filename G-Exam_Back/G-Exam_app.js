const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('안녕, 이것은 Node.js 백엔드입니다!');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});