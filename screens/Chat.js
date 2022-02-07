import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import {useNavigation} from '@react-navigation/core'


const Chat = () => {
    const navigation = useNavigation()

    return(
        <View>
            <Text>CHAT SCREEN</Text>
            <Button title = "Go to Home screen" onPress = {() => {navigation.navigate("Home")}}/>
        </View>
    )
}

export default Chat