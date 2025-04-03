import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import News from '../model/News';

function NewsCard({ item, onPress }: { item: News; onPress?: () => void }) {
    const contentPreview = item.postContent?.length > 60
        ? `${item.postContent.substring(0, 60)}...`
        : item.postContent;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {item.imgLink && <Image source={{ uri: item.imgLink }} style={styles.image} />}
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.summary} numberOfLines={1}>{contentPreview}</Text>
                <Text style={styles.timeStamp}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    summary: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    timeStamp: {
        fontSize: 11,
        color: '#888',
    }
});

export default NewsCard;