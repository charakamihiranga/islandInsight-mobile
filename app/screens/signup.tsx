import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from '@expo/vector-icons';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>Island Insight</Text>
                <Text style={styles.createAccountText}>Create account</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.headline}>Join Island Insights today!</Text>
                <Text style={styles.subHeadline}>
                    Stay informed, share your voice, and connect with a community that cares.
                </Text>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <MaterialIcons
                                name={showPassword ? "visibility" : "visibility-off"}
                                size={24}
                                color="#E91B23"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm password"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <MaterialIcons
                                name={showConfirmPassword ? "visibility" : "visibility-off"}
                                size={24}
                                color="#E91B23"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <View style={styles.continueWithContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.continueWithText}>or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <View style={styles.googleButtonContent}>
                            <Image
                                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleButtonText}>Sign with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#E91B23',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 30,
    },
    logoText: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Pacifico-Regular',
        fontWeight: '500',
        marginBottom: 8,
    },
    createAccountText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    headline: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 8,
    },
    subHeadline: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 30,
        lineHeight: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        padding: 15,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
    },
    passwordContainer: {
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        marginBottom: 15,
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        fontFamily: 'Poppins-Regular',
    },
    eyeIcon: {
        padding: 10,
        marginRight: 5,
    },
    signUpButton: {
        backgroundColor: '#E91B23',
        borderRadius: 30,
        padding: 18,
        alignItems: 'center',
        marginTop: 5,
    },
    signUpButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
    },
    continueWithContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        justifyContent: 'center',
    },
    divider: {
        flex: 1,
        height: 1.5,
        backgroundColor: 'gray',
    },
    continueWithText: {
        paddingHorizontal: 10,
        color: '#555',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    googleButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        padding: 12,
        alignItems: 'center',
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Signup;