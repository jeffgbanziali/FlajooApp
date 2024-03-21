import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from '../../components/Context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';







function StartPage() {

    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

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
                                height: "20%",
                                zIndex: 10,

                            }}
                        >

                            <Text style={{ color: "white", fontSize: 40, }}>{t('Welcome')}</Text>
                            <Text style={{ color: "white", marginTop: "4%", fontSize: 40 }}>{t('LetStart')}</Text>

                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: "100%",
                            height: "40%",
                            marginTop: "2%",
                            justifyContent: "space-evenly",
                        }}>
                            <TouchableOpacity
                                onPress={goEmailSignUp}
                                style={{
                                    alignItems: "center",
                                    width: 350,
                                    height: 50,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",
                                }}>
                                <Feather
                                    name="mail"
                                    size={28}
                                    color={isDarkMode ? "#FFFFFF" : "black"}
                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 24,
                                    }}>
                                    {t('SignWithEmail')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goFacebook}
                                style={{
                                    alignItems: "center",
                                    width: 350,
                                    height: 50,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",
                                }}>
                                <MaterialIcons name="facebook" size={28} color="#0332D8" />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 20,
                                    }}>
                                    {t('Facebook')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goGoogle}
                                style={{
                                    alignItems: "center",
                                    width: 350,
                                    height: 50,
                                    backgroundColor: isDarkMode ? "#171717" : "white",
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    padding: 10,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",
                                }}>

                                <AntDesign name="google" size={28} color="red" />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "2%",
                                        fontSize: 20,
                                    }}>
                                    {t('Google')}
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
                                    color: isDarkMode ? "#FFFFFF" : "black",
                                    fontSize: 18
                                }}> {t('HaveAccount')}
                            </Text>
                            <TouchableOpacity
                                onPress={goSignIn}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 130,
                                    height: 50,
                                    backgroundColor: "#FF1C1C",
                                    borderRadius: 30,
                                    marginTop: "4%"
                                }}>

                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        fontSize: 16,
                                        fontWeight: "600"
                                    }}>{t('ButtonSignin')}</Text>

                            </TouchableOpacity>
                        </View>

                    </View>

                </SafeAreaView >
            </LinearGradient >

        </>


    );
}

export default StartPage;
