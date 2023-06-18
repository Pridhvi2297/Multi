import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async () => {
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                chatName: input,
            });
            console.log("Document written with ID: ", docRef.id);
            navigation.goBack();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
            />
            <Button disabled={!input} onPress={createChat} title="Create new Chat" />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
});
