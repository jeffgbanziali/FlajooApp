import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from '../../components/Context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import ContinueWithGoogle from './ContinueWithGoogle';
import ContinueWithFacebook from './ContinueWithFacebook';
import Loading from '../../components/Loading/Loading';
import ContinueWithEmail from './ContinueWithEmail';
import AuthenticateWithApple from './AuthenticateWithApple';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function StartPage() {

    const { isDarkMode } = useDarkMode();
    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const goEmailSignUp = () => {
        navigation.navigate("Signup")
    }




    const goSignIn = () => {
        navigation.navigate("Signin")
    }


    const containWidthSize = windowWidth * 0.8;
    const containHeightSize = windowHeight * 0.062;

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

                            <Text style={{ color: "white", fontSize: 40, }}>{t('Welcome')}</Text>


                            <View
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    //backgroundColor: "black"
                                }}
                            >
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 100,
                                    }}
                                    source={isDarkMode ? require("../../assets/Logos/1.png") : require("../../assets/Logos/1.png")}
                                />
                            </View>
                            <Text style={{ color: "white", marginTop: "4%", fontSize: 40 }}>{t('LetStart')}</Text>

                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            //backgroundColor: "red",
                            width: "100%",
                            height: Platform.OS === "ios" ? "42%" : "35%",
                            marginTop: "2%",
                            justifyContent: "space-evenly",
                        }}>
                            <ContinueWithEmail />


                            <ContinueWithFacebook />


                            <ContinueWithGoogle
                            />
                            <AuthenticateWithApple />



                        </View>


                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: "100%",
                                height: "10%",
                                marginTop: "2%",
                                //backgroundColor: "blue",


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
                                    borderRadius: 20,
                                    marginTop: "4%"
                                }}>

                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                        fontSize: i18n.language === 'fr' ? 16 : 16,
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
