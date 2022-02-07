import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthContext } from '../context/AuthContext';
import { useUserContext } from '../context/UserContext';
import Home from './../screens/Home';
import Chat from './../screens/Chat';
import Login from '../screens/Login';
import Modal from './../screens/Modal';
import Match from './../screens/Match';

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const {user} = useAuthContext()
    const {userData} = useUserContext()

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? 
            (userData ? 
                (<>
                    <Stack.Group>
                        <Stack.Screen name = "Home" component = {Home} />
                        <Stack.Screen name = "Modal" component = {Modal} />
                        <Stack.Screen name = "Chat" component = {Chat} />
                    </Stack.Group>
                    <Stack.Group screenOptions = {{presentation: "transparentModal"}}>
                        <Stack.Screen name = "Match" component = {Match} />
                    </Stack.Group>
                </>)
                :
                (
                <Stack.Group screenOptions={{presentation : "modal"}}>
                    <Stack.Screen name = "Modal" component = {Modal} />
                    <Stack.Screen name = "Home" component = {Home} />
                </Stack.Group>)
                ) 
            : 
            (<Stack.Screen name = "Login" component = {Login} />)}            
        </Stack.Navigator>
    )
}

export default StackNavigator