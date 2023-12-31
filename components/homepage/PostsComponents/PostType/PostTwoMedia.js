import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext, useRef, useState, } from "react";
import { useSelector } from "react-redux";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LikeButton from "../LikeButton/LikeButton"
import { useNavigation } from "@react-navigation/native";
import { isEmpty, formatPostDate } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import { Dimensions } from "react-native";
import Pagination from "../CustomPostCard/Pagination"
import Video from 'react-native-video';



const { width: windowWidth, height: windowHeight } = Dimensions.get("window")



const PostTwoMedia = ({ post, mediaItem, toggleToolings, toggleComments }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    const { uid } = useContext(UidContext);
    const { isDarkMode } = useDarkMode();

    const scrollX = useRef(new Animated.Value(0)).current

    const goProfil = (id) => {
        if (uid === id) {
            console.log("go to my profil", id);
            navigation.navigate("Profile", { id });
        } else {
            navigation.navigate("ProfilFriends", { id });
            console.log("go to profile friends", id);
        }
    };

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;


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
            <View style={{
                borderColor: "red",
                width: windowWidth,
                height: 500,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                overflow: "hidden",

            }}>
                <FlatList
                    data={mediaItem}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleOnScroll}
                    onViewableItemsChanged={handleOnViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <>
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
                                            borderColor: "red",
                                            width: windowWidth,
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
                                        resizeMode="contain"
                                        isLooping
                                        paused={true}
                                        style={{
                                            width:windowWidth,
                                            height: "100%",
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
                        </>


                    )}
                />
                <Pagination data={mediaItem} scrollX={scrollX} indexion={index} />
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




export default PostTwoMedia