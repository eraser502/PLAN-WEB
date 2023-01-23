import React, { useEffect, useState } from "react";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TodoModify } from "./TodoModify";
import "./TodoContent.scss";
export const TodoContent = (props: {
  currentCategory: string;
  pointdayDB: any;
  updateDB: any;
}) => {
  let pointdayDB = [...props.pointdayDB];
  let divideDB = [];
  const [modifyingID, setModifyingID] = useState("");
  const modifyEnd = (id: string, content: string) => {
    let index = pointdayDB.findIndex((value: any) => value.id === id);
    pointdayDB[index].modify = false;
    pointdayDB[index].content = content;
    console.log(pointdayDB);
    props.updateDB(pointdayDB);
    setModifyingID("")
    // tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    // updateTodo(tmp2);
  };
  const handleCheck = (id: string) => {
    let index = pointdayDB.findIndex((value: any) => value.id === id);
    let tmp1 = [...props.pointdayDB];
    tmp1[index].checked = !tmp1[index].checked;
    props.updateDB(tmp1);
  };
  const deleteTodo=(id:string)=>{
    let index = pointdayDB.findIndex((value:any) => value.id === id);
    let tmp1 = [...props.pointdayDB];
    tmp1.splice(index, 1);
    for(let i = 0; i < tmp1.length; i++){
      tmp1[i].id = i;
    }
    props.updateDB(tmp1)
  }
  for (let i = 0; i < pointdayDB.length; i++) {
    if (pointdayDB[i].category === props.currentCategory) {
      divideDB.push(
        <div className="todoContentBox" key={pointdayDB[i].id}>
          <>
            {modifyingID === pointdayDB[i].id ? (
              <TodoModify
                content={pointdayDB[i].content}
                modifyEnd={(content: string) =>
                  modifyEnd(pointdayDB[i].id, content)
                }
                close={() => {
                  setModifyingID("")
                }}
              />
            ) : (
              <div className="todoTextBox">
                {pointdayDB[i].checked ? (
                  <BiCheckboxChecked
                    size="17px"
                    onClick={() => handleCheck(pointdayDB[i].id)}
                  />
                ) : (
                  <BiCheckbox
                    size="17px"
                    onClick={() => handleCheck(pointdayDB[i].id)}
                  />
                )}
                <div
                  className={
                    pointdayDB[i].checked ? "todoText checked" : "todoText"
                  }
                >
                  {pointdayDB[i].content}
                </div>
                <AiOutlineEdit
                  className="TDLModifyButton"
                  onClick={() => {
                    setModifyingID(pointdayDB[i].id);
                  }}
                ></AiOutlineEdit>
                <RiDeleteBin6Line
                  className="TDLDeleteButton"
                  onClick={() => deleteTodo(props.pointdayDB[i].id)}
                ></RiDeleteBin6Line>
              </div>
            )}
          </>
        </div>
      );
    }
  }

  if (divideDB.length > 0) {
    return <>{divideDB}</>;
  }
  return null;
};
