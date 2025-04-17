import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    onSnapshot,
    increment,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import {firestore} from "../config/firebaseConfig";


// Types
export interface LikeUpdateCallback {
    (count: number): void;
}

// Real-time listener for likes
export const getLikeCount = (newsId: string, onUpdate: LikeUpdateCallback) => {
    const newsRef = doc(firestore, "likes", newsId);
    return onSnapshot(newsRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            onUpdate(data.likesCount || 0);
        } else {
            onUpdate(0);
        }
    });
};

// Check if user liked the news
export const checkIfLiked = async (newsId: string, userId: string): Promise<boolean> => {
    const docRef = doc(firestore, "likes", newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return data.likedByUsers?.includes(userId) ?? false;
    }
    return false;
};

// Update likes count and likedByUsers list
export const updateLikesInDb = async (newsId: string, liked: boolean, userId: string) => {
    const newsRef = doc(firestore, "likes", newsId);

    const docSnapshot = await getDoc(newsRef);
    if (!docSnapshot.exists()) {
        await setDoc(newsRef, {
            likesCount: 0,
            likedByUsers: [],
        });
    }

    await updateDoc(newsRef, {
        likesCount: increment(liked ? 1 : -1),
        likedByUsers: liked ? arrayUnion(userId) : arrayRemove(userId),
    });
};
