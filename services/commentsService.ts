import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import {CommentWithId} from "../types/comment-types";



// === Post a new comment ===

export const postCommentToDb = async (newsId: string, comment: {
    userId: string;
    username: string;
    comment: string;
    userPhoto: string | undefined
}) => {
    await addDoc(collection(firestore, "comments"), {
        newsId,
        ...comment,
        timestamp: serverTimestamp(),
        createdAt: Date.now(),
    });
};

// === Real-time listener for comments ===

export const listenToComments = (
    newsId: string,
    onUpdate: (comments: CommentWithId[]) => void
): (() => void) => {
    const commentsQuery = query(
        collection(firestore, "comments"),
        where("newsId", "==", newsId),
        orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const updatedComments: CommentWithId[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<CommentWithId, "id">;
            return {
                ...data,
                id: doc.id,
            };
        });

        onUpdate(updatedComments);
    });

    return unsubscribe;
};
