import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const CalculatorScreen = () => {
    const [displayValue, setDisplayValue] = useState("0");
    const [operator, setOperator] = useState(null);
    const [prevValue, setPrevValue] = useState(null);

    const handleNumberPress = (number) => {
        setDisplayValue((prevDisplayValue) =>
            prevDisplayValue === "0" ? number : prevDisplayValue + number
        );
    };

    const handleOperatorPress = (operator) => {
        if (prevValue !== null) {
            calculateResult();
        }

        setOperator(operator);
        setPrevValue(displayValue);
        setDisplayValue("0");
    };

    const calculateResult = () => {
        const currentValue = parseFloat(displayValue);
        const previousValue = parseFloat(prevValue);

        if (isNaN(currentValue) || isNaN(previousValue)) {
            return;
        }

        let result = 0;

        switch (operator) {
            case "+":
                result = previousValue + currentValue;
                break;
            case "-":
                result = previousValue - currentValue;
                break;
            case "*":
                result = previousValue * currentValue;
                break;
            case "/":
                result = previousValue / currentValue;
                break;
            default:
                return;
        }

        setDisplayValue(result.toString());
        setOperator(null);
        setPrevValue(null);
    };

    const handleClearPress = () => {
        setDisplayValue("0");
        setOperator(null);
        setPrevValue(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{displayValue}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("7")}
                >
                    <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("8")}
                >
                    <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("9")}
                >
                    <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOperatorPress("/")}
                >
                    <Text style={styles.buttonText}>/</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("4")}
                >
                    <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("5")}
                >
                    <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("6")}
                >
                    <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOperatorPress("*")}
                >
                    <Text style={styles.buttonText}>*</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("1")}
                >
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("2")}
                >
                    <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("3")}
                >
                    <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOperatorPress("-")}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNumberPress("0")}
                >
                    <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleClearPress()}
                >
                    <Text style={styles.buttonText}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => calculateResult()}
                >
                    <Text style={styles.buttonText}>=</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOperatorPress("+")}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    display: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 30,
    },
    buttonRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    button: {
        width: 80,
        height: 80,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        borderRadius: 40,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
