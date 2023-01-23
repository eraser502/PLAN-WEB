import React, { useState } from "react";
import "./CategorySettingModal.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CategoryDeleteModal } from "./CategoryDeleteModal";
export const CategorySettingModal = (props: {
  setModalIsOpen: any;
  category?: any;
  categorySet?: any;
  changeCategoryInTodoDB: any;
  deleteCategoryInTodoDB: any;
}) => {
  const [cateDB, setCateDB] = useState(props.category);
  const [cate, setCate] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [modifytext, setModifytext] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let cateDiv = [];
  for (let i = 0; i < cateDB.length; i++) {
    cateDiv.push(
      <>
        {currentCategory === cateDB[i] ? (
          <div className="CateBox">
            <input
              onChange={(e) => setModifytext(e.target.value)}
              value={modifytext}
              className="CateModifyInput"
            />
            <button className="CateModifyButton" onClick={() => modifyEnd(i)}>
              Modify
            </button>
          </div>
        ) : (
          <div className="CateBox">
            {cateDB[i]}
            <div className="CateEditor">
              <AiOutlineEdit
                style={{ fontSize: "16px" }}
                onClick={() => modifyMode(cateDB[i])}
              />
              <RiDeleteBin6Line
                style={{ fontSize: "16px" }}
                onClick={() => setIsDeleteModalOpen(true)}
              />
              {isDeleteModalOpen ? (
                <CategoryDeleteModal
                  setIsDeleteModalOpen={(e: boolean) => setIsDeleteModalOpen(e)}
                  deleteCategory={() => deleteCategory(i)}
                />
              ) : null}
            </div>
          </div>
        )}
      </>
    );
  }
  const AddCate = () => {
    if (!cateDB.includes(cate)) {
      let tmp = cateDB;
      tmp.push(cate);
      setCateDB(tmp);
      setCate("");
      props.categorySet(tmp);
    }else{
      alert("같은 이름의 카테고리가 이미 존재합니다")
    }
  };

  const modifyMode = (curcate: string) => {
    setCurrentCategory(curcate);
    setModifytext(curcate);
  };
  const modifyEnd = (index: any) => {
    props.changeCategoryInTodoDB(cateDB[index], modifytext);
    console.log(currentCategory);
    let tmp = cateDB;
    tmp[index] = modifytext;
    setCateDB(tmp);
    setModifytext("");
    setCurrentCategory("");
    console.log(index);
    props.categorySet(tmp);
  };
  const deleteCategory = (index: any) => {
    props.deleteCategoryInTodoDB(cateDB[index]);
    let tmp = cateDB;
    tmp.splice(index, 1);
    setCateDB(tmp);
    props.categorySet(tmp);
    props.setModalIsOpen(false);
  };
  return (
    <>
      <div
        className="ModalBackground"
        onClick={() => props.setModalIsOpen(false)}
      ></div>
      <div className="ModalContents">
        <div className="ContentHeader">Category Setting</div>
        <div className="ContentBox">{cateDiv}</div>
        <div className="InputCateBox">
          <input
            value={cate}
            className="CateInput"
            placeholder="Add Category..."
            onChange={(e: any) => setCate(e.target.value)}
          />
          <AiOutlinePlus
            style={{ fontSize: "20px" }}
            onClick={() => {
              if (cate !== "") {
                AddCate();
                // props.categorySet(cateDB);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
