import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { TodoMain } from "../todoComponents/TodoMain";
import "../theme/variable.css";
import "./TodoDiary.scss";
import { Diary } from "../diaryComponents/DiaryMain";
export const TodoDiary = () => {
  const [tdmode, setTdmode] = useState<string>("");
  const [todoDB, setTodoDB] = useState([]);

  return (
    <>
      <Header />
      <div className="todoDiaryMainContainer">
        <div className="tdButtonBox">
          <button className="todoModeButton" onClick={() => setTdmode("Todo")}>
            Todo
          </button>
          <button
            className="diaryModeButton"
            onClick={() => setTdmode("Diary")}
          >
            Diary
          </button>
        </div>
        {tdmode === "Todo" ? <TodoMain /> : null}
        {tdmode === "Diary" ? <Diary /> : null}
      </div>
    </>
  );
};
