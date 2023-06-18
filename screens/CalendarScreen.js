import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calendar Screen</Text>
            <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: "blue",
                    },
                }}
            />
            {selectedDate && (
                <Text style={styles.selectedDateText}>
                    Selected Date: {selectedDate}
                </Text>
            )}
        </View>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    selectedDateText: {
        fontSize: 18,
        marginTop: 20,
    },
});
