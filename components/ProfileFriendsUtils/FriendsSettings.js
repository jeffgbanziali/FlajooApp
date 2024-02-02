import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDarkMode } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";






const FriendsSettings = ({ areYouPressComment, users }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const navigation = useNavigation();

    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();


    const goToAbout = (id) => {
        console.log("clicked");
        navigation.navigate("AboutThisAccount", { id });
        areYouPressComment()
    }




    return (
        <>
            <View
                style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 320,
                    height: 370,
                    borderRadius: 30,
                }}
            >



                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 30,
                        backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >






                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 60,
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                            //borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("ToShare")}
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => goToAbout(users._id)}
                        style={{
                            width: "100%",
                            height: 60,
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("ToPoperst")}
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 60,
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("ToShow")}
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 60,
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "red" : "red",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("ToBlock")}
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 60,
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "red" : "red",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("ToRest")}
                        </Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 60,
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "red" : "red",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "500",
                            }}

                        >
                            {t("SignalPub")}
                        </Text>

                    </TouchableOpacity>



                </View>




            </View>

        </>
    );

}

export default FriendsSettings