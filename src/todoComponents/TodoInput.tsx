import React, { useEffect, useRef, useState } from "react";
import "./TodoInput.scss"
export const TodoInput = (props: {
  mode: string;
  addTodo: any;
  close: any;
}) => {
  const [todos, setTodos] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (mode !== "" && !modalRef.current?.contains(e.target)) {
        props.close();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [mode]);
const handleOnKeyPress=(e:any)=>{
  if(e.key ==="Enter" && todos !== ""){
    props.addTodo(todos);
    props.close();
  }
}
  return (
    <div ref={modalRef} className="input">
      <input
        className="todoInputText"
        placeholder="Add todos..."
        onChange={(e) => setTodos(e.target.value)}
        value={todos}
        onKeyPress={handleOnKeyPress}
      />
      <button
        className="todoAddButton"
        onClick={() => {
          if (todos !== "") {
            props.addTodo(todos);
          }
          props.close();
        }}
      >
        Add
      </button>
    </div>
  );
};
