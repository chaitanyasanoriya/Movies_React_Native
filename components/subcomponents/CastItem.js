import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/AntDesign";

const { width: screenWidth } = Dimensions.get("window");

export default function CastItem({ item, parallaxProps, itemClicked }) {
    // console.log("received item: ", item);
    const [selected, setSelected] = useState(false);
    let image = { uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` };
    if (item.profile_path == null) {
        image = {
            uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`,
        };
    }
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
        if (item.original_name != item.name) {
            return `${item.original_name} (${item.name})`;
        }
        return item.name;
    };
    return (
        <TouchableOpacity
            onPress={() => itemClicked(item)}
            activeOpacity={0.6}
            style={styles.item}
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
                <Text style={styles.title}>{getTitle()}</Text>
                <Text style={{ color: "#fff", fontSize: 12 }}>
                    {item.character}
                </Text>
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
    item: {
        width: 150,
        aspectRatio: 1.5 / 2.6,
        backgroundColor: "#222222",
        borderRadius: 8,
    },
    info: { padding: 15, justifyContent: "center", alignContent: "center" },
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
