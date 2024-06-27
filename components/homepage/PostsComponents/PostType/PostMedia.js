import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import LikeButton from "../LikeButton/LikeButton"
import { useNavigation } from "@react-navigation/native";
import { isEmpty, formatPostDate } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import PostFooter from "../CustomPostCard/PostFooter";
import { markPostAsViewed } from "../../../../actions/post.actions";



const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const PostMedia = ({ post, item, selectedComment, isLoading, toggleToolings, toggleComments, toggleSending }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const [showImage, setShowImage] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { uid } = useContext(UidContext);
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
        console.log("Mon tableau de viewer", meViewPost);

        if (meViewPost) {
            console.log("Il est là", meViewPost);
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



    const user = usersData.map(user => {
        if (user._id === post.posterId) {
            return user;
        }
        return null;
    }).filter(user => user !== null)[0];

    const isUserOnline = user.onlineStatus === true


    post

    return (
        <>

            <View
                key={post._id}
                style={[

                    {
                        marginTop: 8,
                        marginBottom: 5,
                        backgroundColor: isDarkMode ? "#171717" : "#FFFFFF",
                        position: "relative",
                        width: "100%",
                        zIndex: 1,
                        shadowColor: isDarkMode ? "white " : "#000",
                        shadowOffset: {
                            width: 0,
                            height: isDarkMode ? 1 : 2,
                        },
                        shadowOpacity: isDarkMode ? 0.16 : 0.6,
                        shadowRadius: 3.84,
                        elevation: 2,
                    }]}
            >
                {isLoading ? (
                    <View
                        style={{
                            width: "100%",
                            height: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                width: "30%",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 16,
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >
                                Loading
                            </Text>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                        <Text
                            style={{
                                fontSize: 26,
                                marginTop: "5%",
                                textAlign: "center",
                                color: isDarkMode ? "white" : "black",
                            }}
                        >
                            Please wait
                        </Text>
                    </View>
                ) : (

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
                                            borderColor: "rgba(255,255,255)",
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
                                                    onPress={() => goProfil(post.originalPostId)}>

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
                                                    //resizeMode: "cover",
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


                                </View>

                                <PostFooter
                                    post={post}
                                    toggleSending={toggleSending}
                                    toggleComments={toggleComments} />


                            </>

                        )}



                    </>

                )}

            </View>


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

export default PostMedia