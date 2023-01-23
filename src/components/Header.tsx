import React from "react";
import "./Header.scss";
import { ReactComponent as DH } from "../customIcon/DH.svg";
import "../theme/variable.css";
import { useNavigate } from "react-router-dom";
import { MdMoreVert } from "react-icons/md";
import { signOut } from '../services/login.services';
export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="headerBox">
      <DH className="topMainButton" onClick={() => navigate("/main")} />
      <div className="signoutButton" onClick={()=>signOut()}>
        Sign Out
      </div>
      <div className="topMenuButtonBox">
        <button
          className="tododiaryMenuButton"
          onClick={() => navigate("/todo-diary")}
        >
          Todo-Diary
        </button>
        <button className="tododiaryMenuButton">Planner</button>
      </div>
    </div>
  );
};
