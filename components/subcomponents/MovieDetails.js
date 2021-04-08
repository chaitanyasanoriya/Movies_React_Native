import React, { useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel";
import { getCast, getSimilarMovies } from "../../networking/movies";
import CastItem from "../subcomponents/CastItem";
import CarouselItem from "./CarouselItem";
import MovieItem from "./MovieItem";
const { width: screenWidth } = Dimensions.get("window");

export default function MovieDetails({ movie }) {
    const [cast, setCast] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [extraData, setExtraData] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);
    const handleCasts = (json) => {
        // console.log("cast: ", json.cast);
        setCast(json.cast);
        setExtraData(!extraData);
    };

    const handleSimilarMovies = (json) => {
        console.log(json);
        setSimilarMovies(json.results);
    };

    if (isLoading) {
        getCast(movie.id, handleCasts);
        getSimilarMovies(movie.id, handleSimilarMovies);
        setLoading(false);
    }
    const getTitle = () => {
        if (movie.original_title != movie.title) {
            return `${movie.title} (${movie.original_title})`;
        }
        return movie.title;
    };
    const castClicked = (cast) => {
        console.log(cast);
    };
    const movieClicked = (movie) => {
        console.log(movie);
    };
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 400 }}
            >
                <Image
                    style={styles.img}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                    }}
                />
                <View style={styles.infoView}>
                    <Text style={styles.head}>{getTitle()}</Text>
                    <Text style={[styles.margin]}>
                        Rating: {movie.vote_average}
                    </Text>
                    <Text style={[styles.margin]}>{movie.overview}</Text>
                    <Text style={[styles.margin]}>
                        Release Date: {movie.release_date}
                    </Text>
                    <Text
                        style={{
                            marginVertical: 10,
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        Cast
                    </Text>
                    <Carousel
                        style={styles.imageCarousel}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={150}
                        data={cast}
                        renderItem={({ item }, parallaxProps) => (
                            <CastItem
                                item={item}
                                parallaxProps={parallaxProps}
                                itemClicked={castClicked}
                            />
                        )}
                        hasParallaxImages={true}
                        extraData={extraData}
                    />

                    <Text
                        style={{
                            marginVertical: 10,
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        Similar Movies
                    </Text>
                    <Carousel
                        style={styles.imageCarousel}
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={150}
                        data={similarMovies}
                        renderItem={({ item }, parallaxProps) => (
                            <CarouselItem
                                item={item}
                                parallaxProps={parallaxProps}
                                itemClicked={movieClicked}
                                width={150}
                            />
                        )}
                        hasParallaxImages={true}
                        extraData={extraData}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    img: {
        width: "100%",
        height: "40%",
        resizeMode: "contain",
        backgroundColor: "#000",
    },
    infoView: {
        padding: 10,
    },
    head: {
        fontSize: 24,
        fontWeight: "bold",
    },
    margin: {
        marginTop: 10,
    },
    imageCarousel: {
        flex: 1,
    },
});
