import React from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';
import News from '../model/News';
import NewsCard from './NewsCard';

function NewsCardGrid ({ news }: { news: News[] }) {
    return (
        <FlatList
            data={[...news].reverse().slice(2)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item, index }) => <NewsCard item={item} onPress={() => {
                Alert.alert("News ID: ", `ID: ${item.id}`)
            }} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
        />
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        paddingVertical: 8,
        marginLeft: 8,
        marginRight: 8,
    },
});

export default NewsCardGrid;