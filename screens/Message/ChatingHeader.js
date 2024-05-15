import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    Modal,
    Image,
    Dimensions,
    Alert,
    FlatList,
    Animated
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import { UidContext, useDarkMode } from "../../components/Context/AppContext"
import { useTranslation } from "react-i18next";
import { fetchConversations } from "../../actions/conversation.action";
import { useDispatch } from "react-redux";



const ChatingHeader = ({ user, renderLimitedMessage }) => {
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);
    const { isDarkMode, usersOnline } = useDarkMode();
    const { t } = useTranslation();
    const [loadStories, setLoadStories] = useState(true);

    const dispatch = useDispatch();

    const { uid } = useContext(UidContext);


    useEffect(() => {
        if (loadStories) {
            dispatch(fetchConversations(uid));
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);

    const handleClickReturnMessageList = () => {
        console.log("clicked");
        setLoadStories(true);
        navigation.navigate("Messages");
    };



    const handleClickCall = (user) => {
        console.log("Calling")
        navigation.navigate("CallingOn", { user: user })
    };
    const handleClickSettings = (user) => {
        console.log("Calling")
    };

    const handleClickVideoCall = (user) => {
        navigation.navigate("VideoCall", { user: user });
    };



    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "8%",
                //backgroundColor: "blue",

            }}
        >
            <View
                style={{
                    width: "60%",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginLeft: "3.5%",
                    }}
                    onPress={handleClickReturnMessageList}>
                    <AntDesign
                        name="arrowleft"
                        size={25}
                        color={isDarkMode ? "white" : "black"}

                    />
                </TouchableOpacity>

                <Image
                    source={{ uri: user.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        marginLeft: "2%"
                    }}
                />

                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "column",
                        marginLeft: "4%",
                        width: 180,
                        height: "90%",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: isDarkMode ? "#FFFFFF" : "black",
                        }}
                    >
                        {renderLimitedMessage(user.pseudo)}
                    </Text>

                    {
                        usersOnline[0].id === user._id ? (
                            <Text
                                style={{
                                    fontWeight: "normal",
                                    fontSize: 10,
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                }}
                            >
                                {t('Online')}

                            </Text>

                        ) : (
                            <Text
                                style={{
                                    fontWeight: "normal",
                                    fontSize: 10,
                                    marginTop: 2,
                                    color: isDarkMode ? "#F5F5F5" : "gray",
                                }}
                            >
                                {t('NotOnline')}

                            </Text>
                        )
                    }
                </View>


            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    //backgroundColor: "green",
                    width: "40%",
                    justifyContent: "space-around",
                    marginRight: "2%",
                }}>

                <TouchableOpacity
                    onPress={() => handleClickCall(user)}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}

                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginTop: "1.5%",
                    }}
                >
                    <Ionicons
                        name="call"
                        size={25}
                        color={isDarkMode ? "#F5F5F5" : "black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleClickVideoCall(user)}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                    }}
                >
                    <Ionicons
                        name="videocam"
                        size={25}
                        color={isDarkMode ? "#F5F5F5" : "black"}

                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClickSettings}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                    }}
                >
                    <Entypo
                        name="dots-three-vertical"
                        size={22}
                        color={isDarkMode ? "#F5F5F5" : "black"} />

                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ChatingHeader