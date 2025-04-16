import { User } from "firebase/auth";

export interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, username?: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}
