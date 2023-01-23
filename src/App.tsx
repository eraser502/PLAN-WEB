import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main";
import { TodoDiary } from "./pages/TodoDiary";
import { Login } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user 판명을 듣고
      console.log(user);
      if (user) {
        // 있으면
        console.log("O");
        setIsLogin(true); // 로그인 됨
      } else {
        console.log("X");
        setIsLogin(false); // 로그인 안됨
      }
      //setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isLogin ? (
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/todo-diary" element={<TodoDiary />} />
            {/* <Route path="/note" element={<Note />} /> */}
            <Route path="/*" element={<Navigate to="main" />} />
            <Route path="/" element={<Navigate to="main" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Navigate to="login" />} />
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
