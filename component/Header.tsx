import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from "../context/AuthContext";
import { Feather } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {logout} from "../services/auth-service";

const Header = ({ onProfilePress, showHeader }: { onProfilePress: () => void, showHeader: boolean }) => {
    const { currentUser } = useAuth();
    const [photoURL, setPhotoURL] = useState<string | null>(currentUser?.photoURL || null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    await user.reload();
                    setPhotoURL(user.photoURL || null);
                } catch (err) {
                    console.warn('Failed to refresh user:', err);
                }
            } else {
                setPhotoURL(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleProfilePress = () => {
        if (currentUser) {
            Alert.alert(
                'Logout',
                'Do you want to log out?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Logout',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                await logout();
                            } catch (err) {
                                console.error('Error during sign out:', err);
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } else {
            onProfilePress();
        }
    };

    if (!showHeader) return null;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>IslandInsight</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
                {currentUser ? (
                    photoURL ? (
                        <Image source={{ uri: photoURL }} style={styles.profileImage} />
                    ) : (
                        <Feather name="user" size={26} color="gray" />
                    )
                ) : (
                    <Feather name="help-circle" size={26} color="gray" />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    logoContainer: {
        flex: 1,
    },
    logo: {
        fontSize: 24,
        fontFamily: 'Pacifico-Regular',
        color: 'red',
        marginLeft: 12,
    },
    profileButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        height: 36,
        width: 36,
        borderRadius: 20,
        resizeMode: 'cover',
    },
});

export default Header;
