import React, { useLayoutEffect, useRef, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    SafeAreaView,
    TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { collection, doc, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getFirestore } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        Keyboard.dismiss();

        if (input && input !== "\n") {
            try {
                await addDoc(collection(db, "chats", route.params.id, "messages"), {
                    timestamp: serverTimestamp(),
                    message: input,
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                });
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }

        setInput("");
        scrollDownFunc();
    };

    const scrollDownDelayed = () => {
        setTimeout(function () {
            scrollDownFunc();
        }, 35);
    };

    useLayoutEffect(() => {
        const q = query(
            collection(db, "chats", route.params.id, "messages"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        scrollDownDelayed();

        return unsubscribe;
    }, [route]);

    const scrollDown = useRef();

    const scrollDownFunc = () => {
        scrollDown.current.scrollToEnd();
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        rounded
                        source={{
                            uri:
                                messages[0]?.data?.photoURL ||
                                "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
                        }}
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 70,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
        scrollDownFunc();
    }, [navigation, messages]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={85}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView
                            ref={scrollDown}
                            contentContainerStyle={{
                                paddingTop: 15,
                                flexDirection: "column-reverse",
                            }}
                        >
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            rounded
                                            position="absolute"
                                            bottom={30}
                                            right={-5}
                                            size={24}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            rounded
                                            position="absolute"
                                            top={-10}
                                            left={-5}
                                            size={24}
                                            source={{ uri: data.photoURL }}
                                        />
                                        <Text style={styles.recieverName}>{data.displayName}</Text>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                placeholder="Enter message"
                                onSubmitEditing={sendMessage}
                                onFocus={scrollDownDelayed}
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 10,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        maxWidth: "80%",
        position: "relative",
        marginBottom: 10,
    },
    recieverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 12,
        color: "white",
    },
    sender: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 10,
        maxWidth: "80%",
        position: "relative",
    },
    recieverText: {
        color: "white",
        fontWeight: "500",
    },
    senderText: {
        color: "black",
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        padding: 15,
        width: "100%",
        alignItems: "center",
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#e8dfe6",
        padding: 10,
        borderWidth: 1,
        color: "black",
        borderRadius: 30,
    },
});
