import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import {getBusinessNews, getSportNews, getTechNews} from "../../repository/newsRepository";
import BusinessNewsList from "../../component/BusinessNewsList";

function Tech() {
    const [loading, setLoading] = useState(true);
    const [sportNews, setSportNews] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getSportNews()
            .then((news) => {
                setSportNews(news);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching sport news:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Latest Sport News</Text>
                    <Text style={styles.subheader}>All the action, all the time</Text>
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
                    <Text style={styles.header}>Latest Sport News</Text>
                    <Text style={styles.subheader}>All the action, all the time</Text>
                </View>
                <BusinessNewsList news={sportNews} />
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