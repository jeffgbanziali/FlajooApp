import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from '../../components/Context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const ContinueWithEmail = () => {

    const containWidthSize = windowWidth * 0.8;
    const containHeightSize = windowHeight * 0.062;

    const { isDarkMode } = useDarkMode();
    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const goEmailSignUp = () => {
        navigation.navigate("Signup")
    }
    return (
        <TouchableOpacity
            onPress={goEmailSignUp}
            style={{
                alignItems: "center",
                width: containWidthSize,
                height: containHeightSize,
                backgroundColor: isDarkMode ? "#171717" : "white",
                flexDirection: "row",
                borderRadius: 30,
                paddingLeft: 10,
                borderWidth: 2,
                borderColor: isDarkMode ? "#343232" : "lightgray",
            }}>
            <Feather
                name="mail"
                size={26}
                color={isDarkMode ? "#FFFFFF" : "black"}
            />
            <Text
                style={{
                    color: isDarkMode ? "#F5F5F5" : "black",
                    marginLeft: "2%",
                    fontSize: i18n.language === 'fr' ? 16 : 20
                }}>
                {t('SignWithEmail')}
            </Text>
        </TouchableOpacity>

    )
}

export default ContinueWithEmail