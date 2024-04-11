import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { isEmpty } from "../../Context/Utils"


const CreateHeader = () => {

    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();


    const handleClickReturnHome = () => {
        navigation.goBack("Messages")
    }

    return (
        <View
            style={{
                width: "100%",
                height: "6%",
                //backgroundColor: "red",
                alignItems: "center",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "gray"

            }}>

            <TouchableOpacity
                onPress={handleClickReturnHome}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    //backgroundColor: "blue",
                }}
            >

                <MaterialIcons
                    name="arrow-back-ios"
                    size={28}
                    color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                />
            </TouchableOpacity>

            <View
                style={{
                    alignItems: "center",
                    width: "80%",
                    height: "100%",
                    //backgroundColor: "blue",
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "500",
                        color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                    }}>
                   {t("NewMessagge")}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: isDarkMode ? "gray" : "gray",
                    }}>
                       {t("ChifferBot")}
                </Text>

            </View>

        </View>
    )
}

export default CreateHeader