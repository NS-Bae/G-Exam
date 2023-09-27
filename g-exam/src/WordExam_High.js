import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

function Main()
{
  return (
    <h1><Link to ='/'>G-PLAN</Link></h1>
  )
}
function MyApp() {
    return (
    <div className = "background">
      <div className = "wrap">
        <Main/>
        <h2>고등 영단어 시험</h2>
      </div>
    </div>
  );
}

export default MyApp;


