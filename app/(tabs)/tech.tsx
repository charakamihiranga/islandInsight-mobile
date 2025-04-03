import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import {getBusinessNews, getTechNews} from "../../repository/newsRepository";
import BusinessNewsList from "../../component/BusinessNewsList";

function Tech() {
    const [loading, setLoading] = useState(true);
    const [techNews, setTechNews] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getTechNews()
            .then((news) => {
                setTechNews(news);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tech news:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Latest Tech News</Text>
                    <Text style={styles.subheader}>Discover the future of tech</Text>
                </View>
                <View style={styles.loaderContainer}>

                    <ActivityIndicator size="large" color="red" />
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Latest Tech News</Text>
                    <Text style={styles.subheader}>Discover the future of tech</Text>
                </View>
                <BusinessNewsList news={techNews} />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
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
        fontSize: 22,
        color: "#222",
        marginLeft: 12,
        fontFamily: 'Poppins-Bold',
    },
    subheader: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Poppins-Regular",
        marginLeft: 12
    },
    sectionTitle: {
        fontSize: 18,
        color: "#222",
        marginLeft: 12,
        fontFamily: 'Poppins-SemiBold',
    }
});

export default Tech;