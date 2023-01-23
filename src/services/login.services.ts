import { getRedirectResult, GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup, signInWithRedirect, UserCredential } from "firebase/auth";
import { getDoc, doc, setDoc, connectFirestoreEmulator, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setTodo, setTodoCategory,setDiary } from "./doc.services";

export const signOut = async () => {
    await auth.signOut();
    return;
}

export const googleSignUpWithPopup = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    console.log(result);
    await makeUser(result);
    return
}
// export async function loginWithSocial(provider) {
//       try {
//         const provider = new GoogleAuthProvider();
//         await new signInWithRedirect(auth, provider);
//         const result = await getRedirectResult(auth);
//         if (result) {
//           // const user = result.user;
//         }
//         return;
//       } catch (error) {
//         return error;
//       }
// }
export const googleSignUpWithRedirect = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    //const result = await getRedirectResult(auth)
    //await makeUser(result);
}

export const handleGoogleRedirectResult = async () => {
    if(auth.currentUser?.uid){return}
    console.log(auth.currentUser);
    try{
    const result = await getRedirectResult(auth)
    await makeUser(result);
    }catch(err:any){
        console.error('조짐');
        throw new Error(err)
        
    }
    return
}

const makeUser = async (result:any) => {
    
    if (!result) { return }
    // The signed-in user info.
    const user = result.user;

    if ((await getDoc(doc(db, 'user', user.uid))).exists()) { return }
    await setDoc(doc(db, "user", user.uid), {
        userEmail: user.email,
        userName: user.displayName,
    }, { merge: true }).catch((err) => console.log(err))
    // setTDL("daily");
    // setTDL("week");
    // setTDL("month");
    // setTDL("year");
    setTodo();
    setTodoCategory();
    setDiary();
    return
}

export const getUserNameById = async (id:any) => {
    const docRef = doc(db, 'user', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) { throw new Error('존재하지 않는 유저입니다.') }
    return docSnap.data()?.userName;
}
