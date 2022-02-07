import React from 'react'
import { TouchableOpacity, StyleSheet, Image, StatusBar, View } from "react-native"
import Logo from '../assets/images/tinder-2.png'
import {Ionicons} from '@expo/vector-icons'
import { useAuthContext } from '../context/AuthContext'

const Navbar = ({photo, navigation}) => {

    const {handleSignOut} = useAuthContext()

    return (
        <View style = {styles.navbar}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("Modal")}}>
                <Image style = {styles.dp} source = {{uri : photo}} />
            </TouchableOpacity>
            <TouchableOpacity onPress = {handleSignOut} activeOpacity={0.5}>
                <Image style = {styles.logo} source = {Logo}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("Chat")}}>
                <Ionicons style = {styles.chat} name = "chatbubbles-sharp"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems : "flex-end",
        paddingTop : StatusBar.currentHeight,
        paddingBottom: 10,
        paddingHorizontal: 30,
    },
    dp : {
        width : 35,
        height : 35,
        borderRadius : 1000,
    },
    logo : {
        height: 45,
        width: 45,
    },
    chat : {
        fontSize: 35,
        color : "#FF5685",
    }
})

export default Navbar