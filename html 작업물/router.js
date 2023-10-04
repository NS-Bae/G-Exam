const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {title : '로그인'});
});

router.post('/login', (req, res) => {
    const {ID, PW} = req.body;

    if(ID === 'user' && PW === 'password') {
        // 로그인 성공
        console.log("성공");
        res.redirect('/dashboard'); // 로그인 후 리다이렉트
      } else {
        // 로그인 실패
        console.log("실패");
        res.render('login', { title: '로그인', error: '로그인 실패' });
      }
});

module.exports = router;