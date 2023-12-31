import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import NotepadScreen from './screens/NotepadScreen';
import CalendarScreen from './screens/CalendarScreen';


const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#296580" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "White",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='Home' 
        screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChatScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Calculator' component={CalculatorScreen} />
        <Stack.Screen name='Notepad' component={NotepadScreen} />
        <Stack.Screen name='Calendar' component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
