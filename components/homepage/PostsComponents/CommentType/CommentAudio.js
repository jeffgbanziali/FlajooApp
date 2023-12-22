import { View, Text, Image, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dateParser,
    formatPostDate,
    isEmpty,
    timestampParser,
} from "../../../Context/Utils";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { getPosts } from "../../../../actions/post.actions";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ReplyText from "../ReplyType/ReplyText";
import ReplyGif from "../ReplyType/ReplyGif";
import ReplyImage from "../ReplyType/ReplyImage";
import ReplyAudio from "../ReplyType/ReplyAudio";
import ReplyToText from "../ReplyTo/ReplyToText";
import ReplyToGif from "../ReplyTo/ReplyToGif";
import ReplyToImage from "../ReplyTo/ReplyToImage";
import ReplyToAudio from "../ReplyTo/ReplyToAudio";

const CommentAudio = ({ comment, toggle, toAnswering, toReplying }) => {
    const { isDarkMode } = useDarkMode();
    const usersData = useSelector((state) => state.usersReducer);
    const [loadPost, setLoadPost] = useState(true);
    const [toAnswer, setToAnswer] = useState()
    const { uid } = useContext(UidContext);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const { t } = useTranslation();


    const resetToAnswer = () => {
        setToAnswer(null);
    };

    const handleReply = (commentId,) => {
        toAnswering(commentId);
    };


    const replying = (reply) => {
        toReplying(reply);
    };




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




    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);


    return (
        <View
            style={{
                flexDirection: "column",
                width: "100%",
                marginTop: "3%",
                //backgroundColor:"blue"
            }}
        >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "3%",
                }}
            >
                <View
                    style={{
                        width: "85%",
                        flexDirection: "row",
                    }}>

                    <Pressable
                        onPress={() => goProfil(comment.commenterId)}
                        style={{
                            width: 45,
                            height: 45,
                        }}
                    >
                        <Image
                            source={{
                                uri:
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user._id === comment.commenterId)
                                                return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                            else return null;
                                        })
                                        .join("")
                            }}
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
                            marginLeft: "4%",

                        }}>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "80%",
                                //backgroundColor: isDarkMode ? "#3C3C3C" : "#F3F3F3",
                                //padding: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    marginRight: 5,
                                    fontSize: 14,
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                }}
                            >
                                {comment.commenterPseudo}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "normal",
                                    marginRight: 5,
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                }}
                            >
                                {formatPostDate(comment.timestamp)}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                maxHeight: 300,
                                maxWidth: 340,
                                minHeight: 30,
                                minWidth: 200,
                                //backgroundColor: isDarkMode ? "#3C3C3C" : "#F3F3F3",
                                borderRadius: 15,
                                marginTop: "1%",
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
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    fontSize: 18,
                                    fontFamily: '',
                                    fontWeight: "400",
                                    lineHeight: 22
                                }}
                            >
                                {comment.text}
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
                    justifyContent: "space-between",
                    //backgroundColor:"blue"
                }}
            >
                <View
                    style={{
                        width: "44%",
                        height: "100%",
                        marginLeft: "3%",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                    <TouchableOpacity
                        onPress={() => handleReply(comment)

                        }
                        style={{
                            justifyContent: "center",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "gray",
                            }}>
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
                            justifyContent: "center",
                        }}
                    >
                        <Feather
                            name="heart"
                            size={20}
                            color={isDarkMode ? "#F5F5F5" : "black"}

                        />
                    </TouchableOpacity>
                    {comment.commentLikers && comment.commentLikers.length > 0 && (
                        <Text
                            style={{
                                fontWeight: "normal",
                                color: isDarkMode ? "#F5F5F5" : "black",
                                marginTop: "2%",
                            }}>
                            {comment.commentLikers.length}
                        </Text>
                    )}

                </View>
            </View>

            {toAnswer !== comment._id && comment.replies && comment.replies.length > 0 && (
                <View
                    style={{
                        width: "100%",
                        height: 30,
                        flexDirection: "row",
                        //backgroundColor: "blue",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "44%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setToAnswer(comment._id, !toAnswer)}
                            style={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "gray",
                                }}
                            >
                                {t("Getting")} {comment.replies.length} {t("Response")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {
                toAnswer === comment._id && comment.replies && comment.replies.length > 0 && (
                    <View
                        style={{
                            width: "100%",
                            alignItems: "flex-end",
                            // backgroundColor:"red"
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                // backgroundColor:"green"
                            }}
                        >
                            {comment.replies.map((reply, index) => {
                                const replier = usersData.find((user) => user._id === reply.replierId);
                                const replierImage = replier ? replier.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png";

                                return (

                                    <>
                                        {!reply.repliedTo && reply.replyMedia && (

                                            <>
                                                {reply.replyType === "gif" && (
                                                    <ReplyGif index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                                {reply.replyType === "image" && (
                                                    <ReplyImage index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                                {reply.replyType === "audio" && (
                                                    <ReplyAudio index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                            </>
                                        )
                                        }
                                        {!reply.repliedTo && reply.text && (

                                            <ReplyText index={index} comment={comment} reply={reply} replierImage={replierImage} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />

                                        )
                                        }
                                        {reply.repliedTo && reply.text && (
                                            <ReplyToText index={index} comment={comment} reply={reply} replierImage={replierImage} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                        )
                                        }

                                        {reply.repliedTo && reply.replyMedia && (

                                            <>
                                                {reply.replyType === "gif" && (
                                                    <ReplyToGif index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                                {reply.replyType === "image" && (
                                                    <ReplyToImage index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                                {reply.replyType === "audio" && (
                                                    <ReplyToAudio index={index} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                )}
                                            </>
                                        )
                                        }
                                    </>

                                )

                            }

                            )}
                        </View>
                    </View>
                )
            }

            {toAnswer === comment._id && (
                <View
                    style={{
                        width: "100%",
                        height: 30,
                        flexDirection: "row",
                        //backgroundColor: "blue",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            width: "44%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={resetToAnswer}
                            style={{
                                justifyContent: "center",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "gray",
                                }}>
                                {t("ToMasker")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

export default CommentAudio;