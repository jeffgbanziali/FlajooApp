
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Conversation from "./Conversation";
import ChatOnline from "../../components/MessagesUser/MessageUser/ChatOnline";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import axios from "axios";
import { APP_API_URL } from "../../config";
import { SafeAreaView } from "react-native";
import { isEmpty } from "../../components/Context/Utils";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../actions/conversation.action";

const ConversationHeader = () => {


    const [currentChat, setCurrentChat] = useState(null);


    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const conversations = useSelector(state => state.conversationReducer);
    const [loadStories, setLoadStories] = useState(true);

    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        !isEmpty(usersData)[0] && setIsLoading(false);
    }, [usersData]);


    const { uid } = useContext(UidContext);

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(fetchConversations(uid));
    }, [dispatch, uid]);

    useEffect(() => {
        if (loadStories) {
            dispatch(fetchConversations(uid));
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);

    const handleClickReturnHome = () => {
        setLoadStories(true);
        navigation.navigate("TabNavigation");
    };



    const handleSearch = () => {
        console.warn("Searching");
    };




    const handleCreateNewMessage = () => {
        navigation.navigate("CreateNewConversation")
    };


    const MAX_MESSAGE_LENGTH = 15;
    const renderLimitedMessage = (message) => {
        if (message && message.length <= MAX_MESSAGE_LENGTH) {
            return message;
        } else if (message) {
            return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
        } else {
            return "";
        }
    };

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: "6%",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "40%",

                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginLeft: "3.5%",
                    }}
                >
                    <TouchableOpacity
                        onPress={handleClickReturnHome}>
                        <AntDesign
                            name="arrowleft"
                            size={28}
                            color={isDarkMode ? "#F5F5F5" : "black"}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: "100%",
                        height: "80%",
                        marginLeft: "1.5%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            color: isDarkMode ? "#F5F5F5" : "black",
                        }}
                    >
                        {renderLimitedMessage(userData.pseudo)}
                    </Text>
                </View>
            </View>


            <View
                style={{
                    width: "20%",
                    marginRight: "1%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    //backgroundColor:"red",
                    alignItems: "center",
                }}
            >


                <TouchableOpacity onPress={handleCreateNewMessage}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                    }}
                >
                    <Entypo
                        name="new-message"
                        size={22}
                        color={isDarkMode ? "#F5F5F5" : "black"}
                    />
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default ConversationHeader