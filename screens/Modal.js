import React, { useLayoutEffect, useState } from 'react'
import { Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { useAuthContext } from '../context/AuthContext';
import { useUserContext } from '../context/UserContext';


const Modal = () => {
    const navigation = useNavigation()
    const {user} = useAuthContext()
    const [occupation, setOccupation] = useState("")
    const [age, setAge] = useState("")
    const incompleteForm = !occupation || !age
    const {userData, handleUpdateUser} = useUserContext()

    useLayoutEffect(() => {
        if(userData != null){
            try{
                setOccupation(userData.occupation)
            }
            catch(err){
                console.log(err.message)
            }
            try{
                setAge(userData.age)
            }
            catch(err){
                console.log(err.message)
            }
        }
    }, []);

    const handleSubmit = () => {
        handleUpdateUser({occupation, age})
        navigation.replace("Home")
    }

    return(
        <TouchableOpacity activeOpacity={1} style = {styles.container} onPress = {Keyboard.dismiss}>
            <Image style = {styles.logo} size = "contain" source = {{uri : "https://links.papareact.com/2pf"}} />
            <Text style = {styles.welcomeText}>Welcome {user.displayName} </Text>

            <Text style = {styles.hintText}>Step 1 : Update Occupation</Text>
            <TextInput style = {styles.input} value = {occupation} onChangeText={(value) => {setOccupation(value)}} />

            <Text style = {styles.hintText}>Step 2 : Update Age</Text>
            <TextInput keyboardType='number-pad' style = {styles.input} value = {age} onChangeText={(value) => {setAge(value)}} />

            <TouchableOpacity style = {[styles.btn, incompleteForm ? {backgroundColor : "grey"} : {backgroundColor : "hotpink"}]} onPress={handleSubmit} disabled = {incompleteForm} >
                <Text style = {{color : "white", letterSpacing : 1, fontWeight : "bold"}}>Update Profile</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: "center",
        paddingVertical : StatusBar.currentHeight,
    },
    logo : {
        height : 60,
        aspectRatio : 2/1
    },
    welcomeText : {
        fontSize : 16, 
        fontWeight : "bold",
        color : "#555",
        textAlign : "center",
        paddingTop : 20,
        paddingBottom : 40
    },
    hintText : {
        color : "hotpink",
        textAlign : "center",
        fontWeight : "bold",
    },
    input : {
        fontSize : 14,
        width : "70%",
        marginBottom : 20,
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderRadius : 5,
        borderWidth : 1,
        borderStyle : "dashed"
    },
    btn : {
        paddingHorizontal : 15,
        paddingVertical : 8,
        borderRadius : 5,
    }
})

export default Modal