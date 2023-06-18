import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const MainScreen = () => {
    const navigation = useNavigation();

    const handlePress = (screen) => {
        navigation.navigate(screen);
    };
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar
                            size={50}
                            rounded
                            icon={{ name: "sign-out", type: "font-awesome" }}
                            activeOpacity={0.7}
                            containerStyle={{ flex: 5, marginRight: 20 }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress("Home")}>
                <Ionicons name="chatbubble-outline" size={50} color="black" />
                <Text style={styles.iconText}>Chat Application</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress("Calculator")}>
                <Ionicons name="calculator-outline" size={50} color="black" />
                <Text style={styles.iconText}>Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress("Notepad")}>
                <Ionicons name="document-outline" size={50} color="black" />
                <Text style={styles.iconText}>Notepad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => handlePress("Calendar")}>
                <Ionicons name="calendar-outline" size={50} color="black" />
                <Text style={styles.iconText}>Calendar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    iconText: {
        fontSize: 18,
        marginTop: 10,
    },
});
