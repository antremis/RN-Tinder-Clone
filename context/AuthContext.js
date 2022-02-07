import React, {createContext, useContext, useState, useEffect, useMemo} from "react"
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signIn, logout } from './../firebase/auth';
import Waiting from "../screens/waiting"

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    
    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [loadingauth, setLoadingauth] = useState(true)

    const handleSignIn = () => {
        setLoadingauth(true)
        signIn()
        .catch(err => setError(err.message))
    }

    const handleSignOut = () => {
        setLoadingauth(true)
        logout()
        .catch(err => setError(err.message))
    }

    useEffect(() => {
        const unsubAuthListener = onAuthStateChanged(auth, (user) => {
            setLoadingauth(true)
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
            }
            setLoadingauth(false)
        })
        return () => {
            unsubAuthListener()
        }
    }, [])

    const memoed = useMemo(() => (
        {
            user,
            error,
            loadingauth,
            handleSignIn,
            handleSignOut
    }), [user, error, loadingauth])
    
    return(
        <AuthContext.Provider value = {memoed}>
            {loadingauth ? <Waiting /> : props.children}
        </AuthContext.Provider> 
    )
    
}

export default AuthContextProvider
export const useAuthContext = () => useContext(AuthContext)