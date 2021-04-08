import React, { useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    ScrollView,
} from "react-native";

import Carousel from "react-native-snap-carousel";
import {
    getCast,
    getCastInformation,
    getSimilarMovies,
    getWorkedOn,
} from "../../networking/movies";
import CarouselItem from "./CarouselItem";
const { width: screenWidth } = Dimensions.get("window");

export default function Cast({ cast, push }) {
    const [isLoading, setLoading] = useState(true);
    const [info, setInfo] = useState({});
    const [movies, setMovies] = useState([]);
    const handleCastInfo = (json) => {
        setInfo(json);
    };
    const handleMovies = (json) => {
        setMovies(json.cast);
    };
    if (isLoading) {
        getCastInformation(cast.id, handleCastInfo);
        getWorkedOn(cast.id, handleMovies);
        setLoading(false);
    }
    let img = { uri: `https://image.tmdb.org/t/p/w500/${cast.profile_path}` };
    if (cast.profile_path == null) {
        img = {
            uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`,
        };
    }
    let name = cast.name;
    if (cast.name != cast.original_name) {
        name = `${cast.name} (${cast.original_name})`;
    }
    const displayDeathDate = () => {
        if (info.deathday != null) {
            return <Text style={[styles.margin]}>Died: ${info.deathday}</Text>;
        }
    };
    const movieClicked = (movie) => {
        push("Data", { movie: movie });
    };
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            <Image style={styles.img} source={img} />
            <View style={styles.infoView}>
                <Text style={styles.head}>{name}</Text>
                <Text style={[styles.margin]}>Born: {info.birthday}</Text>
                {displayDeathDate()}
                <Text style={[styles.margin]}>
                    Born In: {info.place_of_birth}
                </Text>
                <Text style={[styles.margin]}>{info.biography}</Text>
                <Text
                    style={{
                        marginVertical: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                    }}
                >
                    Worked In
                </Text>
                <Carousel
                    style={styles.imageCarousel}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={150}
                    data={movies}
                    renderItem={({ item }, parallaxProps) => (
                        <CarouselItem
                            item={item}
                            parallaxProps={parallaxProps}
                            itemClicked={movieClicked}
                            width={150}
                        />
                    )}
                    hasParallaxImages={true}
                    loop={true}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: "100%",
        aspectRatio: 2 / 3,
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
