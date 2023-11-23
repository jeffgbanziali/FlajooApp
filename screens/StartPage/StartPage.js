import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from '../../components/Context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";







function StartPage(props) {


    const { isDarkMode } = useDarkMode();

    const navigation = useNavigation();

    const goEmailSignUp = () => {
        navigation.navigate("Signup")
    }


    const goFacebook = () => {
        console.warn("Facebook")
    }

    const goGoogle = () => {
        console.warn("Google")
    }

    const goSignIn = () => {
        navigation.navigate("Signin")
    }

    return (

        <>

            <LinearGradient
                colors={[isDarkMode ? "black" : "#4F4F4F", "transparent"]}
                style={{
                    flex: 1,
                    height: 500,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                }}
            >
                <SafeAreaView>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: "100%",
                        height: "90%",


                    }}>

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "100%",
                                height: "40%",
                                zIndex: 10,

                            }}
                        >
                            <Text style={{ color: "white", fontSize: 64 }}>Let's Start </Text>
                            <Text style={{ color: "white", fontSize: 64, }}>Welcome </Text>

                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "100%",
                            height: "40%",
                            marginTop: "2%",
                            justifyContent: "space-evenly"
                        }}>
                            <TouchableOpacity
                                onPress={goEmailSignUp}
                                style={{
                                    alignItems: "center",
                                    width: 300,
                                    height: 60,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",

                                }}>

                                <Feather
                                    name="mail"
                                    size={30}
                                    color={isDarkMode ? "#FFFFFF" : "black"}
                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 24,
                                    }}>
                                    Sign up with a email
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goFacebook}
                                style={{
                                    alignItems: "center",
                                    width: 300,
                                    height: 60,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",


                                }}>
                                <MaterialIcons name="facebook" size={40} color="#0332D8" />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 20,
                                    }}>
                                    Continue with facebook
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goGoogle}
                                style={{
                                    alignItems: "center",
                                    width: 300,
                                    height: 60,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",


                                }}>

                                <AntDesign name="google" size={35} color="red" />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 20,
                                    }}>
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "100%",
                                height: "10%",
                                marginTop: "2%"
                            }}
                        >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    fontSize: 18
                                }}> have a account ? </Text>

                            <TouchableOpacity
                                onPress={goSignIn}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 120,
                                    height: 50,
                                    backgroundColor: "red",
                                    borderRadius: 30,
                                    marginTop: "4%"
                                }}>

                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        fontSize: 20,
                                        fontWeight: "600"
                                    }}>Sign in </Text>

                            </TouchableOpacity>
                        </View>

                    </View>


                </SafeAreaView >
            </LinearGradient >

        </>


    );
}

export default StartPage;
