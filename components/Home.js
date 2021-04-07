import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import {
    getTopRatedMovies,
    resetTopRatedPage,
    searchMovies,
} from "../networking/movies";
import CarouselItem from "./CarouselItem";

const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
    const [searchText, setSearchText] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [carouselData, setCarouselData] = useState([]);

    const handleMoviesCallback = (json, append) => {
        if (append) {
            setCarouselData([...carouselData, ...json.results]);
        } else {
            setCarouselData(json.results);
        }
    };

    if (isLoading) {
        getTopRatedMovies(handleMoviesCallback, false);
        setLoading(false);
    }

    const handleEnd = (number) => {
        getTopRatedMovies(handleMoviesCallback, true);
    };

    const handleSearchTextChange = (text) => {
        if (text == "") {
            console.log("getting top rated!");
            resetTopRatedPage();
            getTopRatedMovies(handleMoviesCallback, false);
        } else {
            searchMovies(text, handleMoviesCallback);
        }
        setSearchText(text);
    };
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search"
                platform={Platform.OS}
                clearIcon={true}
                onChangeText={handleSearchTextChange}
                value={searchText}
                onClearText={() => handleSearchTextChange("")}
                placeholder="Search.."
                cancelButtonTitle="Cancel"
            />
            <Text
                style={{
                    marginLeft: 10,
                    marginBottom: 10,
                    fontSize: 24,
                    fontWeight: "bold",
                }}
            >
                Top Rated Movies
            </Text>
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
                onEndReached={handleEnd}
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
});
