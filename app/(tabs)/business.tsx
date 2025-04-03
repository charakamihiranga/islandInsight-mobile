import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { getBusinessNews } from "../../repository/newsRepository";
import BusinessNewsList from "../../component/BusinessNewsList";

function Business() {
    const [loading, setLoading] = useState(true);
    const [businessNews, setBusinessNews] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getBusinessNews()
            .then((news) => {
                setBusinessNews(news);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching business news:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.fullScreenContainer}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Latest Business News</Text>
                </View>
                <BusinessNewsList news={businessNews} />
            </View>
        </SafeAreaView>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    fullScreenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 10
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

export default Business;