import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import Background from '../assets/images/background-gradient.jpg'
import Logo from '../assets/images/tinder-logo.png'
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/core';
import { useUserContext } from '../context/UserContext';

const Login = () => {
    const {handleSignIn} = useAuthContext()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    return(
        <ImageBackground style = {styles.bg} source = {Background} >
            <Image size = "cover" style = {styles.logo} source = {Logo} />
            <TouchableOpacity style = {styles.btn} onPress = {handleSignIn} activeOpacity={0.8}>
                <Text style = {styles.btnText}>Sign In With Google</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        color: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"
    },
    logo : {
        height: 150,
        width: 150,
        marginBottom: 50,
        marginTop: "-15%",
    },
    btn : {
        borderRadius: 5,
        backgroundColor: "#FFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    btnText : {
        letterSpacing: 1,
        fontSize: 18,
    }
})

export default Login