import { UserCredential } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export const getTodo = async () => {
    //todo 값을 db에서 받아옴
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)

    const docRef3 = collection(docRef2, "TODOLIST");

    const querySnapshot:any = await getDoc(doc(docRef3,"TODO"));

    return querySnapshot.data().todoDB;
}

export const setTodo = async () => {
    //todo db를 서버에 생성
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "TODOLIST")

    await setDoc(doc(docRef3, "TODO"),
        {
            todoDB : []
        }, { merge: true })
}

export const updateTodo = async (todoDB:any) => {
    //서버의 todo db 값을 props값으로 바꿔줌 
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "TODOLIST");
    console.log("updateTodo")
    await updateDoc(doc(docRef3, "TODO"), {
        todoDB: todoDB
    });
    console.log("setTodo in Firebase")
}
// ===============================================================
export const getTodoCategory = async () => {
    //todo 값을 db에서 받아옴
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)

    const docRef3 = collection(docRef2, "TODOLIST");

    const querySnapshot:any = await getDoc(doc(docRef3,"Category"));

    return querySnapshot.data().categoryDB;
}

export const setTodoCategory = async () => {
    //todo db를 서버에 생성
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "TODOLIST")

    await setDoc(doc(docRef3, "Category"),
        {
            categoryDB : []
        }, { merge: true })
}

export const updateTodoCategory = async (categoryDB:any) => {
    //서버의 todo db 값을 props값으로 바꿔줌 
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "TODOLIST");
    await updateDoc(doc(docRef3, "Category"), {
        categoryDB: categoryDB
    });
    console.log("setCategory in Firebase")
}
export const getDiary = async () => {
    //todo 값을 db에서 받아옴
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)

    const docRef3 = collection(docRef2, "Diary");

    const querySnapshot:any = await getDoc(doc(docRef3,"DiaryDB"));

    return querySnapshot.data().diaryDB;
}

export const updateDiary = async (diaryDB:any) => {
    //서버의 todo db 값을 props값으로 바꿔줌 
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "Diary");
    await updateDoc(doc(docRef3, "DiaryDB"), {
        diaryDB: diaryDB
    });
}

export const setDiary = async () => {
    //todo db를 서버에 생성
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "Diary")

    await setDoc(doc(docRef3, "DiaryDB"),
        {
            diaryDB : []
        }, { merge: true })
}
// export const deleteTDL = async (kind:any) => {
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid);
//     const docRef3 = collection(docRef2, "plan");
//     await deleteDoc(doc(docRef3, kind));
// }
//================================================================
//Note DB
// export const getNote = async () => {
//     //todo 값을 db에서 받아옴
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid)

//     const docRef3 = collection(docRef2, "NoteDir");
//     //const docRef4 = doc(docRef3, date);

//     const querySnapshot = await getDoc(doc(docRef3,"Note"));
//     // let arr = [];
//     // querySnapshot.forEach((doc) => {
//     //     //console.log(doc.id, " => ", doc.data());
//     //     arr[doc.id] = doc.data();
//     // });
//     return querySnapshot.data().noteDB;
// }

// export const setNote = async () => {
//     //todo db를 서버에 생성
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid)
//     const docRef3 = collection(docRef2, "NoteDir")

//     await setDoc(doc(docRef3, "Note"),
//         {
//             noteDB : [] 
//         }, { merge: true })
// }

// export const updateNote = async (NoteDB) => {
//     //서버의 todo db 값을 props값으로 바꿔줌 
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid);
//     const docRef3 = collection(docRef2, "NoteDir");
//     await updateDoc(doc(docRef3, "Note"), {
//         noteDB: NoteDB
//     });
// }

// export const deleteNote = async (kind) => {
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid);
//     const docRef3 = collection(docRef2, "NoteDir");
//     await deleteDoc(doc(docRef3, kind));
// }