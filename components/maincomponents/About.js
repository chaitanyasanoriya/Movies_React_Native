import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function About({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                The application shows the user information about users. The App
                uses The Movie DB API to fetch all the details.
            </Text>
            <Text style={styles.text}>
                On Home Screen the Application shows the list of top rated
                movies. Here, the user can also search for movie using the
                Search bar on top.
            </Text>
            <Text style={styles.text}>
                The location icon in the header when clicked shows a Map which
                shows the geolocation using the Free Geo IP API.
            </Text>
            <Text style={styles.text}>
                When clicked on movie, information about the movie will be shown
                including cast and similar movies. The user can click on both
                cast and similar movies to see more infromation regarding them.
            </Text>
            <Text style={styles.text}>
                All cards on Home, Movie Details Screen and Cast screen are
                selectable. To select a card just long press on them. Upon
                selection a green tick will appear on top right corner of the
                card.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
});
