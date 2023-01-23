import React, { useEffect, useRef, useState } from "react";
import "./TodoModify.scss"
export const TodoModify = (props: {
  content: string;
  modifyEnd: any;
  close: any;
}) => {
  const [modifytodos, setModifytodos] = useState(props.content);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        props.close();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);
  return (
    <div ref={modalRef}>
      <div className="todoTextBox">
        <input
          className="todoInputText"
          value={modifytodos}
          placeholder="Modify todos..."
          onChange={(e) => setModifytodos(e.target.value)}
          spellCheck="false"
        ></input>
        <button
          className="todoModifyEndButton"
          onClick={() => {
            if (modifytodos !== props.content) {
              props.modifyEnd(modifytodos);
            }
            props.close();
          }}
        >
          Modify
        </button>
      </div>
    </div>
  );
};
