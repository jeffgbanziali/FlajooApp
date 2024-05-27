import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
    Easing,
    Animated,
} from "react-native";
import { useSelector } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";






const ProfilsStatements = () => {
    const [showExperience, setShowExperience] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const navigation = useNavigation();
    const { isDarkMode, isConnected } = useDarkMode();
    const { t } = useTranslation();
    const { uid } = useContext(UidContext)


    const handleClickReturnHome = () => {
        console.log("clicked");
        navigation.navigate("TabNavigation");
    };
    const handleClickSettings = () => {
        console.log("clicked");
        navigation.navigate("Settings");
    };

    const isUserOnline = userData.onlineStatus === true

    const MAX_MESSAGE_LENGTH = 180;
    const renderLimitedMessage = (message) => {
        if (message && message.length <= MAX_MESSAGE_LENGTH) {
            return message;
        } else if (message) {
            return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
        } else {
            return "";
        }
    };



    const showModal = () => {
        navigation.navigate('Education')
    };


    const showExperienceModal = () => {
        navigation.navigate('Experience')

    }


    return (
        <>
            <View
                style={{
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    borderRadius: 30,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        //backgroundColor: "red",
                        paddingTop: "1.5%",
                    }}
                >
                    <TouchableOpacity
                        onPress={handleClickReturnHome}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                            marginLeft: "3.5%",
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={25}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleClickSettings}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                            marginRight: "3.5%",
                        }}
                    >
                        <Entypo
                            name="dots-three-horizontal"
                            size={20}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor: "red"
                    }}
                >
                    <Pressable
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 100,
                        }}>
                        <Image
                            source={{
                                uri: userData?.picture
                                    ? userData.picture
                                    : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                            }}
                        />


                        {isUserOnline ? (
                            <View
                                style={{
                                    backgroundColor: "#09C03C",
                                    position: "absolute",
                                    left: 105,
                                    top: 82,
                                    bottom: 50,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 100,
                                }}
                            ></View>
                        ) : (
                            <View
                                style={{
                                    backgroundColor: "gray",
                                    position: "absolute",
                                    left: 105,
                                    top: 82,
                                    bottom: 50,
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 100,
                                }}
                            >
                                <View style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 100,

                                }}>
                                    <Entypo
                                        name="cross"
                                        size={14}
                                        color={"black"}
                                    />
                                </View>

                            </View>
                        )}



                    </Pressable>

                </View>

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        //height: "10%",
                        //backgroundColor: "red",
                        marginTop: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "justify",
                            fontWeight: "500",
                            color: isDarkMode ? "white" : "black",
                        }}
                    >
                        {userData.pseudo}
                    </Text>

                </View>

                <View
                    style={{
                        alignItems: "center",
                        width: "60%",
                        maxHeight: 200,
                        // backgroundColor: "black",
                        marginTop: 10
                    }}>
                    <Text
                        style={{
                            fontSize: 12,
                            textAlign: "left",
                            color: "#5F5858",
                            fontWeight: "500",
                        }}
                    >
                        {renderLimitedMessage(userData.bio)}
                    </Text>
                </View>

                <View

                    style={{
                        alignItems: "center",
                        width: "40%",
                        height: 60,
                        marginTop: 10,
                        //backgroundColor: "blue",
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }}>
                    <TouchableOpacity
                        onPress={showModal}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                        }}>
                        <Ionicons
                            name="school-outline"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={showExperienceModal}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                        }}>
                        <MaterialIcons
                            name="work-outline"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                        }}>
                        <MaterialCommunityIcons
                            name="brain"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </View>

                </View>
            </View>




        </>

    )
}

export default ProfilsStatements