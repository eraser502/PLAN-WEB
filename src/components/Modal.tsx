import React, { useState } from "react";
import "./Modal.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
export const Modal = (props: {
  name: string;
  setModalIsOpen: any;
  category?: any;
  categorySet?: any;
  changeCatetoTodoDB:any;
}) => {
  const [cateDB, setCateDB] = useState(props.category);
  const [cate, setCate] = useState("");
  const [currentCate, setCurrentCate] = useState("");
  const [modifytext, setModifytext] = useState("");
  let cateDiv = [];
  for (let i = 0; i < cateDB.length; i++) {
    cateDiv.push(
      <>
        {currentCate === cateDB[i] ? (
          <div className="CateBox">
            <input onChange={(e)=>setModifytext(e.target.value)} value={modifytext} className="CateModifyInput" />
            <button className="CateModifyButton" onClick={()=>modifyEnd(i)}>Modify</button>
          </div>
        ) : (
          <div className="CateBox">
            {cateDB[i]}
            <div className="CateEditor">
              <AiOutlineEdit
                style={{ fontSize: "16px" }}
                onClick={() => modifyMode(cateDB[i])}
              />
              <RiDeleteBin6Line onClick={()=>{}} style={{ fontSize: "16px" }} />
            </div>
          </div>
        )}
      </>
    );
  }
  const AddCate = () => {
    let tmp = cateDB;
    tmp.push(cate);
    setCateDB(tmp);
    setCate("");
    props.categorySet(tmp);
  };

  const modifyMode = (curcate: string) => {
    setCurrentCate(curcate);
    setModifytext(curcate);
  };
  const modifyEnd = (index:any) => {
    props.changeCatetoTodoDB(cateDB[index],modifytext)
    console.log(currentCate)
    let tmp = cateDB;
    tmp[index] = modifytext;
    setCateDB(tmp);
    setModifytext("")
    setCurrentCate("")
    props.categorySet(tmp);
    
  };
  return (
    <>
      <div
        className="ModalBackground"
        onClick={() => props.setModalIsOpen(false)}
      ></div>
      <div className="ModalContents">
        <div className="ContentHeader">{props.name}</div>
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
                props.categorySet(cateDB);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
// {cate.map((value: any) => {
//     <div className="setCateBox" key={value}>
//       afsdfsdfasdfasdfa
//     </div>;
//   })}
