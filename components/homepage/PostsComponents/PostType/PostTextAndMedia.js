import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext, useState, } from "react";
import { useSelector } from "react-redux";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LikeButton from "../LikeButton/LikeButton"
import { useNavigation } from "@react-navigation/native";
import { isEmpty, formatPostDate } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';


const PostTextAndMedia = ({ post, item, toggleToolings, toggleComments }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const [showImage, setShowImage] = useState(false);



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

    const showModal = () => {
        setShowImage(!showImage);
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
                    position: "absolute ",
                    zIndex: 1,
                    marginBottom: 8,
                    top: "2%",
                    //backgroundColor:"blue"

                }}
            >


                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop:10
                    }}
                >
                    <TouchableOpacity

                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 30,
                            marginLeft: 10,
                            resizeMode: "cover",
                            zIndex: 1,
                        }}
                        onPress={() => goProfil(post.posterId)}>
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
                                width: "100%",
                                height: "100%",
                                borderRadius: 30,
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
                                    fontSize: 14,
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
                        size={20}
                        color="white"

                    />
                </TouchableOpacity>
            </View>

            <Pressable
                onPress={showModal}
                style={{
                    borderColor: "red",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={[isDarkMode ? "black" : "#0F0F0F", "transparent"]}
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
                                borderColor: "red",
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
                    colors={["transparent", isDarkMode ? "black" : "#0F0F0F"]}
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
            </Pressable>

            <Modal
                visible={showImage}
                transparent={true}
                animationIn="pulse"
                animationOut="fadeOut"
                onRequestClose={showModal}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isDarkMode ? "black" : "black",

                    }}>

                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "10%",
                            marginTop: "4%",
                            //backgroundColor: "red",
                            zIndex: 3
                        }}
                    >

                        <Pressable

                            onPress={showModal}

                            style={{
                                width: '100%',
                                height: '100%',
                                //backgroundColor: "blue",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                        </Pressable>

                    </View>


                    {
                        item.mediaType === "image" && (
                            <Image
                                source={{
                                    uri: item.mediaUrl,
                                }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain",
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
                                isLooping
                                paused={true}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain",
                                    borderRadius: 20,
                                    opacity: isDarkMode ? 0.7 : 1,
                                }}
                            />
                        )

                    }


                </View>
            </Modal>

            
            <View
                style={{
                    zIndex: 1,
                    height: "12%",
                    width: "90%",
                    marginLeft: 10,
                    bottom: "14%",
                    position: "absolute",
                    //backgroundColor:"blue"
                    justifyContent: "center"
                }}
            >
                <Text
                    style={{
                        color: isDarkMode ? "white" : "#F5F5F5",
                        fontSize: 16,
                        fontWeight: "400",
                        textAlign: "justify",
                        lineHeight: 20,
                    }}
                >
                    {post.message}
                </Text>
            </View>


            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    bottom: "6%",
                    width: "100%",
                    //backgroundColor: "red"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 12
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

export default PostTextAndMedia