/* import './App.css';

function LoginBtn() {
  return (
    <button className = "login_btn" id = "gotologin">
      로그인
    </button>
  );
}
function InfoBtn() {
  return (
    <button className = "login_btn" id = "gotomyinfo">
      내정보
    </button>
  );
}

export default function MyApp() {
  return (
    <div className = "background">
      <div className = "wrap">
        <h1>G-PLAN</h1>
        <div className = "login_btn_space">
          <LoginBtn/>
          <InfoBtn/>
        </div>
      </div>
    </div>
  );
}
*/
import React, { createContext, useContext, useState } from 'react';

// 컨텍스트 생성
const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // 로그인 로직을 구현하고 로그인 상태를 변경합니다.
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 로직을 구현하고 로그인 상태를 변경합니다.
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      <div>
        <Header />
        <Content />
      </div>
    </AuthContext.Provider>
  );
}

function Header() {
  const { isLoggedIn, handleLogin, handleLogout } = useContext(AuthContext);

  return (
    <header>
      {isLoggedIn ? (
        <div>
          <p>로그인 상태입니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인되지 않았습니다.</p>
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </header>
  );
}

function Content() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main>
      {isLoggedIn ? (
        <p>로그인 상태에서 볼 수 있는 컨텐츠</p>
      ) : (
        <p>로그인이 필요한 컨텐츠</p>
      )}
    </main>
  );
}

export default App;