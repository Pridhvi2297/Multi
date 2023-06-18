import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotepadScreen = () => {
    const [note, setNote] = useState("");

    const handleSaveNote = async () => {
        try {
            await AsyncStorage.setItem("note", note);
            alert("Note saved successfully!");
        } catch (error) {
            console.log(error);
            alert("Failed to save note.");
        }
    };

    const handleLoadNote = async () => {
        try {
            const savedNote = await AsyncStorage.getItem("note");
            if (savedNote !== null) {
                setNote(savedNote);
                alert("Note loaded successfully!");
            } else {
                alert("No saved note found.");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to load note.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.noteInput}
                multiline
                placeholder="Write your note here"
                value={note}
                onChangeText={(text) => setNote(text)}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save Note" onPress={handleSaveNote} />
                <Button title="Load Note" onPress={handleLoadNote} />
            </View>
        </View>
    );
};

export default NotepadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noteInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});
