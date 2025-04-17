
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import {auth} from "../config/firebaseConfig";



// Signup
export const signup = async (email: string, password: string, username?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);
};

// Login
export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await user.reload();

    if (!user.emailVerified) {
        throw new Error("Please verify your email before logging in.");
    }
};

// Logout
export const logout = async () => {
    await signOut(auth);
};
