import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ onProfilePress, showHeader }: { onProfilePress: () => void, showHeader: boolean }) => {
    if (!showHeader) return null;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>IslandInsight</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
                <View style={styles.profileIcon}></View>
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
        marginLeft: 12
    },
    profileButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
});

export default Header;
