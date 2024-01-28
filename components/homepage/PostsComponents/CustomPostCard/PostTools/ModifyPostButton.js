import { View, Text, Image, Pressable, Touchable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useDarkMode } from '../../../../Context/AppContext';
import { isEmpty } from '../../../../Context/Utils';
import { useTranslation } from 'react-i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';




const ModifyPostButton = () => {



    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();




    return (

        <View
            style={{
                width: 90,
                height: 90,
                alignItems: "center",
                justifyContent: "space-between",

            }}>
            <View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                    borderWidth: 1,
                    borderColor: isDarkMode ? "gray" : "lightgray",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                <MaterialCommunityIcons
                    name="pencil"
                    size={30}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                />
            </View>
            <Text
                style={{
                    color: isDarkMode ? "#F5F5F5" : "black",
                    fontWeight: "600",
                    fontSize: 16
                }}
            >
                {t("Modify")}
            </Text>

        </View>
    )
}

export default ModifyPostButton