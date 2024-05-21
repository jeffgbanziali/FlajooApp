import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
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


const ContinueWithFacebook = () => {
    const { isDarkMode } = useDarkMode();
    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const goFacebook = () => {
        console.warn("Facebook")
    }


    const containWidthSize = windowWidth * 0.8;
    const containHeightSize = windowHeight * 0.062;
    return (
        <TouchableOpacity
            onPress={goFacebook}
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
    )
}

export default ContinueWithFacebook