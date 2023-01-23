import React, { useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { DiaryEditor } from "./DiaryEditor";
import "./DiaryView.scss";
import { DeleteModal } from "../components/DeleteModal";
export const DiaryView = (props: {
  dateDB: any;
  setIsView: any;
  editDiary: any;
  deleteDiary: any;
}) => {
  // let dayDB = props.dateDB
  let data = props.dateDB.content;
  let date = props.dateDB.date;
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="diaryViewMainContainer">
      {isEdit ? (
        <DiaryEditor
          mode="EDIT"
          date={props.dateDB.date}
          editDiary={(e: any) => {
            props.editDiary(props.dateDB.date, e);
            setIsEdit(false);
          }}
          content={data}
          setIsEdit={() => setIsEdit(false)}
        />
      ) : (
        <div className="viewerBox">
          <div className="viewTopButtonBox">
            <BiArrowBack
              style={{ fontSize: "20px" }}
              onClick={() => props.setIsView()}
            />
            <div>
              <AiOutlineEdit
                style={{ fontSize: "20px" }}
                onClick={() => setIsEdit(true)}
              />
              <AiOutlineDelete
                style={{ fontSize: "20px" }}
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </div>
          </div>
          {isDeleteModalOpen ? (
            <DeleteModal
              setIsDeleteModalOpen={() => setIsDeleteModalOpen(false)}
              deleteContent={()=>{props.setIsView();props.deleteDiary(date)}}
              deleteModalMessage={"해당 Diary를 삭제하시겠습니까?"}
            />
          ) : null}

          <Viewer initialValue={data || ""} />
        </div>
      )}
    </div>
  );
};
