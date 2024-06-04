import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
    Pressable,
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
import { Modal } from "react-native";
import { StyleSheet } from "react-native";



const { width: windowWidth, height: windowHeight } = Dimensions.get("window")



const PostTwoMedia = ({ post, mediaItem, currentMediaIndex, toggleToolings, toggleComments }) => {
    const usersData = useSelector((state) => state.usersReducer);
    const [showImage, setShowImage] = useState(false);

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


    const showModal = () => {
        setShowImage(!showImage);
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


    const media = mediaItem?.map(mediaItem => mediaItem);
    let style = {};

    if (media[0].height > media[0].width) {
        // Portrait
        style = styles.portrait;
    } else if (media[0].height === media[0].width) {
        // Square
        style = styles.square;
    } else {
        // Landscape
        style = styles.landscape;
    }

    return (

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
                        borderColor: "red",
                        width: windowWidth,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        overflow: "hidden",
                        backgroundColor: 'rgba(0, 0, 0, 0.93)',

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
                                                width: windowWidth,
                                                height: "100%",
                                                resizeMode: "contain",
                                                opacity: isDarkMode ? 0.7 : 1,
                                            }}
                                        />
                                    )
                                }



                            </>


                        )}
                    />

                    <Pagination data={mediaItem} scrollX={scrollX} indexion={index} />
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
                                height: "20%",
                                marginTop: "4%",
                                // backgroundColor: "red",
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
                                                resizeMode="contain"
                                                isLooping
                                                paused={true}
                                                style={{
                                                    width: windowWidth,
                                                    height: "100%",
                                                    borderRadius: 20,
                                                    opacity: isDarkMode ? 0.7 : 1,
                                                }}
                                            />
                                        )
                                    }


                                </>


                            )}
                        />

                        <Pagination data={mediaItem} scrollX={scrollX} indexion={index} />

                    </View>
                </Modal>



            </View>


            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: 60,
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
                                color: isDarkMode ? "#F5F5F5" : "black",
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
                                    color={isDarkMode ? "#F5F5F5" : "black"}

                                />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
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
                            color={isDarkMode ? "#F5F5F5" : "black"}

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
                        color={isDarkMode ? "#F5F5F5" : "black"}

                    />
                </TouchableOpacity>
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
        height: 600,
        width: "100%",
    },
    square: {
        height: 400,
        width: "100%",
    },
    landscape: {
        height: 300,
        width: "100%",
    },
});

export default PostTwoMedia