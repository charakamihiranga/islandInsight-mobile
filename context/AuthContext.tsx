import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import {auth} from "../config/firebaseConfig";
import * as AuthService from '../services/auth-service';
import {AuthContextType} from "../types/auth-types";


// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await user.reload();
                if (user.emailVerified) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        login: async (email, password) => {
            await AuthService.login(email, password);
            setCurrentUser(auth.currentUser);
        },
        signup: async (email, password, username) => {
            await AuthService.signup(email, password, username);
            setCurrentUser(null); // Wait for verification
        },
        signInWithGoogle: async () => {
            await AuthService.signInWithGoogle();
            setCurrentUser(auth.currentUser);
        },
        logout: async () => {
            await AuthService.logout();
            setCurrentUser(null);
        },
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
    </AuthContext.Provider>
);
};
