const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    secret : 'your-secret-key', 
    resave : false, 
    saveUninitialized : true,
}));

app.set('views', path.join(__dirname, 'views')); // 뷰 파일 경로 설정
app.set('view engine', 'html'); // 뷰 파일 확장자 설정

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main_page.html'));
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
//쿠키-로그인정보 저장

app.get('/login', (req, res) => {
    res.render('Log-in_page.html');
});

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.post('/login', (req, res) => {
    const { ID, PW } = req.body;
  
    // 실제 사용자 인증 로직을 여기에 구현
  
    if (ID === 'user' && PW === 'password') {
      // 로그인 성공
      req.session.user = { ID }; // 세션에 사용자 정보 저장
      res.redirect('/dashboard');
    } else {
      // 로그인 실패
      res.render('login', { error: '로그인 실패' });
    }
});
app.get('/dashboard', (req, res) => {
const user = req.session.user; // 세션에서 사용자 정보 가져오기

if (user) {
    // 로그인한 사용자의 대시보드 페이지 렌더링
    res.render('dashboard', { user });
} else {
    // 로그인되지 않은 사용자의 처리 (예: 로그인 페이지로 리다이렉션)
    res.redirect('/login');
}
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
      });
  });