import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import News from '../model/News';
import NewsCard from './NewsCard';
import { useRouter } from 'expo-router';

function NewsCardGrid({ news }: { news: News[] }) {
    const router = useRouter();

    return (
        <FlatList
            data={[...news].reverse().slice(2)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
                <NewsCard
                    item={item}
                    onPress={() => {
                        router.push(`screens/view-news/${item.id}`);
                    }}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
        />
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        paddingVertical: 8,
        marginLeft: 8,
        marginRight: 8,
    },
});

export default NewsCardGrid;
