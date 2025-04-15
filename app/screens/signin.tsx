import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import { MaterialIcons } from '@expo/vector-icons';
import {router} from "expo-router";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>Island Insight</Text>
                <Text style={styles.signInText}>Sign In</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.tagline}>Your fastest, most trusted source for News</Text>
                <Text style={styles.subTagLine}>Sign in to stay ahead</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
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

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.signInButton}>
                        <Text style={styles.signInButtonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    {/* Or Create Account with enhanced dividers */}
                    <View style={styles.createAccountContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.createAccountText}>to create account</Text>
                        <View style={styles.divider} />
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton} onPress={() => {
                        router.push('/screens/signup');
                    }}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
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
    signInText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    tagline: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 4,
    },
    subTagLine: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 56,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        padding: 15,
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
    },
    eyeIcon: {
        padding: 10,
        marginRight: 5,
    },
    signInButton: {
        backgroundColor: '#E91B23',
        borderRadius: 30,
        padding: 18,
        alignItems: 'center',
    },
    signInButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
    },
    createAccountContainer: {
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
    createAccountText: {
        paddingHorizontal: 10,
        color: '#555',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    signUpButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        padding: 18,
        alignItems: 'center',
    },
    signUpText: {
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Signin;