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
    FlatList,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { UidContext, useDarkMode } from '../../../Context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { USER } from '../../../../Data/Users';

const StorySend = ({ story, selectedStory, setIsDeleteLoading, startAnimation, stopAnimation }) => {
    const [storiesHeight, setStoriesHeight] = useState(new Animated.Value(0));
    const [showTools, setShowTools] = useState(false);
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const dispatch = useDispatch()
    const navigation = useNavigation(false);
    const { uid } = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [loadStories, setLoadStories] = useState(true);
    const firstTenUsers = usersData.slice(0, 10);



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




    const renderPost = ({ item, index }) => {
        return (

            <>
                <View
                    style={{
                        width: 90,
                        height: "100%",
                        marignLeft: 20,
                        //backgroundColor: "red",
                        alignItems: "center",
                        marginTop: 8,
                        //justifyContent: "space-evenly"
                    }}>
                    <Image
                        source={{ uri: item.picture }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100
                        }}
                    />
                    <Text
                        style={{
                            marginTop: 8,
                            fontSize: 14,
                            fontWeight: "500",
                            color: isDarkMode ? "#FFFFFF" : "black",
                        }}>
                        {item.pseudo}
                    </Text>
                </View>
            </>

        )
    }







    return (
        <>
            <View
                style={{
                    width: 50,
                    height: 50,
                    marginLeft: 2,
                    //backgroundColor: "blue",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 3

                }}
            >
                <TouchableOpacity
                    onPress={toggleStoriesTools}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="share-outline"
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>
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
                        backgroundColor: isDarkMode ? "#171717" : "white",
                        height: "50%",
                        width: "100%",
                        alignItems: "center",
                        borderRadius: 20,

                    }}>

                    <View
                        style={{
                            width: 30,
                            height: 6,
                            alignSelf: 'center',
                            backgroundColor: 'gray',
                            marginTop: 10,
                            borderRadius: 5
                        }} />

                    <View
                        style={{
                            height: "16%",
                            width: "92%",
                            marginTop: 10,
                            borderRadius: 10,
                            backgroundColor: isDarkMode ? "#202020" : "#D9D9D9",
                            alignItems: "center",
                            flexDirection: "row"
                        }}>

                        <View
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 30,
                                // backgroundColor: "blue",
                                marginLeft: 8
                            }}
                        >
                            <Image
                                source={{ uri: userData.picture }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 30,
                                }}
                            />

                        </View>

                        <View
                            style={{
                                height: "100%",
                                width: "52%",
                                //backgroundColor: "blue",
                                marginLeft: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{
                                color: isDarkMode ? "#FFFFFF" : "black",
                                fontSize: 18,
                                fontWeight: "500"
                            }}>
                                {t("EditAndShare")}
                            </Text>

                        </View>

                        <View
                            style={{
                                height: 40,
                                width: 90,
                                backgroundColor: "blue",
                                marginLeft: 8,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                color: isDarkMode ? "#FFFFFF" : "black",
                                fontSize: 16,
                                fontWeight: "500"
                            }}>
                                {t("SharingStory")}
                            </Text>

                        </View>


                    </View>

                    <View
                        style={{
                            height: "38%",
                            width: "100%",
                            marginTop: 20,
                            //backgroundColor: "green",
                            flexDirection: "column",


                        }}>

                        <View
                            style={{
                                //backgroundColor: 'gray',
                                height: "20%",
                                width: "100%",
                                paddingLeft: 20
                            }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: "500",
                                color: isDarkMode ? "#FFFFFF" : "black",
                            }}>
                                {t("SendTo")}
                            </Text>

                        </View>

                        <View
                            style={{
                               // backgroundColor: 'gray',
                                height: "80%",
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                                //paddingLeft: 20,

                            }}>


                            <FlatList
                                horizontal
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={firstTenUsers}
                                renderItem={renderPost}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={
                                    <>
                                        <View style={{
                                            width: 100,
                                            height: 120,

                                            //backgroundColor: "red",
                                            alignItems: "center",
                                            //justifyContent: "space-evenly"
                                        }}>
                                            <View
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: 30,
                                                    backgroundColor: "gray",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                <Entypo
                                                    name="dots-three-horizontal"
                                                    size={20}
                                                    color={isDarkMode ? "white" : "black"} />
                                            </View>

                                            <Text
                                                style={{
                                                    marginTop: 8,
                                                    fontSize: 14,
                                                    fontWeight: "500",
                                                    color: isDarkMode ? "#FFFFFF" : "black",
                                                }}>
                                                {t('Plus')}
                                            </Text>
                                        </View>
                                    </>
                                }

                            />


                        </View>


                    </View>

                    <View
                        style={{
                            height: "34%",
                            width: "100%",
                            marginTop: 10,
                            //backgroundColor: "gray",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                        <View
                            style={{
                                height: "20%",
                                width: "100%",
                                paddingLeft: 20
                            }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: "500",
                                color: isDarkMode ? "#FFFFFF" : "black",
                            }}>
                                {t("ShareOn")}
                            </Text>

                        </View>

                        <View
                            style={{
                                // backgroundColor: 'green',
                                height: "80%",
                                width: "100%",
                                alignItems: "center",

                                flexDirection: "row",
                                //paddingLeft: 20,

                            }}>
                            <View
                                style={{
                                    width: 100,
                                    height: "100%",

                                    //backgroundColor: "red",
                                    alignItems: "center",
                                    justifyContent: "space-evenly"
                                }}>
                                <View
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        backgroundColor: "gray",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                    <Entypo
                                        name="dots-three-horizontal"
                                        size={20}
                                        color={isDarkMode ? "white" : "black"} />
                                </View>

                                <Text
                                    style={{
                                        marginTop: 8,
                                        fontSize: 14,
                                        fontWeight: "500",
                                        color: isDarkMode ? "#FFFFFF" : "black",
                                    }}>
                                    {t('Plus')}
                                </Text>
                            </View>
                        </View>

                    </View>




                </SafeAreaView>


            </Modal >
        </>
    );
};

export default StorySend;
