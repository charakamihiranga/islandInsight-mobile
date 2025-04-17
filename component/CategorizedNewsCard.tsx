import { CategorizedNews } from "../model/CategorizedNews";
import { TouchableOpacity, View, StyleSheet, Image, Text, Linking, Dimensions } from "react-native";
import { getCategorizedPublishedTime, getReadTime } from "../util/util";

function CategorizedNewsCard({ news }: { news: CategorizedNews }) {
    const handlePress = () => {
        if (news.url) {
            Linking.openURL(news.url);
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image
                source={{ uri: news.urlToImage || 'https://via.placeholder.com/150' }}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.textContainer}>
                <Text style={styles.timeAgo}>{getCategorizedPublishedTime(news.publishedAt)}</Text>
                <Text style={styles.title} numberOfLines={2}>{news.title}</Text>

                <View style={styles.metaContainer}>
                    <Text style={styles.date}>{new Date(news.publishedAt).toDateString()}</Text>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.readTime}>{getReadTime(news.content)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        height: 180,
        width: '100%',
    },
    textContainer: {
        padding: 16,
    },
    timeAgo: {
        color: '#888',
        fontSize: 12,
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
        lineHeight: 22,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        color: '#E74C3C',
        fontSize: 12,
        fontWeight: '500',
    },
    separator: {
        marginHorizontal: 6,
        color: '#888',
    },
    readTime: {
        color: '#888',
        fontSize: 12,
    },
});

export default CategorizedNewsCard;