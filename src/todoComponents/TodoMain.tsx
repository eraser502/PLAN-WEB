import React, { useEffect, useState } from "react";
import { TDCalendar } from "../todoComponents/TDCalendar";
import {
  getTodo,
  getTodoCategory,
  updateTodo,
  updateTodoCategory,
} from "../services/doc.services";
import { CategoryTodo } from "./CategoryTodo";
import { TodoContent } from "./TodoContent";
import "./TodoMain.scss";
export const TodoMain = () => {
  const [todoDB, setTodoDB] = useState<any>([]);
  const [category, setCategory] = useState([]);
  const [pointdayDB, setPointdayDB] = useState<any>([]);
  const [pointday, setPointday] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  const updateDB = (ptDB: any) => {
    let index = findPointDayIndex(todoDB, pointday.toLocaleDateString());
    let tmp1 = todoDB;
    console.log(ptDB);
    if (ptDB.length === 0) {
      tmp1.splice(index, 1);
    } else {
      tmp1[index].todo = ptDB;
    }
    setPointdayDB(ptDB);
    setTodoDB(tmp1);
    updateTodo(tmp1);
    console.log("updateDB");
  };

  const findPointDayIndex = (propsDb: any, propsValue: string) => {
    //pointday에 해당하는 배열의 index를 구해주는 함수
    let index = propsDb.findIndex(
      (value: any) => value.createAt === propsValue
    );

    return index;
  };

  const addTodo = (content: string, category: string) => {
    let tmp = [...todoDB];
    let idx = findPointDayIndex(todoDB, pointday.toLocaleDateString());
    setPointdayDB([
      ...pointdayDB,
      {
        content: content,
        id: pointdayDB.length,
        category: category,
        checked: false,
        modify: false,
      },
    ]);
    if (idx !== -1) {
      tmp[idx].todo = [
        ...pointdayDB,
        {
          content: content,
          id: tmp[idx].todo.length,
          category: category,
          checked: false,
          modify: false,
        },
      ];
    } else {
      tmp = [
        ...todoDB,
        {
          createAt: pointday.toLocaleDateString(),
          todo: [
            ...pointdayDB,
            {
              content: content,
              id: 0,
              category: category,
              checked: false,
              modify: false,
            },
          ],
        },
      ];
      setTodoDB(tmp);
    }
    
    // console.log(tmp[idx].todo)
    // setPointdayDB(tmp[idx].todo);
    updateTodo(tmp);
  };

  const categorySet = (categoryDB: any) => {
    setCategory(categoryDB);
    updateTodoCategory(categoryDB);
  };

  const changeCategoryInTodoDB = (curcate: any, changedCategory: any) => {
    let tmp = todoDB;
    for (let i = 0; i < todoDB.length; i++) {
      for (let j = 0; j < todoDB[i].todo.length; j++) {
        if (todoDB[i].todo[j].category === curcate) {
          tmp[i].todo[j].category = changedCategory;
        }
      }
    }
    setTodoDB(tmp);
    let index = todoDB.findIndex(
      (e: any) => e.createAt === pointday.toLocaleDateString()
    );
    setPointdayDB(todoDB[index].todo);
    console.log("1");
  };

  const deleteCategoryInTodoDB = (category: any) => {
    let tmp = todoDB;
    for (let i = 0; i < todoDB.length; i++) {
      for (let j = 0; j < todoDB[i].todo.length; j++) {
        if (todoDB[i].todo[j].category === category) {
          tmp[i].todo.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp[i].todo.length; j++) {
        tmp[i].todo[j].id = j;
      }
    }
    setTodoDB(tmp);
    let index = todoDB.findIndex(
      (e: any) => e.createAt === pointday.toLocaleDateString()
    );
    if (index !== -1) {
      setPointdayDB(todoDB[index].todo);
      console.log("1");
    } else {
      setPointdayDB([]);
      console.log("2");
    }
  };
  // useEffect(() => {
  //   let index = todoDB.findIndex(
  //     (e: any) => e.createAt === pointday.toLocaleDateString()
  //   );
  //   if (index !== -1) {
  //     setPointdayDB(todoDB[index].todo);
  //     console.log("1");
  //   } else {
  //     setPointdayDB([]);
  //     console.log("2");
  //   }
  // }, [todoDB]); // todoDB의 값이 변할때마다 랜더링'
  const getInitData = async () => {
    console.log("getDB in Firebase");
    setLoading(true);
    try {
      (async () => {
        const todo: any = await getTodo();
        const cate: any = await getTodoCategory();
        setTodoDB(todo);
        setCategory(cate);
        setLoading(false);
      })();
    } catch (e: any) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    let index = todoDB.findIndex(
      (e: any) => e.createAt === pointday.toLocaleDateString()
    );
    if (index !== -1) {
      setPointdayDB(todoDB[index].todo);
      console.log("1");
    } else {
      setPointdayDB([]);
      console.log("2");
    }
  }, [pointday]); // pointday가 바뀔때마다 해당날짜의 데이터로 pointdayDB 변경

  useEffect(() => {
    let index = todoDB.findIndex(
      (e: any) => e.createAt === pointday.toLocaleDateString()
    );
    if (index !== -1) {
      setPointdayDB(todoDB[index].todo);
      console.log("1");
    } else {
      setPointdayDB([]);
      console.log("2");
    }
  }, [todoDB]); // pointday가 바뀔때마다 해당날짜의 데이터로 pointdayDB 변경

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <div className="todoMainContainer">
      <div className="todoCalendarBox">
        <TDCalendar
          pointday={pointday}
          getPointDay={(day: any) => {
            setPointday(day);
          }}
          todoDB={todoDB}
        />
      </div>
      <div className="todoMainContentBox">
        <CategoryTodo
          pointdayDB={pointdayDB}
          category={category}
          updateDB={(e: any) => {
            updateDB(e);
          }}
          addTodo={(content: string, category: string) =>
            addTodo(content, category)
          }
          categorySet={(categoryDB: any) => {
            categorySet(categoryDB);
          }}
          changeCategoryInTodoDB={(
            currentCategory: any,
            changedCategory: any
          ) => changeCategoryInTodoDB(currentCategory, changedCategory)}
          deleteCategoryInTodoDB={(e: any) => deleteCategoryInTodoDB(e)}
        />
      </div>
    </div>
  );
};
