import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useContext } from "react";
import {
    formatPostDate,
} from "../../../Context/Utils";
import Feather from 'react-native-vector-icons/Feather';
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ReplyAudio = ({ comment, reply, toggle, replierImage, toReplying }) => {
    const { uid } = useContext(UidContext);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();



    const goProfil = (id) => {
        if (uid === id) {
            console.log("go to my profil", id);
            navigation.navigate("Profile", { id });
        } else {
            navigation.navigate("ProfilFriends", { id });
            console.log("go to profile friends", id);
        }
        toggle()
    };





    const replying = (comment, reply) => {
        toReplying(comment, reply);

        console.log("tu es là ", comment)
        console.log("tu es là là là là  ", reply)
    };


    return (
        <View
            style={{
                flexDirection: "column",
                width: "100%",
                marginTop: "2%",
            }}
        >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        width: "85%",
                        flexDirection: "row"
                    }}
                >
                    <Pressable
                        onPress={() => goProfil(reply.replierId)}
                        style={{
                            width: 45,
                            height: 45,
                        }}
                    >

                        <Image
                            source={{
                                uri: replierImage
                            }}
                            onError={(error) => console.error('Erreur de chargement de l\'image', error)}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                            }}
                            alt="commenter-pic"
                        />

                    </Pressable>
                    <View
                        style={{
                            width: "100%",
                            marginLeft: "4%"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "80%"
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    marginRight: 5,
                                    fontSize: 14,
                                    color: isDarkMode ? "#F5F5F5" : "black"
                                }}
                            >
                                {reply.replierPseudo}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "normal",
                                    marginRight: 5,
                                    color: isDarkMode ? "#F5F5F5" : "black"
                                }}
                            >
                                {formatPostDate(reply.timestamp)}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                maxHeight: 200,
                                maxWidth: 200,
                                minHeight: 30,
                                minWidth: 200,
                                //backgroundColor: isDarkMode ? "#3C3C3C" : "#F3F3F3",
                                borderRadius: 10,
                                marginTop: "2%",
                                //padding: 10,
                                shadowColor: isDarkMode ? "white " : "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: isDarkMode ? 1 : 1,
                                },
                                shadowOpacity: isDarkMode ? 0.16 : 0.2,
                                shadowRadius: 3.84,
                                elevation: 2,
                            }}
                        >
                            <Image
                                source={{
                                    uri: reply.replyMedia
                                }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain"
                                }}

                            />

                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    width: "100%",
                    height: 30,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <View
                    style={{
                        width: "44%",
                        height: "100%",
                        marginLeft: "3%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={() => replying(comment, reply)}
                        style={{
                            justifyContent: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "gray"
                            }}
                        >
                            {t("Reply")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginRight: 10
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Feather
                            name="heart"
                            size={20}
                            color={isDarkMode ? "#F5F5F5" : "black"}
                        />
                    </TouchableOpacity>
                    {comment.replies.replierLikers && comment.replies.replierLikers.length > 0 && (
                        <Text
                            style={{
                                fontWeight: "normal",
                                color: isDarkMode ? "#F5F5F5" : "black",
                                marginTop: "2%",
                            }}>
                            {comment.replies.replierLikers.length}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    )
}

export default ReplyAudio