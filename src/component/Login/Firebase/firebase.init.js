import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

// initialize firebase
const initializeAuthentication = () => {
    //Initialize app
    initializeApp(firebaseConfig);
}

export default initializeAuthentication;