const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 정적 파일 제공 (HTML 파일을 포함한 다른 정적 파일을 서빙)
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에 접근할 때 index.html 파일을 표시
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Main_page.html'));
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});