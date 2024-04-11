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
import { KeyboardAvoidingView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios";
import MessagesUser from "../../components/MessagesUser/MessagesUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";

const ChatSending = ({ newChat, setNewChat, handleSelect, handleSendMessage }) => {

    const [isTyping, setIsTyping] = useState(false);
    const [height, setHeight] = useState(40);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const handleInputChange = (text) => {
        setNewChat(text);
        setIsTyping(text.length > 0);
    };

    const handleSendVoice = () => {
        console.warn("recording");
    };



    return (
        <View
            style={{
                position: "relative",

                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 5,
                // backgroundColor: "red"
            }}
        >

            <View
                style={{
                    width: "85%",
                    height: Math.max(40, height),
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: isDarkMode ? "#343434" : "#F7F4F4",
                    borderRadius: 30,
                    padding: 10
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <AntDesign name="smile-circle" size={24} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                </TouchableOpacity>

                <TextInput
                    value={newChat}
                    onChangeText={handleInputChange}
                    onContentSizeChange={(e) =>
                        setHeight(e.nativeEvent.contentSize.height)
                    }
                    style={{

                        width: "65%",
                        borderColor: isDarkMode ? "#343434" : "#F7F4F4",
                        borderWidth: 2,
                        marginLeft: "2%",
                        color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                        textAlignVertical: 'center',
                        height: Math.max(40, height),
                        //paddingTop: 8,
                    }}
                    placeholder={t("Message")}
                    placeholderTextColor={isDarkMode ? "lightgray" : "gray"}
                    backgroundColor={isDarkMode ? "#343434" : "#F7F4F4"}
                    fontSize={20}
                    multiline={true} // Permet à l'utilisateur de saisir sur plusieurs lignes
                    numberOfLines={4}
                />
                <View
                    style={{
                        width: "25%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <TouchableOpacity
                        onPress={handleSelect}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <FontAwesome name="paperclip" size={25} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <FontAwesome name="camera" size={22} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                    </TouchableOpacity>
                </View>
            </View>


            {!isTyping ? (

                <Pressable
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginLeft: "2%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                    }}
                    onPress={handleSendVoice}
                >
                    <MaterialCommunityIcons
                        name="microphone"
                        size={24}
                        color="#FFFFFF"
                    />
                </Pressable>
            ) : (
                <Pressable
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginLeft: "2%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                    }}
                    onPress={handleSendMessage}
                >
                    <MaterialIcons
                        name="send"
                        size={24}
                        color="#FFFFFF"
                    />
                </Pressable>
            )
            }

        </View>
    )
}

export default ChatSending