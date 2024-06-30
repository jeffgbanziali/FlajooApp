import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { isEmpty, formatPostDate } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import Video from 'react-native-video';
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import PostFooter from "../CustomPostCard/PostFooter";
import { markPostAsViewed } from "../../../../actions/post.actions";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



const PostTextAndMedia = ({ post, item, toggleToolings, toggleSending, toggleComments }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const [showImage, setShowImage] = useState(false);
    const { t } = useTranslation();
    const { uid } = useContext(UidContext);
    const dispatch = useDispatch()



    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();

    const goProfil = (id) => {
        if (uid === id) {
            navigation.navigate("Profile", { id });
        } else {
            navigation.navigate("ProfilFriends", { id });
        }
    };


    const handleViewView = () => {
        const meViewPost = post.views.find((user) => user.viewerId === uid);

        console.log("Mon user viewer", meViewPost)

        if (meViewPost) {
            console.log("Il est là");
        } else {
            dispatch(markPostAsViewed(post._id, uid))
            console.log("il a stocké le bail")
        }
    };

    const showModal = () => {
        setShowImage(!showImage);
        console.log("Je te vois")
        handleViewView()
    };



    let style = {};

    if (item.height > item.width) {
        // Portrait
        style = styles.portrait;
    } else if (item.height === item.width) {
        // Square
        style = styles.square;
    } else {
        // Landscape
        style = styles.landscape;
    }

    let user = null;

    if (Array.isArray(usersData)) {
        user = usersData.map(function (user) {
            if (user._id === post.posterId) {
                return user;
            }
            return null;
        }).filter(Boolean)[0];
    } else {
        console.error('usersData is not an array', usersData);
    }




    const isUserOnline = user.onlineStatus === true







    return (



        <>

            {post.originalPosterId && post.posterId ? (

                <>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "relative ",
                            zIndex: 1,
                            marginBottom: 10,
                            height: 60,
                            //backgroundColor:"red"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10
                            }}
                        >
                            <TouchableOpacity

                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 30,
                                    marginLeft: 10,
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
                                        zIndex: 1,
                                    }}
                                />
                                {isUserOnline && (<View
                                    style={{
                                        backgroundColor: "#09C03C",
                                        position: "absolute",
                                        left: 28,
                                        width: 8,
                                        height: 8,
                                        borderRadius: 25,
                                        borderWidth: 1,
                                        borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                        top: 25,
                                        zIndex: 100
                                    }}>
                                </View>
                                )}
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
                                            color: isDarkMode ? "#F5F5F5" : "black",
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
                                        color: isDarkMode ? "#F5F5F5" : "black",
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
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </TouchableOpacity>
                    </View>

                    {
                        post.message && (
                            <View
                                style={{
                                    zIndex: 1,
                                    width: "90%",
                                    marginLeft: 10,
                                    paddingBottom: 10,
                                    justifyContent: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        fontSize: 16,
                                        fontWeight: "400",
                                        textAlign: "justify",
                                        lineHeight: 20,
                                    }}
                                >
                                    {post.message}
                                </Text>
                            </View>
                        )
                    }

                    <View
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                        <View
                            style={{
                                width: "90%",
                                borderRightRadius: 30,
                                borderLeftRadius: 30,
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderTopWidth: 1,
                                paddingLeft: 20,
                                borderColor: "gray",
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
                                    height: 60,
                                    //backgroundColor:"red"
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 10
                                    }}
                                >
                                    <TouchableOpacity

                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 30,
                                            marginLeft: 10,
                                            zIndex: 1,
                                        }}
                                        onPress={() => goProfil(post.originalPosterId)}>

                                        <Image
                                            source={{
                                                uri:
                                                    !isEmpty(usersData[0]) &&
                                                    usersData
                                                        .map((user) => {
                                                            if (user._id === post.originalPosterId) {
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
                                                zIndex: 1,
                                            }}
                                        />
                                        {!isUserOnline && (<View
                                            style={{
                                                backgroundColor: "#09C03C",
                                                position: "absolute",
                                                left: 20,
                                                width: 6,
                                                height: 6,
                                                borderRadius: 25,
                                                borderWidth: 1,
                                                borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                                top: 20,
                                                zIndex: 100
                                            }}>
                                        </View>
                                        )}
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
                                                    color: isDarkMode ? "#F5F5F5" : "black",
                                                    marginLeft: 5,
                                                    fontWeight: "600",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {!isEmpty(usersData[0]) &&
                                                    usersData.map((user) => {
                                                        if (user._id === post.originalPosterId) return user.pseudo;
                                                        else return null;
                                                    })}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: isDarkMode ? "#F5F5F5" : "black",
                                                fontSize: 10,
                                                marginLeft: 5,
                                                marginTop: 4,
                                                fontWeight: "400",
                                                fontSize: 10,
                                                lineHeight: 12,
                                            }}
                                        >
                                            {formatPostDate(post.originalPostCreated)}
                                        </Text>
                                    </View>
                                </View>



                            </View>
                            {post.originalMessage && (
                                <View
                                    style={{
                                        zIndex: 1,
                                        width: "90%",
                                        marginLeft: 10,
                                        paddingBottom: 10,
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: isDarkMode ? "#F5F5F5" : "black",
                                            fontSize: 14,
                                            fontWeight: "400",
                                            textAlign: "justify",
                                            lineHeight: 20,
                                        }}
                                    >
                                        {post.originalMessage}
                                    </Text>
                                </View>
                            )}

                        </View>

                    </View>

                    <View
                        style={[
                            style, {
                                // backgroundColor: "red",
                            }]}
                    >


                        <Pressable
                            onPress={showModal}
                            style={{
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                // borderRadius: 20,
                                backgroundColor: 'rgba(0, 0, 0, 0.93)',
                                overflow: "hidden",
                            }}
                        >

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
                                            opacity: isDarkMode ? 0.7 : 1,
                                        }}
                                    />
                                )
                            }


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
                                                borderRadius: 20,
                                                opacity: isDarkMode ? 0.7 : 1,
                                            }}
                                        />
                                    )

                                }


                            </View>
                        </Modal>




                    </View>


                    <PostFooter
                        post={post}
                        toggleSending={toggleSending}
                        toggleComments={toggleComments}
                    />
                </>

            ) : (

                <>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "relative ",
                            zIndex: 1,
                            marginBottom: 10,
                            height: 60,
                            //backgroundColor:"red"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10
                            }}
                        >
                            <TouchableOpacity

                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 30,
                                    marginLeft: 10,
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
                                        zIndex: 1,
                                    }}
                                />
                                {isUserOnline && (<View
                                    style={{
                                        backgroundColor: "#09C03C",
                                        position: "absolute",
                                        left: 28,
                                        width: 8,
                                        height: 8,
                                        borderRadius: 25,
                                        borderWidth: 1,
                                        borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                        top: 25,
                                        zIndex: 100
                                    }}>
                                </View>
                                )}
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
                                            color: isDarkMode ? "#F5F5F5" : "black",
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
                                        color: isDarkMode ? "#F5F5F5" : "black",
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
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            zIndex: 1,
                            width: "90%",
                            marginLeft: 10,
                            paddingBottom: 10,
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
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
                        style={[
                            style, {
                                // backgroundColor: "red",
                            }]}
                    >


                        <Pressable
                            onPress={showModal}
                            style={{
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                // borderRadius: 20,
                                backgroundColor: 'rgba(0, 0, 0, 0.93)',
                                overflow: "hidden",
                            }}
                        >

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
                                            opacity: isDarkMode ? 0.7 : 1,
                                        }}
                                    />
                                )
                            }


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
                                                borderRadius: 20,
                                                opacity: isDarkMode ? 0.7 : 1,
                                            }}
                                        />
                                    )

                                }


                            </View>
                        </Modal>




                    </View>

                    <PostFooter
                        post={post}
                        toggleSending={toggleSending}
                        toggleComments={toggleComments}
                    />
                </>
            )
            }

        </>

    )
}




const styles = StyleSheet.create({
    imageContainer: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
    },
    portrait: {
        height: windowHeight * 0.6,
        width: "100%",
    },
    square: {
        height: windowHeight * 0.5,
        width: "100%",
    },
    landscape: {
        height: windowHeight * 0.4,
        width: "100%",
    },
});


export default PostTextAndMedia