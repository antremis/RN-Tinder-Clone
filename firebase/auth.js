import {auth} from './firebase'
import { GoogleAuthProvider, signInWithCredential, signOut } from '@firebase/auth'
import * as Google from "expo-google-app-auth"

export const logout = async () => {
    return signOut(auth)
}

const config = {
    iosClientId : "556565586212-2lnjvfcctbs01hkbp9v7u3p8bkpd7bgh.apps.googleusercontent.com",
    androidClientId : "556565586212-75hannsc12jtosstat8vkb3flltqimuu.apps.googleusercontent.com",
    scope : ["profile", "email"],
    permissions : ["public_profile", "email", "gender", "location"],
}

export const signIn = async () => {
    let loginResult = await Google.logInAsync(config);
    if(loginResult.type === "success"){
        const {idToken, accessToken} = loginResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const {user} = await signInWithCredential(auth, credential);
        return user;
    }
    else{
        throw new Error("Failed to Login, Try Again Later!")
    }
}
