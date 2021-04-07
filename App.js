import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Home from "./components/maincomponents/Home";
import Data from "./components/maincomponents/Data";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
    setTimeout(() => SplashScreen.hide(), 1500);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Data" component={Data} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
