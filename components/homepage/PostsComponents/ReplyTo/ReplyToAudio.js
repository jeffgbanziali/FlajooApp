import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useContext } from "react";
import {
    formatPostDate,
} from "../../../Context/Utils";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ReplyToText = ({ comment, reply, toggle, replierImage, toReplying, index }) => {
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





    const replying = (reply) => {
        toReplying(reply);
    };

    return (
        <View
            key={index}
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
                                    fontSize: 14,
                                    color: isDarkMode ? "#F5F5F5" : "black"
                                }}
                            >
                                {reply.replierPseudo}
                            </Text>
                            <MaterialIcons
                                name="arrow-right"
                                size={25}
                                color={isDarkMode ? "#F5F5F5" : "black"} />
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    color: isDarkMode ? "#F5F5F5" : "black"
                                }}
                            >
                                {reply.repliedTo.replierToPseudo}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                maxHeight: 300,
                                maxWidth: 340,
                                minHeight: 30,
                                minWidth: 200,
                                borderRadius: 15,
                                marginTop: "1%",
                                shadowColor: isDarkMode ? "white" : "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: isDarkMode ? 1 : 1
                                },
                                shadowOpacity: isDarkMode ? 0.16 : 0.2,
                                shadowRadius: 3.84,
                                elevation: 2
                            }}
                        >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    fontSize: 18,
                                    fontFamily: "",
                                    fontWeight: "400",
                                    lineHeight: 22
                                }}
                            >
                                {reply.text}
                            </Text>
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
                        onPress={() => replying(reply)}
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

export default ReplyToText