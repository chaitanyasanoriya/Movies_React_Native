import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
} from "react-native";
import Location from "../subcomponents/Location";

export default function Data({ navigation, route }) {
    if (route.params != undefined && route.params.location != undefined) {
        navigation.setOptions({ title: "Your Location" });
        return <Location />;
    }
    return (
        <View>
            <Button
                title="go in"
                onPress={() => {
                    console.log("clicking go in");
                    navigation.push("Data");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
