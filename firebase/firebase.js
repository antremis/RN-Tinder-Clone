import { initializeApp } from "@firebase/app";
import { getAuth} from '@firebase/auth'
import { getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5YyDv64wac30pwEhpZvJtE2iuvTof9h4",
  authDomain: "rn-tinder-clone-a3fd1.firebaseapp.com",
  projectId: "rn-tinder-clone-a3fd1",
  storageBucket: "rn-tinder-clone-a3fd1.appspot.com",
  messagingSenderId: "556565586212",
  appId: "1:556565586212:web:6359e17a221f63f21593b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();