import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Feather from "react-native-vector-icons/Feather";

import { UidContext, useDarkMode } from '../../../Context/AppContext';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../../Context/Utils';
import LikeButton from '../LikeButton/LikeButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PostFooter = ({ post, toggleComments, toggleSending }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const { t } = useTranslation();


    const { isDarkMode } = useDarkMode();




    console.log("mes partages", post.shares.length)
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    //backgroundColor: "blue",
                    width: "100%",
                    height: 30,
                    paddingLeft: 8,

                }}>
                <View
                    style={{
                        flexDirection: "row",
                        // backgroundColor: "red",
                        alignItems: "flex-end",
                        flexDirection: "row",
                        height: "100%",
                    }}
                >

                    {post.likers && post.likers.length > 0 && (
                        post.likers.length === 1 ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}>
                                <View
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={{ uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.picture }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 30
                                        }}
                                    />

                                </View>

                                <Text
                                    style={{
                                        color: isDarkMode ? "gray" : "gray",
                                        paddingLeft: 10,
                                        fontSize: 12,
                                        fontWeight: "500",
                                    }}>
                                    {t("LikeThat")} {""}
                                    <Text
                                        style={{
                                            color: isDarkMode ? "gray" : "black",
                                            paddingLeft: 10,
                                            fontSize: 12,
                                            fontWeight: "600"
                                        }}
                                    >
                                        {!isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.pseudo}

                                    </Text>
                                </Text>
                            </View>


                        ) : (
                            <View
                                style={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}>

                                <View
                                    style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={{ uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.picture }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 30
                                        }}
                                    />

                                </View>

                                <View
                                    style={{
                                        alignItems: "center",
                                    }}>
                                    <Text
                                        style={{
                                            paddingLeft: 10,
                                            fontSize: 12,
                                            color: isDarkMode ? "gray" : "gray",
                                            fontWeight: "500",
                                        }}>
                                        {t("LikeThat")} {""}
                                        <Text
                                            style={{
                                                color: isDarkMode ? "gray" : "black",
                                                paddingLeft: 8,
                                                fontSize: 12,
                                                fontWeight: "600"
                                            }}
                                        >
                                            {!isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.pseudo}
                                        </Text>
                                        {" "}
                                        {t("And")} {post.likers.length - 1} {t("OtherPerso")}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>


            </View>


            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // backgroundColor: "blue",
                    width: "100%",
                    height: 50,
                    paddingLeft: 2,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        //  backgroundColor: "red",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 6,

                        }}
                    >
                        <LikeButton post={post} type={"postPicture"} />

                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 6,

                        }}
                    >
                        <TouchableOpacity onPress={toggleComments}>
                            <View
                                style={{
                                    width: 130,
                                    height: 38,
                                    flexDirection: "row",
                                    borderRadius: 12,

                                    // backgroundColor: "blue",

                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <FontAwesome
                                    name="comments-o"
                                    size={22}
                                    color={isDarkMode ? "gray" : "gray"}

                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "gray" : "gray",
                                        textAlign: "center",
                                        fontSize: 15,
                                        fontWeight: "600",
                                    }}
                                >
                                    Commenter
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 6,
                        }}
                    >
                        <TouchableOpacity
                            onPress={toggleSending}
                            style={{
                                width: 100,
                                height: 38,
                                borderRadius: 12,
                                //  backgroundColor: "blue",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                            }}
                        >
                            <Feather
                                name="send"
                                size={18}
                                color={isDarkMode ? "gray" : "gray"}

                            />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "gray",
                                    textAlign: "center",
                                    fontSize: 15,
                                    fontWeight: "600",
                                }}
                            >
                                Partager
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="bookmark"
                        size={20}
                        color={isDarkMode ? "gray" : "gray"}

                    />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    paddingLeft: 12,
                    height: 34,
                }}>
                <View
                    style={{
                        maxWidth: 180,
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                    <Text
                        style={{
                            color: isDarkMode ? "gray" : "gray",
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: "500",
                        }}
                    >
                        {post.likers.length} J'aime
                    </Text>
                </View>
                <View>

                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginRight: 10,
                }}>
                    <View
                        style={{
                            maxWidth: 180,
                            marginRight: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text
                            style={{
                                color: isDarkMode ? "gray" : "gray",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: "500",
                            }}
                        >

                            {post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)}{" "}Commentaires
                        </Text>
                    </View>
                    <View
                        style={{
                            maxWidth: 180,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text
                            style={{
                                color: isDarkMode ? "gray" : "gray",
                                textAlign: "center",
                                fontSize: 14,
                                fontWeight: "500",
                            }}
                        >
                            {post?.shares.length} Partages
                        </Text>
                    </View>
                </View>


            </View>
        </>
    )
}

export default PostFooter