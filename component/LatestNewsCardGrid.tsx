import News from "../model/News";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import LatestNewsCard from "./LatestNewsCard";
import {router} from "expo-router";

function LatestNewsCardGrid({ news }: { news: News[] }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={[...news].reverse()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LatestNewsCard
                        news={item}
                        onPress={() => {
                            router.push(`screens/view-news/${item.id}`);
                        }}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={styles.card.width + 16}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    list: {
        paddingLeft: 16,
        paddingRight: 8,
        paddingVertical: 8,
    },
    card: {
        width: 280,
    },
});

export default LatestNewsCardGrid;
