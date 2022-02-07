import React, {useState, useContext, createContext, useMemo, useLayoutEffect} from 'react'
import Waiting from '../screens/waiting';
import { getProfiles, getPandM } from './../firebase/firestore';
import { useAuthContext } from './AuthContext';

const CardContext = createContext()

const CardContextProvider = (props) => {

    const [loading, setLoading] = useState(true)
    const {user} = useAuthContext()
    const [data, setData] = useState([])

    const handleGetProfiles = () => {
        setLoading(true)
        if(user){
            let temp = []
            getProfiles()
                .then(snap => {
                    snap.forEach(doc => {
                        temp.push({
                            ...doc.data(),
                        })
                    })
                    temp = temp.filter((doc) => doc.id !== user.uid)
                })
                .then(() => {
                    getPandM(user, "PASS")
                        .then((snap) => {
                            snap = snap.docs
                            snap = snap.map(doc => doc.id)
                            temp = temp.filter(doc => !(snap.includes(doc.id)))
                    })
                })
                .then(() => {
                    getPandM(user, "MATCH")
                        .then((snap) => {
                            snap = snap.docs
                            snap = snap.map(doc => doc.id)
                            temp = temp.filter(doc => !(snap.includes(doc.id)))
                            setData(temp)
                    })
                })
                .catch(err => console.log(err.message))
                .finally(setLoading(false))
            }
        else{
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        handleGetProfiles()
    }, [])

    // const memoed = useMemo(() => ({

    // }), [data])

    return (
    <CardContext.Provider value = {{data, handleGetProfiles}}>
        {loading ? <Waiting /> : props.children}
    </CardContext.Provider>
    )
}

export default CardContextProvider
export const useCardContext = () => {
    return useContext(CardContext)
}