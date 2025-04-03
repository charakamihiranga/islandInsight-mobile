import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import News from "../../model/News";
import {getAllNews, getLatestNews} from "../../repository/newsRepository";
import LatestNewsCardGrid from "../../component/LatestNewsCardGrid";
import NewsCardGrid from "../../component/NewsCardGrid";

function Index() {
    const [latestNews, setLatestNews] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [news, setNews] = useState<News[]>([]);


    useEffect(() => {
        setLoading(true);

        Promise.all([getLatestNews(), getAllNews()])
            .then(([latestNewsData, allNewsData]) => {
                setLatestNews(latestNewsData);
                setNews(allNewsData);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Discover Your Interests</Text>
                    <Text style={styles.subheader}>Browse Categories to Stay Informed</Text>
                </View>
                <LatestNewsCardGrid news={latestNews} />
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionTitle}>Latest of the day</Text>
                </View>
                <NewsCardGrid news={news}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    headerContainer: {
        marginBottom: 24,
        marginTop: 8,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginBottom: 6,
        marginLeft: 12,
        fontFamily: 'Poppins',
    },
    subheader: {
        fontSize: 16,
        color: "#666",
        fontWeight: "400",
        marginLeft: 12
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 0,
        color: "#222",
        marginLeft: 12
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
});

export default Index;