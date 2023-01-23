import React, { useEffect } from "react";
import { Modal } from "../components/Modal";
import { DiaryCalendar } from "./DiaryCalendar";
import { useState } from "react";
import "./DiaryMain.scss";
import { DiaryEditor } from "./DiaryEditor";
import { getDiary, updateDiary } from "../services/doc.services";

export const Diary = () => {
  const [pointday, setPointday] = useState(new Date());
  const [diaryDB, setDiaryDB] = useState<any>([{}]);
  const getInitData = async () => {
    console.log("getDB in Firebase");
    try {
      (async () => {
        const data: any = await getDiary();
        setDiaryDB(data);
      })();
    } catch (e: any) {
      console.log(e);
    }
  };

  const addDiary = (date: any, content: any) => {
    let tmp = [...diaryDB];
    if (diaryDB.length != 0) {
      tmp[diaryDB.length] = {
        date: date.toLocaleDateString(),
        content: content,
      };
    } else {
      tmp = [...diaryDB, { date: date.toLocaleDateString(), content: content }];
    }
    console.log(tmp)
    setDiaryDB(tmp);
    updateDiary(tmp);
  };

  const editDiary = (date: any, content: any) => {
    let idx = findDateIndex(diaryDB, date);
    let tmp = [...diaryDB];
    tmp[idx].content = content;
    setDiaryDB(tmp)
    updateDiary(tmp)
  };

  const findDateIndex = (propsDb: any, propsValue: any) => {
    //date에 해당하는 배열의 index를 구해주는 함수
    let index = propsDb.findIndex((value: any) => value.date === propsValue);

    return index;
  };

  const deleteDiary=(date:any)=>{
    let idx = findDateIndex(diaryDB, date);
    let tmp = [...diaryDB];
    tmp.splice(idx, 1)
    setDiaryDB(tmp)
    updateDiary(tmp)
  }

  useEffect(() => {
    console.log("다이어리 데이터 db에서 불러옴");
    getInitData();
  }, []);
  console.log(diaryDB);
  return (
    <div className="diaryMainContainer">
      <div className="diaryCalendarBox">
        <DiaryCalendar
          diaryDB={diaryDB}
          pointday={pointday}
          setDiaryDB={(e: any) => setDiaryDB(e)}
          addDiary={(date: any, content: any) => addDiary(date, content)}
          editDiary={(date: any, content: any) => {
            editDiary(date, content);
          }}
          deleteDiary={(e:any)=>deleteDiary(e)}
        />
      </div>
    </div>
  );
};
