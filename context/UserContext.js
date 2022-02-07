import React, {useContext, createContext, useState, useLayoutEffect, useMemo} from "react";
import { handleUser, updateUser, userSwiped, match, createChat } from "../firebase/firestore"
import Waiting from "../screens/waiting";
import { useAuthContext } from "./AuthContext";

const UserContext = createContext()

const UserContextProvider = (props) => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const {user} = useAuthContext()

    const handleUpdateUser = (data) => {
        data.photoURL = user.photoURL
        data.id = user.uid
        let name = user.displayName.split(" ")
        data.firstName = name[0]
        data.lastName = name[1]
        updateUser(user, data)
            .then(setUserData(data))
            .catch(err => console.log(err.mesage))
    }

    const handleUserSwiped = async (swiped, col) => {
        return userSwiped(user, swiped, col)
    }

    const handleMatch = async (swiped) => {
        return (match(user, swiped.id)
            .then(doc => {
                if(doc.exists()){
                    return handleCreateChat(swiped).then(() => (true)).catch(console.log)
                }
                else return false
            })
            .catch(err => console.log(err.message)))
    }

    const handleCreateChat = async (swiped) => {
        const id1 = user.uid
        const id2 = swiped.id
        id = id1 > id2 ? id1 + id2 : id2 + id1
        let data = {
            ids : [id1, swiped.id],
            id1 : userData,
            id2 : swiped,
        }
        return createChat(id, data).catch(console.log)
    }
    
    useLayoutEffect(() => {
        setLoading(true)
        if(user){
            handleUser(user)
                .then(data => {
                    setUserData(data)
                })
                .catch(err => console.log(err.message))
                .finally(() => setLoading(false))
        }
        else{
            setUserData(null)
            setLoading(false)
        }
    }, [])

    const memoed = useMemo(() => ({
        userData,
        loading,
        handleUpdateUser,
        handleUserSwiped,
        handleMatch,
        handleCreateChat,
    }), [userData])

    return(
        <UserContext.Provider value = {memoed} >
            {loading? <Waiting /> : props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
export const useUserContext = () => {
    return useContext(UserContext)
} 