import React from "react";
import "./CategoryDeleteModal.scss";
export const CategoryDeleteModal = (props: {
  setIsDeleteModalOpen: any;
  deleteCategory: any;
}) => {
  return (
    <>
      <div
        className="DeleteModalBackground"
        onClick={() => props.setIsDeleteModalOpen(false)}
      ></div>
      <div className="DeleteModalContents">
        <div className="DeleteMessage">
          해당 카테고리를 삭제하시겠습니까?
          <br />
          (해당 카테고리에 입력 되어있던 <br />
          TODO들도 전부 삭제됩니다)
        </div>
        <div className="DeleteButtonBox">
          <button
            className="CateDelButtons"
            onClick={() => props.setIsDeleteModalOpen(false)}
          >
            취소
          </button>
          <button
            className="CateDelButtons"
            onClick={() => {
              props.deleteCategory();
              props.setIsDeleteModalOpen(false);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};
