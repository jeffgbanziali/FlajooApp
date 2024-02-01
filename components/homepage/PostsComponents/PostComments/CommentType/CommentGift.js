import { View, Text, Image, TouchableOpacity, Pressable, Animated, Easing } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    formatPostDate,
    isEmpty,
} from "../../../../Context/Utils";
import Feather from 'react-native-vector-icons/Feather';
import { UidContext, useDarkMode } from "../../../../Context/AppContext";
import { getPosts } from "../../../../../actions/post.actions";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ReplyText from "../ReplyType/ReplyText";
import ReplyGif from "../ReplyType/ReplyGif";
import ReplyImage from "../ReplyType/ReplyImage";
import ReplyVideo from "../ReplyType/ReplyVideo";
import ReplyAudio from "../ReplyType/ReplyAudio";
import ReplyToText from "../ReplyTo/ReplyToText";
import ReplyToGif from "../ReplyTo/ReplyToGif";
import ReplyToImage from "../ReplyTo/ReplyToImage";
import ReplyToVideo from "../ReplyTo/ReplyToVideo";
import ReplyToAudio from "../ReplyTo/ReplyToAudio";
import LikeCommentButton from "../../LikeButton/LikeCommentButton";
import Modal from "react-native-modal";
import CommentTools from "../CommentTools/CommentTools";






const CommentGift = ({areYouPressComment, post, comment, toggle, toAnswering, toReplying }) => {
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
                                    uri: comment.commentMedia
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
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    //backgroundColor: "blue",

                }}
            >
                <View
                    style={{
                        width: "44%",
                        height: "100%",
                        marginLeft: "3%",
                        justifyContent: "center",
                        alignItems: "center",
                        //backgroundColor: "green"

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
                        width: "20%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        //backgroundColor: "green"

                    }}
                >
                    <LikeCommentButton post={post} comment={comment} type={"postPicture"} />
                    {comment.commentLikers && comment.commentLikers.length > 0 && (
                        <Text
                            style={{
                                fontWeight: "normal",
                                color: isDarkMode ? "#F5F5F5" : "black",
                                marginTop: "2%",
                                fontSize: 16
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

                                    <View key={reply._id}>
                                        {!reply.repliedTo && reply.replyMedia && (

                                            <>
                                                {reply.replyType === "gif" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyGif index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "image" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyImage index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "video" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >

                                                        <ReplyVideo index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "audio" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyAudio index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                            </>
                                        )
                                        }
                                        {!reply.repliedTo && reply.text && (
                                            <TouchableOpacity
                                                onLongPress={areYouPressComment}
                                            >
                                                <ReplyText index={index} post={post} comment={comment} reply={reply} replierImage={replierImage} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />

                                            </TouchableOpacity>


                                        )
                                        }
                                        {reply.repliedTo && reply.text && (
                                            <TouchableOpacity
                                                onLongPress={areYouPressComment}
                                            >
                                                <ReplyToText index={index} post={post} comment={comment} reply={reply} replierImage={replierImage} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                            </TouchableOpacity>
                                        )
                                        }

                                        {reply.repliedTo && reply.replyMedia && (

                                            <>
                                                {reply.replyType === "gif" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyToGif index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "image" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyToImage index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "video" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyToVideo index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}
                                                {reply.replyType === "audio" && (
                                                    <TouchableOpacity
                                                        onLongPress={areYouPressComment}
                                                    >
                                                        <ReplyToAudio index={index} post={post} comment={comment} replierImage={replierImage} reply={reply} toAnswering={toAnswering} toggle={toggle} toReplying={toReplying} />
                                                    </TouchableOpacity>
                                                )}

                                            </>
                                        )
                                        }
                                    </View>
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

export default CommentGift;