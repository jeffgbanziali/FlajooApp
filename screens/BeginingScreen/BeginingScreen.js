import { SafeAreaView, View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "react-native-linear-gradient";
import MaterialTopNavigation from '../../navigation/MaterialTopNavigation';
const BeginingScreen = () => {


    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const navigation = useNavigation();


    const skipBegin = () => {
        navigation.navigate("Start")
    }





    return (

        <LinearGradient
            colors={[isDarkMode ? "black" : "#4F4F4F", "transparent"]}
            style={{
                flex: 1,
                height: 500,
                backgroundColor: isDarkMode ? "#171717" : "white",
            }}
        >

            <SafeAreaView
                style={{
                    flex: 1,
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}>


                <View
                    style={{
                        width: "100%",
                        height: "6%",
                        backgroundColor: "blue",
                        alignItems: "flex-end",
                        justifyContent: "center",

                    }}>

                    <TouchableOpacity
                        onPress={skipBegin}
                        style={{
                            width: 100,
                            height: 30,
                            //backgroundColor: "green",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: isDarkMode ? "#FFFFFF" : "black",
                                fontWeight: "300"
                            }}>
                            {t("Skip")}
                        </Text>
                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        width: "100%",
                        height: "94%",
                        //backgroundColor: "gray",
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                    <View
                        style={{
                            width: "100%",
                            height: "40%",
                            //backgroundColor: "green",
                            alignItems: "center",
                            justifyContent: "center",

                        }}>


                    </View>

                </View>


                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: 40,
                        width: 200,
                        height: 50,
                        backgroundColor: "red",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: isDarkMode ? "#FFFFFF" : "black",
                        }}>
                        {t("GetStarted")}
                    </Text>
                </TouchableOpacity>


            </SafeAreaView>
        </LinearGradient >
    )
}

export default BeginingScreen