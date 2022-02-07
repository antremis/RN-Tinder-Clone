import React from 'react'
import { Text, StyleSheet, ImageBackground} from 'react-native';

const Waiting = () => {

    return(
        <ImageBackground
            size = "cover"
            style = {styles.bg}
            source = {{uri : "https://tinder.com/static/tinder.png"}}>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bg : {
        flex: 1,
    }
})

export default Waiting