import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Animated, Easing,
    Pressable,
    Modal
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from "@react-navigation/native";
import FollowHandler from "../../components/ProfileUtils.js/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../components/Context/Utils";
import SendMessage from "../../components/ProfileUtils.js/SendMessage";
import EducationFriendsModal from "./EducationScreen/EducationFriendsModal";


const FriendsTools = ({ users, areYouPressComment }) => {


    const [showEducation, setShowEducation] = useState(false);

    const navigation = useNavigation();
    const { isDarkMode, isConnected } = useDarkMode();
    const { t } = useTranslation();
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()

    const isUserOnline = users.onlineStatus === true


    const handleClickReturnHome = () => {
        console.log("clicked");
        navigation.goBack("TabNavigation");
    };



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
        setShowEducation(!showEducation);
    };


    return (
        <View
            style={{
                backgroundColor: isDarkMode ? "#171717" : "white",
                borderRadius: 30,
                width: "100%",
                height: "100%",
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
                        marginTop: "1.5%",
                    }}
                >
                    <AntDesign
                        name="arrowleft"
                        size={25}
                        color={isDarkMode ? "white" : "black"}
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={areYouPressComment}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginRight: "3.5%",
                        marginTop: "1.5%",
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
                        marginTop: -20,
                        objectFit: "cover",
                    }}
                >
                    <Image
                        source={{
                            uri: users?.picture ?
                                users.picture :
                                "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,
                            objectFit: "cover",
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

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        //height: "10%",
                        //backgroundColor: "red",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "500",
                            marginTop: 10,
                        }}
                    >
                        {users.pseudo}
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
                        {renderLimitedMessage(users.bio)}
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        //backgroundColor: "blue",
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            marginRight: 4,
                        }}
                    >
                        <FollowHandler idToFollow={users._id} type={"profile"} />
                    </View>
                    <SendMessage users={users} />
                </View>
                <View


                    style={{
                        alignItems: "center",
                        width: "60%",
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
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                        }}>

                    </View>

                </View>


                <Modal
                    visible={showEducation}
                    transparent={true}
                    animationIn="pulse"
                    animationOut="fadeOut"
                    onRequestClose={showModal}
                >
                    <EducationFriendsModal users={users} showModal={showModal} />

                </Modal>
            </View>



            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    //backgroundColor: "green",
                    width: "100%",
                    height: "10%",
                    marginTop: 5
                }}

            >
                {users.followers && users.followers.length > 0 && (
                    users.followers.length === 1 ? (
                        <>

                            {
                                users.followers[0] === userData._id ? (
                                    <>


                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "normal",
                                                color: isDarkMode ? "white" : "black",
                                            }}
                                        >
                                            {t('Followby')}{" "}
                                        </Text>
                                        <Text
                                            style={{
                                                color: isDarkMode ? "gray" : "black",
                                                fontSize: 14,
                                                fontWeight: "normal"
                                            }}
                                        >
                                            {t("You")}

                                        </Text>
                                    </>

                                ) : (
                                    <>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "normal",
                                                color: isDarkMode ? "white" : "black",
                                            }}
                                        >
                                            {t('Followby')}{" "}
                                        </Text>
                                        <Text
                                            style={{
                                                color: isDarkMode ? "gray" : "black",
                                                fontSize: 16,
                                                fontWeight: "normal"
                                            }}
                                        >
                                            {/*t("You")*/}
                                            {!isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.pseudo}

                                        </Text>
                                    </>
                                )
                            }

                        </>
                    ) : users.followers.length > 1 ? (

                        <>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "normal",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                {t('Followby')}
                            </Text>
                            <Image
                                source={{
                                    uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.picture ? !isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                                }}
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 100,
                                    objectFit: "cover",
                                    marginLeft: 8,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    paddingLeft: 8,
                                    fontWeight: "normal",
                                    color: "gray",
                                }}
                            >
                                {!isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.pseudo}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    paddingLeft: 3,
                                    fontWeight: "normal",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                {t("And")} {users.followers.length - 1} {t("OtherPerso")}
                            </Text>
                        </>
                    ) :
                        (
                            <Text
                                style={{
                                    paddingLeft: 10,
                                    color: isDarkMode ? "gray" : "black",
                                    fontSize: 18,
                                    fontWeight: "400",
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                }}
                            >
                                {t("NoFollowAccount")}
                            </Text>
                        )

                )}

            </View>


        </View>
    )
}

export default FriendsTools