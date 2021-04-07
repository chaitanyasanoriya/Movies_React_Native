import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function Home() {
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search"
                platform={Platform.OS}
                clearIcon={true}
                // onChangeText={(text) => params.handleSearch(text)}
                // onClearText={() => console.log("onClearText")}
                placeholder="Search.."
                cancelButtonTitle="Cancel"
            />
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
