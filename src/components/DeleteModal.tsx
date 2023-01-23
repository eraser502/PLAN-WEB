import React from "react";
import "./DeleteModal.scss";
export const DeleteModal = (props: {
  setIsDeleteModalOpen: any;
  deleteContent: any;
  deleteModalMessage: any;
  deleteDetailMessage?: any;
}) => {
  return (
    <>
      <div
        className="DeleteModalBackground"
        onClick={() => props.setIsDeleteModalOpen(false)}
      ></div>
      <div className="DeleteModalContents">
        <div className="DeleteMessage">
          {props.deleteModalMessage}
          {props.deleteDetailMessage ? (
            <>
              {props.deleteDetailMessage}
            </>
          ) : null}
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
              props.deleteContent();
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
