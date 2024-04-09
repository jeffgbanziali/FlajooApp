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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { formatPostDate, formatTimeAgo, isEmpty, timestampStoryParser } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';
import { getStories } from "../../../../actions/story.action";
import BottomSheetStories, { BottomSheetRefProps } from "./BottomSheetStories";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import StoryByMediaAndText from "./StoryByMediaAndText";
import StoryByMedia from "./StoryByMedia";
import StoryByText from "./StoryByText";





const { width, height } = Dimensions.get("window")

const StoriesStreamUser = () => {
    const navigation = useNavigation(false);
    const { isDarkMode } = useDarkMode();
    const route = useRoute();
    const { id } = route.params;
    const dispatch = useDispatch();
    const { uid } = useContext(UidContext);
    const [loadStories, setLoadStories] = useState(true);
    const storiesData = useSelector((state) => state.storyReducer);
    const [videoDurationLoaded, setVideoDurationLoaded] = useState(false);
    //console.log(storiesData)
    const usersData = useSelector((state) => state.usersReducer);
    const { t } = useTranslation();

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



    const goToPrevStory = () => {
        try {
            if (selectedStory && selectedStory.container && selectedStory.container.stories) {
                setCurrentStoryIndex((prevIndex) => {
                    if (prevIndex > 0) {
                        return prevIndex - 1;
                    } else {
                        console.log('Already at the first story.');
                        navigation.navigate("TabNavigation");
                        return prevIndex;
                    }
                });
                resetAnimation();
            } else {
                console.error('Invalid story or container.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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



    const videoDurationRef = useRef(0);




    const storiesViewer = selectedStory.container.stories[currentStoryIndex].views


    useEffect(() => {
        if (selectedStory && selectedStory.container && selectedStory.container.stories) {
            const currentStory = selectedStory.container.stories[currentStoryIndex];
            if (currentStory.media && currentStory.media_type === 'video' && currentStory.media.duration) {
                videoDurationRef.current = currentStory.media.duration; // Utilise la durée de la vidéo actuelle
                setVideoDurationLoaded(true); // Indique que la durée de la vidéo a été chargée
            } else {
                setVideoDurationLoaded(false); // Réinitialise si la durée de la vidéo n'est pas disponible
            }
        }
    }, [selectedStory, currentStoryIndex]);




    const progressAnimation = useRef(new Animated.Value(0)).current;

    const animationRef = useRef(null); // Référence pour stocker l'animation

    const start = () => {
        const currentStory = selectedStory.container.stories[currentStoryIndex];
        if (currentStory.media_type === 'video') {
            // Si c'est une vidéo, utilisez la durée de la vidéo pour l'animation
            const videoDuration = currentStory.media.duration; // Durée de la vidéo en secondes
            const animationDuration = videoDuration * 1000; // Convertit en millisecondes
            animationRef.current = Animated.timing(progressAnimation, {
                toValue: 1,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: false,
            });
        } else if (currentStory.media_type === 'image') {
            // Si c'est une image, définissez une durée fixe pour l'animation (par exemple, 15 secondes)
            const animationDuration = 15000; // 15 secondes en millisecondes
            animationRef.current = Animated.timing(progressAnimation, {
                toValue: 1,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: false,
            });
        }
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

    useEffect(() => {
        resetAnimation();
        restartAnimation();
        start();
        return () => {
            stopAnimation(); // Arrête l'animation lors du démontage du composant
        };
        // Arrête l'animation lors du démontage du composant

    }, [currentStoryIndex]);


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
                                        style={[
                                            {
                                                height: 3,
                                                borderRadius: 20,
                                                flex: index === currentStoryIndex ? progressAnimation : 0,
                                                width: index < currentStoryIndex ? '100%' : (index > currentStoryIndex ? 0 : null),
                                                backgroundColor: "white",
                                            },
                                        ]}
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
                            <Text
                                style={{
                                    marginRight: 6,
                                    color: "white",
                                    fontSize: 12,
                                }}
                            >
                                {formatPostDate(selectedStory.container.stories[currentStoryIndex].createdAt, t)}
                            </Text>
                            <TouchableOpacity onPress={goToHome}
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 20,
                                    //backgroundColor: "red",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="dots-three-horizontal" size={20} color="white" />

                            </TouchableOpacity>
                        </View>

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




                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    color: "white",
                                    paddingLeft: "12%"
                                }}
                            >
                                {t("You")}

                            </Text>





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



                    <StoryByMediaAndText
                        story={selectedStory.container.stories[currentStoryIndex]}
                        progressAnimation={progressAnimation}
                        start={start}
                    />

                    <StoryByMedia
                        story={selectedStory.container.stories[currentStoryIndex]}
                        progressAnimation={progressAnimation}
                        start={start}
                    />

                    <StoryByText
                        story={selectedStory.container.stories[currentStoryIndex]}
                        progressAnimation={progressAnimation}
                        start={start}
                    />




                    <GestureHandlerRootView
                        style={{
                            zIndex: 1,
                            //backgroundColor: "red",
                            width: "100%",

                        }} >
                        <BottomSheetStories
                            story={selectedStory.container.stories[currentStoryIndex]}
                            stopAnimation={stopAnimation}
                            startAnimation={restartAnimation}
                            ref={ref} />
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
                                    fontSize: 18,
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
