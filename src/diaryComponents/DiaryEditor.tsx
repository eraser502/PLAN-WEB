import React, { useState, useRef, useEffect } from "react";
import "./DiaryEditor.scss";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { BiArrowBack } from "react-icons/bi";
export const DiaryEditor = (props: {
  mode: any;
  date: any;
  addDiary?: any;
  editDiary?: any;
  content?:any;
  setIsAdd?:any
  setIsEdit?:any
}) => {
  const editorRef: any = useRef();
  const [data, setData] = useState();

  const onChange = () => {
    setData(editorRef.current.getInstance().getHTML());
  };
  // const getInitData = async () => {
  //   console.log("getDB in Firebase");
  //   try {
  //     (async () => {
  //       const test: any = await getDiary();
  //       setTest(test)
  //     })();
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   getInitData();

  // }, []);

  // useEffect(() => {
  //   getInitData();
  // }, [cnt]);
  return (
    <>
      {props.mode === "ADD" ? (
        <div className="diaryEditorMainContainer">
          <BiArrowBack style={{ fontSize: "20px" }} onClick={()=>props.setIsAdd()}/>
          <Editor
            initialValue=" "
            placeholder="일기를 작성해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="600px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            language="ko-KR"
            onChange={onChange}
            hideModeSwitch={true}
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic","image", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table",  "link"],
              ["code", "codeblock"],
            ]}
            ref={editorRef}
            plugins={[colorSyntax]}
          />
          <button
            className="diarySaveButton"
            onClick={() => props.addDiary(data)}
          >
            저장하기
          </button>
        </div>
      ) : (
        <div className="diaryEditorMainContainer">
          <BiArrowBack style={{ fontSize: "20px" }} onClick={()=>props.setIsEdit()}/>
          <Editor
            initialValue={props.content}
            placeholder="일기를 수정해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="600px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
            language="ko-KR"
            onChange={onChange}
            hideModeSwitch={true}
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic","image", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table",  "link"],
              ["code", "codeblock"],
            ]}
            ref={editorRef}
            plugins={[colorSyntax]}
          />
          <button
            className="diarySaveButton"
            onClick={() => props.editDiary(data)}
          >
            수정하기
          </button>
        </div>
      )}
    </>
  );
};


