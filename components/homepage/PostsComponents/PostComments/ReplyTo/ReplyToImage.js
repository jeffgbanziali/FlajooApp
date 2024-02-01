import { View, Text, Image, TouchableOpacity, Pressable,Animated,Easing } from "react-native";
import React, { useContext ,useState} from "react";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UidContext, useDarkMode } from "../../../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import LikeReplyButton from "../../LikeButton/LikeReplyButton";
import Modal from "react-native-modal";
import CommentTools from "../CommentTools/CommentTools";





const ReplyToText = ({ post, comment, reply, toggle, replierImage, toReplying, index }) => {
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


    const [pressComment, setPressComment] = useState(new Animated.Value(0));
    const [pressInComments, setPressInComments] = useState(false);


    const areYouPressComment = () => {
        if (pressInComments) {
            Animated.timing(pressComment, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => setPressInComments(false));
        } else {
            setPressInComments(true);
            Animated.timing(pressComment, {
                toValue: 200,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    };



    const replying = (comment, reply) => {
        toReplying(comment, reply);
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
                        width: "25%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        //backgroundColor: "green"

                    }}
                >
                    <LikeReplyButton post={post} reply={reply} comment={comment} type={"postPicture"} />
                    {reply.replierLikers && reply.replierLikers.length > 0 && (
                        <Text
                            style={{
                                fontWeight: "normal",
                                color: isDarkMode ? "#F5F5F5" : "black",
                                marginTop: "2%",
                            }}>
                            {reply.replierLikers.length}
                        </Text>
                    )}
                </View>
            </View>
            <Modal
                isVisible={pressInComments}
                onBackdropPress={areYouPressComment}
                //transparent={true}
                backdropOpacity={0.5}
                animationIn="pulse"
                animationOut="fadeOut"
                useNativeDriverForBackdrop
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >


                <CommentTools comment={comment} reply={reply} />

            </Modal>
        </View>
    )
}

export default ReplyToText