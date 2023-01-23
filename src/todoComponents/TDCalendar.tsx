import { useState } from "react";
import { Calendar } from "react-calendar";
import "./TDCalendar.scss";
import moment from "moment";
import { FiSettings } from "react-icons/fi";
export const TDCalendar = (props: {
  pointday: Date;
  getPointDay: any;
  todoDB: any;
}) => {
  const [value, setValue] = useState(props.pointday);
  let marks: string[] = [];
  let allCheckedmarks: string[] = [];
  let notAllCheckedmarks: string[] = [];
  // let dotdiv = []
  if (props.todoDB !== null) {
    //const diaryDBDateArray = props.todoDB.map((value) => value.createAt);
    if (props.todoDB) {
      for (let i = 0; i < props.todoDB.length; i++) {
        let tmp3 = props.todoDB[i].createAt;
        // let tmp4 = moment(tmp3).format("DD-MM-YYYY");
        marks = [...marks, tmp3];
        let check = 0;
        for (let j = 0; j < props.todoDB[i].todo.length; j++) {
          if (props.todoDB[i].todo[j].checked === false) {
            check++;
          }
        }
        let tmp1 = props.todoDB[i].createAt;
        // let tmp2 = moment(tmp1).format("DD-MM-YYYY");
        if (check !== 0) {
          notAllCheckedmarks = [...notAllCheckedmarks, tmp1];
        } else if (check === 0) {
          allCheckedmarks = [...allCheckedmarks, tmp1];
        }
      }
    }
  }

  const markDots = (date: any) => {
    let dots: any = [];
    if (
      notAllCheckedmarks.includes(date.toLocaleDateString())
    ) {
      return(
        <div className="flex justify-center items-center absoluteDiv">
          <div className="notAllCheckedDot"></div>
        </div>
      );
    }
    else if (allCheckedmarks.includes(date.toLocaleDateString())) {
      return(
        <div className="flex justify-center items-center absoluteDiv">
          <div className="allCheckedDot"></div>
        </div>
      );
    }
    return <></>;
  };
  props.getPointDay(value);

  return (
    <Calendar
      // calendarType="US"
      onChange={setValue}
      value={value}
      formatDay={(locale, date) => moment(date).format("DD")}
      showNeighboringMonth={false}
      tileContent={({ date, view }) => markDots(date)}
      
    />
  );
};
// tileClassName={({ date, view }) => {
//   let classname = "";
//   if (marks.find((x: any) => x === moment(date).format("DD-MM-YYYY"))) {
//     classname = "highlight";
//   }
//   return classname;
// }}
// let html: any = [];
//         if (
//           notAllCheckedmarks.find(
//             (x: any) => x === moment(date).format("DD-MM-YYYY")
//           )
//         ) {
//           html.push(
//             <div className="flex justify-center items-center absoluteDiv">
//               <div className="notAllCheckedDot"></div>
//             </div>
//           );
//         }
//         if (
//           allCheckedmarks.find((x) => x === moment(date).format("DD-MM-YYYY"))
//         ) {
//           alert("fuck")
//           html.push(
//             <div className="flex justify-center items-center absoluteDiv">
//               <div className="allCheckedDot"></div>
//             </div>
//           );
//         }
//         return <>{html}</>;
