import React, { useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import {
    getTopRatedMovies,
    resetTopRatedPage,
    searchMovies,
} from "../../networking/movies";
import CarouselItem from "../subcomponents/CarouselItem";
import Icon from "react-native-vector-icons/Entypo";

const { width: screenWidth } = Dimensions.get("window");

export default function Home({ navigation }) {
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
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Data", { location: true })
                    }
                    // style={{ marginRight: 10 }}
                >
                    <Icon name="location-pin" color="black" size={24} />
                </TouchableOpacity>
            ),
        });
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

    const itemClicked = (item) => {
        navigation.navigate("Data");
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
                    <CarouselItem
                        item={item}
                        parallaxProps={parallaxProps}
                        itemClicked={itemClicked}
                    />
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
