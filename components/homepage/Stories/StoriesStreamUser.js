import React, { useContext, useEffect, useCallback, useRef, useState, useTransition, } from "react";
import {
    View,
    Text,
    Animated,
    StatusBar,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable,
    Dimensions,
    SafeAreaView,
    Easing,
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { formatPostDate, formatTimeAgo, isEmpty, timestampStoryParser } from "../../Context/Utils";
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';
import { getStories } from "../../../actions/story.action";
import BottomSheetStories, { BottomSheetRefProps } from "./BottomSheetStories";
import { GestureHandlerRootView } from "react-native-gesture-handler";











const { width, height } = Dimensions.get("window")

const StoriesStreamUser = () => {
    const navigation = useNavigation(false);
    const { isDarkMode } = useDarkMode();
    const route = useRoute();
    const { id } = route.params;
    const dispatch = useDispatch();
    const { uid } = useContext(UidContext);
    const { t } = useTransition()
    const [loadStories, setLoadStories] = useState(true);
    const storiesData = useSelector((state) => state.storyReducer);
    //console.log(storiesData)
    const usersData = useSelector((state) => state.usersReducer);
    //console.log(id);


    const [selectedStory, setSelectedStory] = useState(
        storiesData.find((story) =>
            story.container.stories.some((s) => s._id === id))
    );


    storiesData.find((story) => story.container.stories.some((s) => s._id === id));


    if (selectedStory) {
        const selectedContainer = selectedStory.container;
        //console.log("Selected Container:", selectedContainer);
    } else {
        console.log("Container not found for story ID:", id);
    }
    const user = usersData.find((user) => user._id === selectedStory.container.posterId);
    //console.log(user);

    const [currentStoryIndex, setCurrentStoryIndex] = useState(
        selectedStory.container.stories.findIndex((story) => story._id === id)
    );


    useEffect(() => {
        if (loadStories) {
            dispatch(getStories());
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);





    const goToHome = () => {
        console.log("clicked");
        setLoadStories(true);
        navigation.navigate("TabNavigation",);
    };

    const goProfil = (uid) => {
        navigation.navigate("Profile", { uid });
    };

    const goToNextStory = () => {
        try {
            if (selectedStory && selectedStory.container && selectedStory.container.stories) {
                const totalStories = selectedStory.container.stories.length;

                if (currentStoryIndex < totalStories - 1) {
                    const nextStoryIndex = currentStoryIndex + 1;
                    setCurrentStoryIndex(nextStoryIndex);
                    resetAnimation();
                } else {
                    console.log('Unable to go to the next story or container.');
                    navigation.navigate("TabNavigation");
                }

            } else {
                console.error('Invalid story or container.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleNextStoryButtonPress = () => {
        goToNextStory();
    };



    const handlePrevStoryButtonPress = () => {
        goToPrevStory();
    };


    const storiesViewer = selectedStory.container.stories[currentStoryIndex].views



    const progressAnimation = useRef(new Animated.Value(0)).current;

    const animationRef = useRef(null); // Référence pour stocker l'animation

    const start = () => {
        animationRef.current = Animated.timing(progressAnimation, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        });

        animationRef.current.start(({ finished }) => {
            if (finished) {
                goToNextStory();
            }
        });
    };

    const resetAnimation = () => {
        progressAnimation.setValue(0);
    };



    const restartAnimation = () => {
        if (animationRef.current) {
            animationRef.current.start(({ finished }) => {
                if (finished) {
                    goToNextStory();
                }
            }); // Arrête l'animation en cours
        }
    }


    const stopAnimation = () => {
        if (animationRef.current) {
            animationRef.current.stop(); // Arrête l'animation en cours
        }
    };

    const ref = useRef(null);

    /*const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-200);
        }
        stopAnimation(); // Appel de la fonction pour arrêter l'animation lorsqu'on presse
    }, [ref, stopAnimation]);*/

    useEffect(() => {
        resetAnimation();
        restartAnimation();
        start();
        return () => {
            stopAnimation(); // Arrête l'animation lors du démontage du composant
        };
        // Arrête l'animation lors du démontage du composant

    }, []);


    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "black"
                }}
            >

                <View
                    style={{
                        flex: 1,
                        height: "100%",
                        width: width,
                        position: "relative",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    <StatusBar backgroundColor="black" barStyle="light-content" />


                    <Pressable
                        onPress={handlePrevStoryButtonPress}
                        style={{
                            flex: 1,
                            height: "65%",
                            marginTop: "30%",
                            width: "30%",
                            position: "absolute",
                            left: 0,
                            // backgroundColor: "red",
                            zIndex: 2
                        }}
                    >
                    </Pressable>

                    <Pressable
                        style={{
                            flex: 1,
                            height: "65%",
                            marginTop: "30%",
                            width: "30%",
                            position: "absolute",
                            right: 0,
                            //backgroundColor: "blue",
                            zIndex: 2
                        }}
                        onPress={handleNextStoryButtonPress}>
                    </Pressable>



                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            width: "100%",
                            height: "2%",
                            alignItems: "center",
                            position: "absolute",
                            // backgroundColor: "red",
                            marginTop: "3%",
                            zIndex: 2
                        }}
                    >
                        <TouchableOpacity onPress={goToHome}
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                //backgroundColor: "red",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign name="close" size={35} color="white" />

                        </TouchableOpacity>

                        <View
                            style={{
                                width: '86%',
                                justifyContent: "space-evenly ",
                                alignItems: "center",
                                flexDirection: "row",

                            }}
                        >
                            {selectedStory.container.stories.map((item, index) => (
                                <View
                                    key={index}
                                    style={{
                                        flex: 1,
                                        height: 3,
                                        marginLeft: "1%",
                                        backgroundColor: "rgba(255,255,255,0.5)",
                                        flexDirection: "row",
                                        borderRadius: 20,

                                    }}
                                >
                                    <Animated.View
                                        style={{
                                            height: 3,
                                            borderRadius: 20,
                                            flex: currentStoryIndex === index ? progressAnimation : selectedStory.container.stories[index].finish,
                                            backgroundColor: "white",
                                        }}
                                    ></Animated.View>
                                </View>
                            ))}

                        </View>




                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            position: "absolute",
                            width: "100%",
                            justifyContent: "space-between",
                            //backgroundColor:"red",
                            alignItems: "center",
                            paddingLeft: "5%",
                            height: 30,
                            top: "4%",
                            zIndex: 2


                        }}
                    >

                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "500",
                                color: "white",
                                paddingLeft: "12%"
                            }}
                        >
                            {!isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === selectedStory.container.posterId) return user.pseudo;
                                    else return null;
                                })}

                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingRight: "4%"
                            }}
                        >
                            <TouchableOpacity
                                //onPress={onPress}
                                style={{
                                    //backgroundColor: "red",
                                    width: "20%",
                                    height: 30,
                                    borderRadius: 10,
                                }}

                            >
                            </TouchableOpacity>

                            <View
                                style={{
                                    //backgroundColor: "#343232",
                                    height: 30,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 4,
                                }}
                            >
                                <FontAwesome5 name="clock" size={14} color="white" />
                                <Text
                                    style={{
                                        marginLeft: 6,
                                        color: "white",
                                        fontSize: 12,
                                    }}
                                >
                                    {formatPostDate(selectedStory.container.stories[currentStoryIndex].createdAt, t)}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => goProfil(user._id)}>
                                <View
                                    style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                !isEmpty(usersData) &&
                                                usersData
                                                    .map((user) => {
                                                        if (user._id === selectedStory.container.posterId)
                                                            return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                                        else return null;
                                                    })
                                                    .join(""),
                                        }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 30,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {selectedStory.container.stories[currentStoryIndex].media &&
                        selectedStory.container.stories[currentStoryIndex].text && (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: "black",
                                    position: "absolute",
                                    borderRadius: 20,
                                    width: "80%",
                                    height: "70%",
                                    top: "16%",
                                }}
                            >
                                {selectedStory.container.stories[currentStoryIndex].media_type === "image" && (
                                    <Image
                                        source={{
                                            uri: selectedStory.container.stories[currentStoryIndex].media,
                                        }}
                                        resizeMode="cover"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 20,
                                            opacity: 0.9,
                                        }}
                                        onLoadEnd={() => {
                                            progressAnimation.setValue(0);
                                            start()
                                        }}
                                    />
                                )}
                                {selectedStory.container.stories[currentStoryIndex].media_type === 'video' && (
                                    <Video
                                        source={{ uri: selectedStory.container.stories[currentStoryIndex].media, }}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        shouldPlay
                                        isLooping
                                        resizeMode="cover"
                                        onLoad={() => {
                                            progressAnimation.setValue(0);
                                            start()
                                        }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 20,
                                        }}
                                    />
                                )}

                                <LinearGradient
                                    colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: 200, // Ajuste la hauteur du dégradé selon tes besoins
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20,
                                    }}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        position: "absolute",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                        bottom: 20,
                                        borderRadius: 20,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 20,
                                        }}
                                    >
                                        {selectedStory.container.stories[currentStoryIndex].text}
                                    </Text>
                                </View>
                            </View>
                        )}

                    {selectedStory.container.stories[currentStoryIndex].media &&
                        !selectedStory.container.stories[currentStoryIndex].text && (

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    position: "absolute",
                                    borderRadius: 20,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "black"
                                }}
                            >

                                {selectedStory.container.stories[currentStoryIndex].media_type === "image" && (
                                    <Image
                                        source={{ uri: selectedStory.container.stories[currentStoryIndex].media }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 20,
                                            opacity: 0.9,
                                        }}
                                        resizeMode="contain"
                                        onLoadEnd={() => {
                                            progressAnimation.setValue(0);
                                            start()
                                        }}
                                    />
                                )}
                                {selectedStory.container.stories[currentStoryIndex].media_type === 'video' && (
                                    <Video
                                        source={{ uri: selectedStory.container.stories[currentStoryIndex].media }}
                                        rate={1.0}
                                        volume={1.0}
                                        isMuted={false}
                                        shouldPlay
                                        isLooping
                                        resizeMode="cover"
                                        onLoad={() => {
                                            progressAnimation.setValue(0);
                                            start()
                                        }}
                                        onError={(error) => console.error("Erreur de chargement de la vidéo:", error)}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 20,
                                        }}
                                    />

                                )}
                            </View>
                        )}
                    {!selectedStory.container.stories[currentStoryIndex].media &&
                        selectedStory.container.stories[currentStoryIndex].text && (
                            <View
                                onLayout={() => {
                                    progressAnimation.setValue(0);
                                    start();
                                }}
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: "pink",
                                    position: "absolute",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 20,
                                    width: "90%",
                                    height: "78%",
                                    top: "14%",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 30,
                                    }}
                                >
                                    {selectedStory.container.stories[currentStoryIndex].text}
                                </Text>
                            </View>
                        )}





                    <GestureHandlerRootView
                        style={{
                            zIndex: 1,
                            //backgroundColor: "red"


                        }} >
                        <BottomSheetStories stopAnimation={stopAnimation} startAnimation={restartAnimation} ref={ref} />
                    </GestureHandlerRootView>

                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: 60,
                            // backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: 0

                        }}>
                        <View
                            style={{
                                width: "100%",
                                height: "50%",
                                //backgroundColor: 'blue',
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row"
                            }}>
                            <SimpleLineIcons name="arrow-up" size={20} color="white" />
                        </View>
                        <View
                            style={{
                                width: "100%",
                                height: "50%",
                                //backgroundColor: 'green',
                                justifyContent: "center",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Ionicons name="eye" size={20} color="white" />
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    paddingLeft: "2%",
                                    color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                }}>
                                {storiesViewer.length}
                            </Text>
                        </View>

                    </View>



                </View>


            </SafeAreaView>


        </>


    );
};

export default StoriesStreamUser;
