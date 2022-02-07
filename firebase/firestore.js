import { db } from "./firebase"
import { doc, getDoc, getDocs, collection, setDoc } from "@firebase/firestore"

const USERS = collection(db, "users")

export const updateUser = async (user, data) => {
    const ref = doc(USERS, user.uid)
    return setDoc(ref, data, {merge : true})
}

export const getData = async (ref) => {
    return getDoc(ref)
}

export const getProfiles = async () => {
    return getDocs(USERS)
}

export const handleUser = async (user) => {
    const ref = doc(USERS, user.uid)
    let snap = null
    try{
        snap = await getDoc(ref)
    }
    catch(err){
        console.log(err.message)
    }
    if(snap.exists()){
        return snap.data()
    }
    else{
        return null
    }
}

export const userSwiped = async (user, swiped, col) => {
    return setDoc(doc(db, "users", user.uid, col, swiped.id), swiped)
}

export const match = async (user, id) => {
    return getDoc(doc(db, "users", id, "MATCH", user.uid))
}

export const getPandM = async (user, col) => {
    return getDocs(collection(db, "users", user.uid, col))
}

export const createChat = async (id, data) => {
    return setDoc(doc(db, "chat", id), data)
}