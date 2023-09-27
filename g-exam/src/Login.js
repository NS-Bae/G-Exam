import './App.css';
import React from 'react';

function MyApp() {
    return (
    <div className = "background">
      <div className = "wrap">
        <h1>Login</h1>
        <form method="post" action="/login">
            <div class="login_id">
                <h4>ID</h4>
                <input type="text" name="ID" id="ID" placeholder="ID"></input>
            </div>
            <div class="login_pw">
                <h4>PASSWORD</h4>
                <input type="password" name="PW" id="PW" placeholder="PASSWORD"></input>
            </div>
        
            <div class="login_etc">
                <div class="checkbox">
                    <input type="checkbox" name="" id=""> 자동 로그인</input>
                </div>
                <div class="forgot_pw">
                    <a href="">비밀번호 찾기</a>
                </div>
                <div class="join_membership">
                    <a href="Join_membership.html">회원가입</a>
                </div>
            </div>
            <div class="submit" onclick="location.href = 'Main_page.html'">
                <input type="submit" value="로그인"></input>
            </div>
        </form>
      </div>
    </div>
  );
}

export default MyApp;


