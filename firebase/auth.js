import {auth} from './firebase'
import { GoogleAuthProvider, signInWithCredential, signOut } from '@firebase/auth'
import * as Google from "expo-google-app-auth"

export const logout = async () => {
    return signOut(auth)
}

const config = {
    iosClientId : IOS_CLIENT_KEY',
    androidClientId : ANDROID_CLIENT_KEY,
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
