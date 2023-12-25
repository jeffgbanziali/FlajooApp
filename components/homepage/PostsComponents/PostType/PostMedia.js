import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext, } from "react";
import { useSelector } from "react-redux";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LikeButton from "../LikeButton";
import { useNavigation } from "@react-navigation/native";
import { isEmpty, formatPostDate } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';


const PostMedia = ({ post, item, toggleToolings, toggleComments }) => {
    const usersData = useSelector((state) => state.usersReducer);

    const navigation = useNavigation();
    const { uid } = useContext(UidContext);
    const { isDarkMode } = useDarkMode();

    const goProfil = (id) => {
        if (uid === id) {
            navigation.navigate("Profile", { id });
        } else {
            navigation.navigate("ProfilFriends", { id });
        }
    };




    return (
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
        >

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative ",
                    zIndex: 1,
                    marginBottom: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        alignSelf: "center",
                    }}
                >
                    <TouchableOpacity onPress={() => goProfil(post.posterId)}>
                        <Image
                            source={{
                                uri:
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user._id === post.posterId) {
                                                return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                            }
                                            else
                                                return null;
                                        })
                                        .join(""),
                            }}
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 30,
                                marginTop: 10,
                                marginLeft: 30,
                                resizeMode: "cover",
                                zIndex: 1,
                            }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "column",
                            marginLeft: 6,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    color: isDarkMode ? "white" : "white",
                                    marginLeft: 5,
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                {!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                        else return null;
                                    })}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 10,
                                marginLeft: 5,
                                marginTop: 4,
                                fontWeight: "400",
                                fontSize: 12,
                                lineHeight: 12,
                            }}
                        >
                            {formatPostDate(post.createdAt)}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={toggleToolings}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="more-horizontal"
                        size={25}
                        color="white"

                    />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    width: "100%",
                    height: 500,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={[isDarkMode ? "black" : "#4F4F4F", "transparent"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        height: 100,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                />
                {
                    item.mediaType === "image" && (
                        <Image
                            source={{
                                uri: item.mediaUrl,
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 20,
                                opacity: isDarkMode ? 0.7 : 1,
                            }}
                        />
                    )
                }
                {
                    item.mediaType === "video" && (


                        <Video
                            source={{
                                uri: item.mediaUrl,
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            isLooping
                            paused={true}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 20,
                                opacity: isDarkMode ? 0.7 : 1,
                            }}
                        />
                    )
                }

                <LinearGradient
                    colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 200,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    marginVertical: 10,
                    bottom: "5%",
                    width: "100%",
                    //backgroundColor: "red"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "26%",
                        }}
                    >
                        <LikeButton post={post} type={"postPicture"} />
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "normal",
                            }}
                        >
                            {post.likers.length}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "26%",
                        }}
                    >
                        <TouchableOpacity onPress={toggleComments}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <FontAwesome5
                                    name="comment"
                                    size={25}
                                    color="white"

                                />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: "normal",
                            }}
                        >
                            {post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)}
                        </Text>
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
                            name="send"
                            size={25}
                            color="white"

                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Feather
                        name="bookmark"
                        size={25}
                        color="white"

                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostMedia