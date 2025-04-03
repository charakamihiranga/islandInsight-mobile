import { FlatList, StyleSheet } from 'react-native';
import { CategorizedNews } from "../model/CategorizedNews";
import CategorizedNewsCard from "./CategorizedNewsCard";

function BusinessNewsList({ news }: { news: CategorizedNews[] }) {
    return (
        <FlatList
            data={news}
            keyExtractor={(item, index) => item.url || index.toString()}
            renderItem={({ item }) => <CategorizedNewsCard news={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
    },
});

export default BusinessNewsList;