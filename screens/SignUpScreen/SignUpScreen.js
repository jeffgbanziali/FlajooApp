import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView, Alert, TextInput } from 'react-native';
import { darkBlue, darkRose } from '../../components/Button/Constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';



const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [pseudo, setPseudo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async () => {
        const data = {
            pseudo: pseudo,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            phoneNumber: phoneNumber,
        };
        try {
            const url = 'http://192.168.0.14:4000/api/user/register';


            // Validate the form data
            if (pseudo === '') {
                Alert.alert("Please enter your pseudo");
                return;
            }

            if (firstName === '') {
                Alert.alert("Please enter your first name");
                return;
            }

            if (lastName === '') {
                Alert.alert("Please enter your last name");
                return;
            }

            if (email === '') {
                Alert.alert("Please enter your email");
                return;
            }

            if (!EMAIL_REGEX.test(email)) {
                Alert.alert("Please enter a valid email");
                return;
            }

            if (password === '') {
                Alert.alert("Please enter your password");
                return;
            }

            if (confirmPassword === '') {
                Alert.alert("Please confirm your password");
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
            }

            if (phoneNumber === '') {
                Alert.alert("Please enter your phone number");
                return;
            }

            // Send the data to the server
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Handle the server response
            if (response.status === 201) {
                alert("User created successfully");
                console.log(response);
                navigation.navigate("Signin");
            } else {
                alert("An error ");
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        }
    };

    const showConfirmPassword = () => {
        setShowConfirmPass(!showConfirmPass);
    }
    const showPassword = () => {
        setShowPass(!showPass);
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                backgroundColor: isDarkMode ? "#171717" : "white",
                alignItems: 'center',
                justifyContent: 'center',
                height: "100%"
            }}
        >
            <SafeAreaView
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "100%",
                    width: "100%",
                }}

            >
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{
                        width: "100%",
                        height: 150,
                        padding: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 100

                            }}
                            source={require("../../assets/Logos/ios/1212.png")} />
                    </View>
                    <View
                        style={{
                            overflow: 'hidden',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: "4%"
                        }}
                    >

                        <Text style={{
                            fontSize: 20,
                            color: isDarkMode ? "#FFFFFF" : "black",
                            fontWeight: 'bold',
                            marginVertical: 2,
                            marginBottom: 16
                        }}>
                            {t('CreateAccount')}
                        </Text>
                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('Pseudo')}
                                placeholderTextColor='gray'
                                value={pseudo}
                                onChangeText={(text) => setPseudo(text)}
                                keyboardType='none'
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('FirstName')}
                                placeholderTextColor='gray'
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                keyboardType='none'
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>


                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t("LastName")}
                                placeholderTextColor='gray'
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                keyboardType='none'
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('Email')}
                                placeholderTextColor='gray'
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}

                            />
                        </View >
                        <View
                            style={{
                                height: 48,
                                borderRadius: 10,
                                borderColor: "#2e2e2d",
                                borderWidth: 1,
                                overflow: "hidden",
                                backgroundColor: "white",
                                marginTop: 6,
                                marginBottom: 10,
                                marginLeft: 30,
                                marginRight: 30,
                                justifyContent: "center",
                                paddingLeft: 14,
                                width: 320,
                                flexDirection: "row"
                            }}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('Password')}
                                placeholderTextColor='gray'
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry={!showPass}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <View
                                style={{
                                    width: '15%',
                                    height: 48,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >

                                <Pressable
                                    onPress={showPassword}
                                >
                                    {
                                        showPass ?
                                            <Ionicons name="eye-off" size={22} color="gray" /> :
                                            <Ionicons name="eye" size={22} color="gray" />
                                    }
                                </Pressable>

                            </View>
                        </View>
                        <View
                            style={{
                                height: 48,
                                borderRadius: 10,
                                borderColor: "#2e2e2d",
                                borderWidth: 1,
                                overflow: "hidden",
                                backgroundColor: "white",
                                marginTop: 6,
                                marginBottom: 10,
                                marginLeft: 30,
                                marginRight: 30,
                                justifyContent: "center",
                                paddingLeft: 14,
                                width: 320,
                                flexDirection: "row"
                            }}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('ConfirmPass')}
                                placeholderTextColor='gray'
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={!showConfirmPass}
                            />
                            <View
                                style={{
                                    width: '15%',
                                    height: 48,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >

                                <Pressable
                                    onPress={showConfirmPassword}
                                >
                                    {
                                        showConfirmPass ?
                                            <Ionicons name="eye-off" size={22} color="gray" /> :
                                            <Ionicons name="eye" size={22} color="gray" />
                                    }
                                </Pressable>

                            </View>
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    width: '85%',
                                    height: 48,
                                    fontSize: 16
                                }}
                                placeholder={t('PhoneNumb')}
                                placeholderTextColor='gray'
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text)}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: darkRose,
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 10,
                                width: 120,
                                height: 48,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignSelf: 'center'
                            }}
                            onPress={handleSignUp}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                {t('ButtonRegis')}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={{
                                fontSize: 16,
                                color: isDarkMode ? "#FFFFFF" : "black",
                            }}>{t('HaveAccount')}{" "}
                                <Text
                                    onPress={() => navigation.navigate("Signin")}
                                    style={{
                                        color: isDarkMode ? "#2D75FF" : "#74A0F4",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }}>
                                    {t('ButtonSignin')}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView >

    );
}



const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: darkRose,
        marginBottom: 30,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    input: {
        height: 48,
        borderRadius: 10,
        borderColor: "#2e2e2d",
        borderWidth: 1,
        overflow: "hidden",
        backgroundColor: "white",
        marginTop: 6,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 14,
        width: 320,
    },
    button: {
        backgroundColor: "red",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        width: 120,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },

})

export default SignUpScreen;
