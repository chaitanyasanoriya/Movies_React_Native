import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/AntDesign";

export default function CarouselItem({
    item,
    parallaxProps,
    itemClicked,
    width,
}) {
    const [selected, setSelected] = useState(false);
    let image = { uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` };
    const displaySelected = () => {
        if (selected) {
            return (
                <View style={styles.iconContainer}>
                    <Icon name="checkcircleo" color="green" size={32} />
                </View>
            );
        }
    };
    const getTitle = () => {
        if (item.original_title != item.title) {
            return `${item.title} (${item.original_title})`;
        }
        return item.title;
    };
    const displayInfo = () => {
        if (width > 150) {
            return (
                <View style={styles.subInfoView}>
                    <Text style={styles.text}>Rating: {item.vote_average}</Text>
                    <Text style={styles.text}>{item.release_date}</Text>
                </View>
            );
        }
    };
    return (
        <TouchableOpacity
            onPress={() => itemClicked(item)}
            activeOpacity={0.6}
            style={[styles.item, { width: width }]}
            onLongPress={() => setSelected(!selected)}
        >
            <ParallaxImage
                source={image}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <View style={styles.info}>
                <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {getTitle()}
                </Text>
                {displayInfo()}
            </View>

            {displaySelected()}
        </TouchableOpacity>
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
        aspectRatio: 1.5 / 2.6,
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
        resizeMode: "contain",
    },
    subInfoView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        color: "#fff",
    },
    iconContainer: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});
