import React, { useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core'
import { useAuthContext } from '../context/AuthContext';
import Navbar from './../components/Navbar';
import Swiper from 'react-native-deck-swiper';
import { useCardContext } from '../context/CardContext';
import Card from './../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { useUserContext } from '../context/UserContext';

const Home = () => {
    const navigation = useNavigation()
    const {user} = useAuthContext()
    const {data} = useCardContext()
    const {handleUserSwiped, handleMatch} = useUserContext()
    const swiperRef = useRef(null)

    const swipeLeft = (index) => {
        if(!data[index]) return
        const userSwiped = data[index]
        handleUserSwiped(userSwiped, "PASS")
    }
    
    const swipeRight = (index) => {
        if(!data[index]) return
        const userSwiped = data[index]
        handleUserSwiped(userSwiped, "MATCH")
            .then(() => {
                handleMatch(userSwiped)
                    .then(temp => {
                        if(temp) navigation.navigate("Match")
                    })
            })
    }

    return(
        <View style = {styles.home}>
            <Navbar photo = {user.photoURL} navigation = {navigation}/>
            <View style = {styles.swiperContainer}>
                <Swiper 
                ref = {swiperRef}
                stackSize = {5}
                cardIndex = {0}
                animateCardOpacity
                overlayLabels = {{
                    left : {
                        title : "PASS",
                        style : {
                            label : {
                                textAlign : "right",
                                color : "red",
                                opacity : 1,
                            }
                        }
                    },
                    right : {
                        title : "MATCH",
                        style : {
                            label : {
                                textAlign : "left",
                                color : "#4DED30",
                            }
                        }
                    }
                }}
                onSwipedLeft={swipeLeft}
                onSwipedRight={swipeRight}
                verticalSwipe = {false} 
                cards = {data} 
                containerStyle={styles.swiper} 
                renderCard = {card => {
                    return <Card data = {card}/>
                }}/>
            </View>
            <View style = {styles.btnArea}>
                <TouchableOpacity onPress = {() => {swiperRef.current.swipeLeft()}} style = {[styles.circle, styles.pass]}><Ionicons name = "close" size = {30} color = "red"/></TouchableOpacity>
                <TouchableOpacity onPress = {() => {swiperRef.current.swipeRight()}} style = {[styles.circle, styles.match]}><Ionicons name = "heart" size = {30} color = "green"/></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    home : {
        flex: 1,
    },
    swiperContainer : {
        flex: 1,
    },
    swiper : {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        padding : 0,
    },
    btnArea: {
        flexDirection: "row",
        justifyContent : "space-evenly",
        paddingBottom : 20,
    },
    circle : {
        borderRadius : 50,
        padding : 10,
    },
    pass : {
        backgroundColor : "pink"
    },
    match : {
        backgroundColor : "lightgreen"
    },
})

export default Home