import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from '../../components/Context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const FacebookContinue = () => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);



    const goFacebook = async () => {
        setIsLoadingSignIn()
        try {
            console.warn("World")

        } catch {
            console.log("error")
        } finally {
            setTimeout(() => {
                setIsLoadingSignIn(false);
            }, 500);
        }
    };


    return (

        <TouchableOpacity
            onPress={goFacebook}
            style={{
                alignItems: "center",
                width: 60,
                height: 60,
                backgroundColor: isDarkMode ? "#171717" : "white",
                flexDirection: "row",
                borderRadius: 30,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                borderColor: isDarkMode ? "#343232" : "lightgray",
            }}
        >

            <View
                style={{
                    width: 35,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                }} >
                {
                    isLoadingSignIn ?

                        <ActivityIndicator
                            textAlign="center"
                            size={"large"}
                            color={isDarkMode ? "white" : "black"} />
                        :
                        <Image
                            source={{ uri: "https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-2.png" }}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />

                }

            </View>


        </TouchableOpacity >
    );
};


export default FacebookContinue;
