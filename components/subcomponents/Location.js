import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Location() {
    const [location, setLocation] = useState(null);
    const mapRef = useRef();
    const getData = async () => {
        let response = await fetch("https://freegeoip.app/json/");
        console.log("response: ", response);
        let json = await response.json();
        console.log("json: ", json);
        mapRef.current.animateToRegion({
            latitude: json.latitude,
            longitude: json.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
        });
        setLocation(json);
    };
    getData();
    const addMarker = () => {
        if (location) {
            return (
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                />
            );
        }
    };
    return (
        <View style={styles.container}>
            {/* <Text>Location</Text> */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {addMarker()}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        height: "100%",
        ...StyleSheet.absoluteFillObject,
    },
});
