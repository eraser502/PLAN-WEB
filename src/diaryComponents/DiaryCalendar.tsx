import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "./DiaryCalendar.scss";
import moment from "moment";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DiaryEditor } from "./DiaryEditor";
import { updateDiary } from "../services/doc.services";
import { DiaryView } from "./DiaryView";
export const DiaryCalendar = (props: {
  pointday: Date;
  diaryDB: any;
  setDiaryDB: any;
  addDiary: any;
  editDiary: any;
  deleteDiary:any
}) => {
  const [value, setValue] = useState(props.pointday);
  const [isAdd, setIsAdd] = useState(false);
  const [isView, setIsView] = useState(false);
  const [nowdate, setNowdate] = useState<Date>(new Date());
  const [dateDB, setDateDB] = useState([]);
  let db = props.diaryDB;
  let marks: string[] = [];
  // let allCheckedmarks: string[] = [];
  // let notAllCheckedmarks: string[] = [];

  if (props.diaryDB !== null) {
    //const diaryDBDateArray = props.todoDB.map((value) => value.createAt);
    if (props.diaryDB) {
      for (let i = 0; i < props.diaryDB.length; i++) {
        let tmp3 = props.diaryDB[i].date;
        marks = [...marks, tmp3];
      }
    }
  }
  const viewOrAdd = (nowDate: any) => {
    setNowdate(nowDate);
    let idx = findDateIndex(db, nowDate.toLocaleDateString());
    if (idx != -1) {
      setDateDB(db[idx]);
      setIsView(true);
    } else {
      setIsAdd(true);
    }
  };
  const findDateIndex = (propsDb: any, propsValue: any) => {
    //date에 해당하는 배열의 index를 구해주는 함수
    let index = propsDb.findIndex((value: any) => value.date === propsValue);

    return index;
  };

  const mArk = (date: any) => {
    let dots: any = [];
    let today = new Date();
    if (marks.includes(date.toLocaleDateString())) {
      return (
        <div className="flex justify-center items-center absoluteDiv">
          {/* <div className="diaryExist"></div> */}
          <div>🐣</div>
        </div>
      );
    }
    if (date <= today) {
      //값있으면 색으로 변경
      return (
        <div className="flex justify-center items-center absoluteDiv">
          <AiOutlinePlusCircle />
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      {isAdd ? (
        <DiaryEditor
          mode="ADD"
          date={value.toLocaleDateString()}
          addDiary={(e: any) => {
            props.addDiary(nowdate, e);
            setIsAdd(false);
          }}
          setIsAdd={() => setIsAdd(false)}
        />
      ) : isView ? (
        <DiaryView
          dateDB={dateDB}
          setIsView={() => setIsView(false)}
          editDiary={(date: any, content: any) =>
            props.editDiary(date, content)
          }
          deleteDiary={(e:any)=>{
           props.deleteDiary(e);
          }}
        />
      ) : (
        <Calendar
          // calendarType="US"
          onChange={setValue}
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          onClickDay={(date) => {
            viewOrAdd(date);
          }}
          formatDay={(locale, date) => moment(date).format("DD")}
          showNeighboringMonth={false}
          maxDate={new Date()}
          tileContent={({ date, view }) => mArk(date)}
        />
      )}
    </>
  );
};
