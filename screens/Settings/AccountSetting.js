import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Logout from "../Profile/Logout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Feather from 'react-native-vector-icons/Feather';
//import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const AccountSetting = () => {
    const { isDarkMode } = useDarkMode();
    const navigation = useNavigation();
    const { t } = useTranslation();
    
    const handleClickReturnProfile = () => {
        console.log("clicked home");
        navigation.goBack("Profile");
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',

            }}
        >
            <View
                style={{
                    paddingBottom: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity onPress={() => handleClickReturnProfile()}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 40,
                        color: isDarkMode ? "white" : "black",
                        fontWeight: "bold",
                        marginLeft: 10,
                    }}>
                    {t('AccountSetting')}
                </Text>
            </View>


            {/*News*/}
            <TouchableOpacity
                //onPress={handleAccount}

                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <AntDesign
                        name="profile"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('UserInformation')}
                    </Text>
                </View>
            </TouchableOpacity>


            {/*Activityt me*/}
            <TouchableOpacity
                //onPress={handleClickAppli}

                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="activity"
                        size={30}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: i18next.language === 'fr' ? 8 : 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: i18next.language === 'fr' ? 18 : 16,
                        }}
                    >
                        {t('AccountActivity')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Contact me*/}
            <TouchableOpacity
                //onPress={handleClickAppli}

                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-search-outline"
                        size={30}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: i18next.language === 'fr' ? 8 : 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: i18next.language === 'fr' ? 18 : 16,
                        }}
                    >
                        {t('UserResearchByOther')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Posts */}
            <TouchableOpacity
                //onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="newspaper"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('Post')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Stories */}
            <TouchableOpacity
                //onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="book-open"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('Stories')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Réels */}
            <TouchableOpacity
                //onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="video"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('Réels')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Followers et contenu public */}
            <TouchableOpacity
                // onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="plus-box-multiple-outline"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('FollowersAndPublic')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Identification Profil */}
            <TouchableOpacity
                // onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FontAwesome5
                        name="pushed"
                        size={24}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('identificationProfile')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Lock profile*/}
            <TouchableOpacity
                // onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-lock-outline"
                        size={28}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('Lock')}
                    </Text>
                </View>
            </TouchableOpacity>

            {/*Online status */}
            <TouchableOpacity
                // onPress={handleEditProfil}
                style={{
                    marginTop: 12,
                    width: "98%",
                    height: "6%",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="account-eye-outline"
                        size={28}
                        color={isDarkMode ? "white" : "black"}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        {t('OnlineStatus')}
                    </Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default AccountSetting