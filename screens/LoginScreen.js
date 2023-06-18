import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Alert } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                navigation.replace("Main");
            }
        });

        return unsubscribe;
    }, [navigation]);

    const signIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            // Navigate to the Home screen or perform other actions
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Welcome to Multi
            </Text>
            <Image
                source={require('../assets/logo.png')}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button1} onPress={signIn} title='Login' />
            <Button onPress={() => navigation.navigate("SignUp")} containerStyle={styles.button2} type="outline" title='Sign Up' />
            <View styles={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

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
});
