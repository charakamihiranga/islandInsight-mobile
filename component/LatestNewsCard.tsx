import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from "react-native";
import News from "../model/News";
import { getPublishedTime, getReadTime } from "../util/util";

export default function NewsCard({ news, onPress }: { news: News, onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: news.imgLink }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
                <Text style={styles.timeAgo}>{getPublishedTime(news.date, news.time)}</Text>
                <Text style={styles.readTime}>{getReadTime(news.postContent)}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {news.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

// Responsive sizing based on screen width
const width = Dimensions.get("window").width;
const isSmallDevice = width < 375;
const cardSize = isSmallDevice ? width * 0.4 : width * 0.45;

const styles = StyleSheet.create({
    card: {
        width: cardSize,
        height: cardSize,
        marginRight: 12,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        height: cardSize * 0.65,
        width: "100%",
        backgroundColor: "#f0f0f0",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
    },
    contentContainer: {
        padding: 10,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: isSmallDevice ? 8 : 10,
        fontWeight: "600",
        color: "#222",
        lineHeight: 16,
    },
    readTime: {
        fontSize: 9,
        fontWeight: "500",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: "hidden",
    },
    timeAgo: {
        fontSize: 9,
        fontWeight: "500",
        color: "white",
        backgroundColor: "#ff3b30",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: "hidden",
    },
});