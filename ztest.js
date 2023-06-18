auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
        authUser.user.update({
            displayName: name,
            photoURL:
                imageUrl || "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg",
        });
    })
    .catch(error => alert(error.message));


import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAIaBsefiU2N5Ho6CVL6Js40vy3DQ_2RWI",
    authDomain: "multi-2297.firebaseapp.com",
    projectId: "multi-2297",
    storageBucket: "multi-2297.appspot.com",
    messagingSenderId: "434662447831",
    appId: "1:434662447831:web:6f8fd2f0e3af6f4fbbee92"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };


LoginScreen.js

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from '../firebase'


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => { }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Welcome to Multi
            </Text>
            <Image source={
                require('../assets/logo.png')
            }
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>

            <Button containerStyle={styles.button1} onPress={signIn} title='Login' />
            <Button onPress={() => navigation.navigate("SignUp")} containerStyle={styles.button2} type="outline" title='Sign Up' />
            <View styles={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "White",
    },
    inputContainer: {
        width: 300,
        marginTop: 10,
    },
    button1: {
        width: 200,
        marginTop: 5,
    },
    button2: {
        width: 200,
        marginTop: 10,
        marginBottom: 50,
    },
})