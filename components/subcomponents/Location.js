import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
} from "react-native";

export default function Location() {
    const getData = async () => {
        let response = await fetch("https://freegeoip.app/json/");
        let json = await response.json();
        console.log(json);
    };
    getData();
    return (
        <View>
            <Text>Location</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
