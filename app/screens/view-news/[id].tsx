import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
    Alert, Share
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, AntDesign, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { getLikeCount, checkIfLiked, updateLikesInDb } from '../../../services/likeService';
import News from '../../../model/News';
import { getNewsById } from '../../../repository/newsRepository';
import { useAuth } from "../../../context/AuthContext";
import { getPublishedTime, getReadTime } from "../../../util/util";
import colors from "../../../constants/colors";
import { listenToComments, postCommentToDb} from "../../../services/commentsService";
import {CommentWithId} from "../../../types/comment-types";

function NewsDetailScreen() {
    const { id } = useLocalSearchParams();
    const [likeCount, setLikeCount] = useState(0);
    const [news, setNews] = useState<News | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<CommentWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchNews();
            if (currentUser) {
                await fetchLikeStatus();
            }
            setLoading(false);
        };

        fetchData();

        // Set up real-time listener for like count updates
        const unsubscribeLikeCount = getLikeCount(id as string, (updatedLikeCount) => {
            setLikeCount(updatedLikeCount);
        });

        // Set up real-time listener for comments
        const unsubscribeComments = listenToComments(id as string, (updatedComments) => {
            setComments(updatedComments);
        });

        return () => {
            unsubscribeLikeCount();
            unsubscribeComments();
        };
    }, [id, currentUser]);

    const fetchNews = async () => {
        try {
            const newsItem = await getNewsById(parseInt(id as string));
            setNews(newsItem);
        } catch (error) {
            console.error("Error fetching news:", error);
            Alert.alert("Error", "Failed to load news details. Please try again.");
        }
    };

    // Fetch the user's like status for this news item
    const fetchLikeStatus = async () => {
        if (currentUser) {
            try {
                const userLikeStatus = await checkIfLiked(id as string, currentUser.uid);
                setIsLiked(userLikeStatus);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        }
    };

    const toggleLike = async () => {
        if (!currentUser) {
            // Navigate to sign in if user is not logged in
            router.push('/screens/signin');
            return;
        }

        try {
            // Toggle like in the database
            await updateLikesInDb(id as string, !isLiked, currentUser.uid);

            // Update local state
            setIsLiked(!isLiked);

            // No need to manually update likeCount as it will be updated via the real-time listener
        } catch (error) {
            console.error("Error toggling like:", error);
            Alert.alert("Error", "Could not update like status. Please try again.");
        }
    };

    const handleShare = async () => {
        if (!news) return;

        const shareMessage = `📢 ${news.title}\n\n${news.postContent}`;

        try {
            await Share.share({
                title: news.title,
                message: shareMessage,
            });
        } catch (error) {
            Alert.alert("Error", "Something went wrong while trying to share.");
            console.error("Share error:", error);
        }
    };


    const handleSendComment = async () => {
        if (!currentUser) {
            router.push('/screens/signin');
            return;
        }

        if (comment.trim()) {
            try {
                await postCommentToDb(id as string, {
                    userId: currentUser.uid,
                    username: currentUser.displayName || 'Anonymous User',
                    comment: comment.trim(),
                    userPhoto: currentUser.photoURL || undefined
                });

                // Clear the input field
                setComment('');

                // No need to manually update comments list as it will be updated via the real-time listener
            } catch (error) {
                console.error("Error posting comment:", error);
                Alert.alert("Error", "Failed to post your comment. Please try again.");
            }
        }
    };

    const handleCommentFocus = () => {
        if (!currentUser) {
            router.push('/screens/signin');
        }
    };

    if (loading || !news) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF3B30" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Back button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                {/* Main Image */}
                <Image
                    source={{ uri: news.imgLink }}
                    style={styles.heroImage}
                    resizeMode="cover"
                />

                {/* Card container */}
                <View style={styles.card}>
                    {/* News title */}
                    <Text style={styles.title}>{news.title}</Text>

                    {/* Engagement metrics */}
                    <View style={styles.metricsContainer}>
                        <View style={styles.leftMetrics}>
                            <View style={styles.likesContainer}>
                                <AntDesign name="like1" size={16} color="#FF3B30" />
                                <Text style={styles.metricText}>{likeCount}</Text>
                            </View>
                        </View>

                        <View style={styles.rightMetrics}>
                            <View style={styles.timeContainer}>
                                <Ionicons name="time-outline" size={16} color="#8E8E93" />
                                <Text style={styles.metricText}>{getPublishedTime(news.date, news.time)}</Text>
                            </View>
                            <View style={styles.commentsContainer}>
                                <Ionicons name="chatbubble-outline" size={16} color="#8E8E93" />
                                <Text style={styles.metricText}>{comments.length}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Gray separator */}
                    <View style={styles.separator} />

                    {/* News content */}
                    <Text style={styles.content}>
                        {news.postContent}
                    </Text>

                    {/* Publication info */}
                    <View style={styles.publicationInfo}>
                        <View style={styles.leftPublicationInfo}>
                            <Image
                                source={{ uri: news.agencyLogoLink }}
                                style={styles.agencyLogo}
                            />
                        </View>

                        <View style={styles.rightPublicationInfo}>
                            <Text style={styles.dateText}>
                                {news?.date
                                    ? new Date(news.date.replace(/\//g, "-"))
                                        .toISOString()
                                        .slice(0, 10)
                                        .replace(/-/g, "/")
                                    : ""}
                            </Text>
                            <Text>{" | "}</Text>
                            <Text style={styles.readTimeText}>{getReadTime(news.postContent)}</Text>
                        </View>
                    </View>

                    {/* Gray separator */}
                    <View style={styles.grayLine} />

                    {/* Interaction buttons */}
                    <View style={styles.interactionBar}>
                        <TouchableOpacity
                            style={styles.interactionButtonLeft}
                            onPress={toggleLike}
                        >
                            <AntDesign
                                name={isLiked ? "like1" : "like2"}
                                size={20}
                                color={isLiked ? "#FF3B30" : "#8E8E93"}
                            />
                            <Text style={[
                                styles.interactionText,
                                isLiked && { color: "#FF3B30" }
                            ]}>Like</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.interactionButtonRight}
                            onPress={handleShare}
                        >
                            <Feather name="share" size={20} color="#8E8E93" />
                            <Text style={styles.interactionText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Gray separator */}
                    <View style={styles.grayLine} />

                    {/* CommentTypes section header */}
                    <View style={styles.commentPrompt}>
                        <FontAwesome name="comment" size={20} color="#FF3B30" />
                        <Text style={styles.commentPromptText}>Your Thoughts!</Text>
                    </View>

                    {/* Comments list */}
                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <View key={item.id} style={styles.commentItem}>
                                <View style={styles.commentHeader}>
                                    <View style={styles.commentUserInfo}>
                                        {item.userPhoto ? (
                                            <Image source={{ uri: item.userPhoto }} style={styles.commentAvatar} />
                                        ) : (
                                            <View style={styles.commentAvatarPlaceholder}>
                                                <AntDesign name="user" size={14} color="#FFFFFF" />
                                            </View>
                                        )}
                                        <Text style={styles.commentUsername}>{item.username}</Text>
                                    </View>
                                    <Text style={styles.commentTime}>
                                        {item.timestamp && typeof item.timestamp.toDate === 'function'
                                            ? new Date(item.timestamp.toDate()).toLocaleString()
                                            : 'Just now'}
                                    </Text>
                                </View>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noCommentsText}>Be the first to comment!</Text>
                    )}
                </View>
            </ScrollView>

            <View style={styles.commentInputContainer}>
                <View style={styles.userIconContainer}>
                    <AntDesign name="user" size={20} color="#FFFFFF" />
                </View>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={setComment}
                    onFocus={handleCommentFocus}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        comment.trim() ? styles.activeSendButton : styles.inactiveSendButton
                    ]}
                    onPress={handleSendComment}
                    disabled={!comment.trim() || !currentUser}
                >
                    <MaterialCommunityIcons
                        name="send-circle"
                        size={28}
                        color={(comment.trim() && currentUser) ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)"}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 250,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 16,
        marginTop: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
        paddingBottom: 8,
    },
    metricsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftMetrics: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightMetrics: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    commentsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metricText: {
        marginLeft: 4,
        color: '#8E8E93',
        fontSize: 14,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    publicationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    leftPublicationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightPublicationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agencyLogo: {
        height: 16,
        width: 36,
    },
    dateText: {
        fontSize: 12,
        color: colors.primary,
    },
    readTimeText: {
        fontSize: 12,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5EA',
        width: '100%',
        marginTop: 4,
    },
    grayLine: {
        height: 1,
        backgroundColor: '#E5E5EA',
        width: '100%',
    },
    interactionBar: {
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    interactionButtonLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    interactionButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    interactionText: {
        marginLeft: 6,
        color: '#8E8E93',
        fontSize: 14,
    },
    commentPrompt: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentPromptText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    commentInputContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#FF3B30',
        alignItems: 'center',
    },
    userIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        height: 36,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    sendButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderRadius: 20,
    },
    activeSendButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    inactiveSendButton: {
        backgroundColor: 'transparent',
    },
    commentItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    commentUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    commentAvatarPlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#8E8E93',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    commentUsername: {
        fontWeight: '500',
        fontSize: 14,
        color: '#333',
    },
    commentTime: {
        fontSize: 12,
        color: '#8E8E93',
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
    noCommentsText: {
        padding: 16,
        textAlign: 'center',
        color: '#8E8E93',
        fontStyle: 'italic',
    },
});

export default NewsDetailScreen;