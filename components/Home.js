import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { getTopRatedMovies } from "../networking/movies";
import CarouselItem from "./CarouselItem";

const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
    const [searchText, setSearchText] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [carouselData, setCarouselData] = useState([]);
    if (isLoading) {
        // console.log("isLoading");
        getTopRatedMovies((json) => {
            setCarouselData([...carouselData, ...json.results]);
        });
        setLoading(false);
    }
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search"
                platform={Platform.OS}
                clearIcon={true}
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                // onClearText={() => console.log("onClearText")}
                placeholder="Search.."
                cancelButtonTitle="Cancel"
            />
            <Carousel
                style={styles.imageCarousel}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={carouselData}
                renderItem={({ item }, parallaxProps) => (
                    <CarouselItem item={item} parallaxProps={parallaxProps} />
                )}
                hasParallaxImages={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageCarousel: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
        backgroundColor: "#222222",
        borderRadius: 8,
    },
    info: { padding: 15 },
    title: {
        color: "white",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#dddddd",
        marginTop: 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },
});
