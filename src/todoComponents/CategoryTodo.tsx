import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import "./CategoryTodo.scss";
import { TodoContent } from "./TodoContent";
import { TodoInput } from "./TodoInput";
import { FiSettings } from "react-icons/fi";
import { CategorySettingModal } from "./CategorySettingModal";
export const CategoryTodo = (props: {
  category: any;
  pointdayDB: any;
  updateDB: any;
  addTodo: any;
  categorySet: any;
  changeCategoryInTodoDB: any;
  deleteCategoryInTodoDB: any;
}) => {
  let category = props.category;
  const [addMode, setAddMode] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="categoryMainContainer">
      <div className="categorySettingButtonBox">
        <FiSettings
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
      </div>
      {modalIsOpen ? (
        <CategorySettingModal
          setModalIsOpen={(e: boolean) => {
            setModalIsOpen(e);
          }}
          category={category}
          categorySet={(cateDB: any) => {
            props.categorySet(cateDB);
          }}
          changeCategoryInTodoDB={(curcate: any, changedcate: any) =>
            props.changeCategoryInTodoDB(curcate, changedcate)
          }
          deleteCategoryInTodoDB={(e:any)=>props.deleteCategoryInTodoDB(e)}
        />
      ) : null}
      {category.map((value: any) => (
        <div className="categoryContainer" key={value}>
          <div className="categoryHeader">
            <div className="categoryBox">
              <div className="categoryTitle">{value}</div>
              {addMode === "" ? (
                <MdAddCircleOutline
                  onClick={() => {
                    setAddMode(value);
                  }}
                  style={{ fontSize: "20px" }}
                />
              ) : null}
            </div>
          </div>
          {addMode === value ? (
            <TodoInput
              mode={addMode}
              addTodo={(e: any) => {
                props.addTodo(e, value);
              }}
              close={() => {
                setAddMode("");
              }}
            />
          ) : null}
          <TodoContent
            currentCategory={value}
            pointdayDB={props.pointdayDB}
            updateDB={(e: any) => props.updateDB(e)}
          />
        </div>
      ))}
    </div>
  );
};
