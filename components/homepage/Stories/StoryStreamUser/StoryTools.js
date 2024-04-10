import {
    View,
    Text,
    Animated,
    StatusBar,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable,
    Platform,
    SafeAreaView,
    Easing,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { formatPostDate, isEmpty } from '../../../Context/Utils'
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { UidContext, useDarkMode } from '../../../Context/AppContext';
import { getStories, deleteStory } from '../../../../actions/story.action';
import StoryDeleteLoading from './StoryDeleteLoading';

const StoryTools = ({ story, selectedStory, setIsDeleteLoading, startAnimation, stopAnimation }) => {

    const [storiesHeight, setStoriesHeight] = useState(new Animated.Value(0));
    const [showTools, setShowTools] = useState(false);
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const dispatch = useDispatch()
    const navigation = useNavigation(false);
    const { uid } = useContext(UidContext);
    const usersData = useSelector((state) => state.usersReducer);
    const [loadStories, setLoadStories] = useState(true);


    const goProfil = (uid) => {
        navigation.navigate("Profile", { uid });
    };




    useEffect(() => {
        if (loadStories) {
            dispatch(getStories());
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);




    const handleDeleteStory = async () => {
        try {
            setIsDeleteLoading(true);
            dispatch(deleteStory(story._id));
            setShowTools(false);
            setLoadStories(true);
        }
        catch (error) {
            console.log("Donne moi l'erreur ", error);
        } finally {
            setTimeout(() => {
                setIsDeleteLoading(false);
                navigation.navigate("TabNavigation",); 
            }, 5000);
        }
    }


    const toggleStoriesTools = () => {
        if (showTools) {
            Animated.timing(storiesHeight, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => setShowTools(false));
            startAnimation();
        } else {
            setShowTools(true);
            Animated.timing(storiesHeight, {
                toValue: 200,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
            stopAnimation();
        }
    };








    return (

        <>

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
                        {formatPostDate(story.createdAt, t)}
                    </Text>
                    <TouchableOpacity onPress={toggleStoriesTools}
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





                    <TouchableOpacity onPress={() => goProfil(uid)}>
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
                                                if (user._id === selectedStory.posterId)
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





            <Modal
                isVisible={showTools}
                onBackdropPress={toggleStoriesTools}
                style={{ margin: 0, justifyContent: "flex-end" }}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                useNativeDriverForBackdrop
            >

                <SafeAreaView
                    style={{
                        //backgroundColor: "green",
                        height: "68%",
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",

                    }}>


                    <View
                        style={{
                            backgroundColor: isDarkMode ? "#171717" : "white",
                            height: "86%",
                            width: "95%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,

                        }}>


                        <View
                            style={{
                                height: "12.5%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }} >

                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}>
                                Your story Tools
                            </Text>

                        </View>



                        <Pressable
                            onPress={() => handleDeleteStory()}
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("deleteTheStory")}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("AddFav")}
                            </Text>
                        </Pressable>


                        <Pressable
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("Featured")}
                            </Text>
                        </Pressable>


                        <Pressable
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("ShareIn")}
                            </Text>
                        </Pressable>


                        <Pressable
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("Send")}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={{
                                height: "12%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("AddMentions")}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={{
                                height: "12.5%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                borderTopWidth: 1,
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                            }} >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}>
                                {t("StorySettings")}
                            </Text>
                        </Pressable>

                    </View>

                    <Pressable
                        onPress={toggleStoriesTools}
                        style={{
                            backgroundColor: isDarkMode ? "#171717" : "white",
                            height: "10%",
                            width: "95%",
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",


                        }}>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}>
                            {t("Cancel")}
                        </Text>
                    </Pressable>




                </SafeAreaView>


            </Modal >


        </>




    )
}

export default StoryTools