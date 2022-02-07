import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const Card = ({data}) => {

    let profile = data ? data : {
        photoURL : "https://links.papareact.com/6gb",
        firstName : "No More",
        lastName : "Profiles",
        age : "",
    }
    return(
        <View style = {styles.card}>
            <Image style = {styles.image} source = {{uri : profile.photoURL}} size = "cover" />
            <View style = {styles.info}>
                <View style = {styles.infoHalf}>
                    <Text style = {styles.nameText}> {profile.firstName} {profile.lastName}</Text>
                    <Text style = {styles.jobText}>{profile.occupation}</Text>
                </View>
                <View style = {styles.infoHalf}>
                    <Text style = {styles.ageText}>{profile.age}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        height: "75%",
        overflow: "hidden",
        borderRadius: 15,
        shadowColor : "#000",
        shadowOffset : {width : 0, height : 1},
        shadowOpacity : 0.2,
        shadowRadius : 1.41,
        elevation : 2,
        backgroundColor: "white",
    },
    image : {
        height : "85%",
        width : "100%",
    },
    info : {
        flex: 1,
        flexDirection: 'row',
        height: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 25,
    },
    infoHalf : {
        height : "100%",
        alignItems: "center",
        justifyContent : "center"
    },
    nameText : {
        fontSize: 18,
        fontWeight: "bold"
    },
    jobText : {
        fontSize: 10,
        fontWeight: "200",
        letterSpacing: 1,
    },
    ageText : {
        fontSize : 30,
        fontWeight: "bold"
    },  
})

export default Card