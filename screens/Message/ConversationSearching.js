import {
    View,
    TextInput
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { isEmpty } from "../../components/Context/Utils";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../actions/conversation.action";

const ConversationSearching = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector((state) => state.usersReducer);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();



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
                justifyContent: "center",
                width: "100%",
                height: 60,
                // backgroundColor: "red"
            }}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode ? "gray" : "#F1F1F1",
                width: "94%",
                height: 40,
                borderRadius: 10
            }}>
                <Ionicons

                    name="search"
                    size={20}
                    color={isDarkMode ? "#F5F5F5" : "gray"} />
                <TextInput
                    style={{
                        //backgroundColor: '#2C2C2C',
                        //backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                        paddingLeft: 10,
                        height: "100%",
                        width: "90%",
                        fontSize: 14,
                        color: 'white',
                    }}
                    fontSize={18}
                    placeholder={t('Research')}
                    //backgroundColor='red'
                    placeholderTextColor={isDarkMode ? "white" : "gray"}
                    onChangeText={setSearchText}
                    value={searchText}
                />
            </View>


        </View>
    )
}

export default ConversationSearching