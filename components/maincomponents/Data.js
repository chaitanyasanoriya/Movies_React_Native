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
import MovieDetails from "../subcomponents/MovieDetails";

export default function Data({ navigation, route }) {
    // console.log(route.params);
    const push = (name, data) => {
        navigation.push(name, data);
    };
    if (route.params != undefined && route.params.location != undefined) {
        navigation.setOptions({ title: "Your Location" });
        return <Location />;
    } else if (route.params != undefined && route.params.movie != undefined) {
        let movie = route.params.movie;
        navigation.setOptions({ title: movie.title });
        return <MovieDetails movie={movie} push={push} />;
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
