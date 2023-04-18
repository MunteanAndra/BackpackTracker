import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth";
import {collection, addDoc} from "firebase/firestore";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDerJ4NN2T3YTwNetAAGHELBSpdX1CAgtU",
    authDomain: "smart-backpack-f2e6f.firebaseapp.com",
    databaseURL: "https://smart-backpack-f2e6f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart-backpack-f2e6f",
    storageBucket: "smart-backpack-f2e6f.appspot.com",
    messagingSenderId: "1088956308975",
    appId: "1:1088956308975:web:f9885ba156a4466c1cea1a",
    measurementId: "G-R71JLTGG68"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};