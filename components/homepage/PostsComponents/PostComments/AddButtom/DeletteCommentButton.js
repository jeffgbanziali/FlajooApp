import { View, Text, TouchableOpacity, Pressable, Alert, Animated, Easing } from 'react-native'
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react'
import { useDarkMode } from '../../../../Context/AppContext';
import { useTranslation } from 'react-i18next';
import { deleteComment, getPosts } from '../../../../../actions/post.actions';
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';






const DeletteCommentButton = ({ post, comment, areYouPressComment }) => {






    const { isDarkMode } = useDarkMode();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loadPost, setLoadPost] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [pressComment, setPressComment] = useState(new Animated.Value(0));



    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(userData._id));
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

    const areYouDelete = () => {
        setDeleting(!deleting);
        console.log("deleting")
    }



    const handleDeletePost = async () => {
        try {
            dispatch(deleteComment(post._id, comment._id));
            setLoadPost(true);
            areYouDelete();
            areYouPressComment()
            Alert.alert(`${t("DeletePosting")}`)
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };



    const arePressComment = () => {
        if (deleting) {
            Animated.timing(pressComment, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => setDeleting(false));
        } else {
            setDeleting(true);
            Animated.timing(pressComment, {
                toValue: 200,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    };


    return (
        <>
            <TouchableOpacity
                onPress={arePressComment}
                style={{
                    width: "100%",
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 20
                }}
            >
                <Text
                    style={{
                        color: isDarkMode ? "#F5F5F5" : "black",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "500",
                    }}

                >
                    {t("remoFav")}
                </Text>

            </TouchableOpacity>


            <Modal
                isVisible={deleting}
                onBackdropPress={arePressComment}
                //transparent={true}
                backdropOpacity={0.5}
                animationIn="pulse"
                animationOut="fadeOut"
                useNativeDriverForBackdrop
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 300,
                            height: 160,
                            borderRadius: 30,
                            backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                height: "40%",
                                //backgroundColor: "red",
                                alignItems: 'center',
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    fontWeight: "600",
                                    fontSize: 20,
                                    textAlign: "justify"
                                }}>

                                {t("AreYouSure")}
                                {" "}
                                <Entypo
                                    name="emoji-sad"
                                    size={30}
                                    color={isDarkMode ? "red" : "red"}
                                />
                            </Text>


                        </View>
                        <View
                            style={{
                                width: "90%",
                                height: "30%",
                                flexDirection: "row",
                                //backgroundColor: "green",
                                justifyContent: "space-around"
                            }}
                        >
                            <Pressable
                                onPress={areYouDelete}
                                style={{
                                    width: "45%",
                                    height: "100%",
                                    backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    borderRadius: 10,
                                    shadowColor: isDarkMode ? "white " : "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                    },
                                    shadowOpacity: isDarkMode ? 0.16 : 0.3,
                                    shadowRadius: 3.84,
                                    elevation: 2,
                                }}
                            >
                                <Entypo
                                    name="cross"
                                    size={35}
                                    color={isDarkMode ? "red" : "red"}

                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        fontWeight: "600",
                                        fontSize: 18,
                                        textAlign: "justify"
                                    }}>
                                    {t("No")}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={handleDeletePost}
                                style={{
                                    width: "45%",
                                    height: "100%",
                                    backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    borderRadius: 10,
                                    shadowColor: isDarkMode ? "white " : "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                    },
                                    shadowOpacity: isDarkMode ? 0.16 : 0.3,
                                    shadowRadius: 3.84,
                                    elevation: 2,

                                }}

                            >
                                <MaterialCommunityIcons
                                    name="delete"
                                    size={28}
                                    color={isDarkMode ? "green" : "green"}
                                />
                                <Text
                                    style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        fontWeight: "600",
                                        fontSize: 18,
                                        textAlign: "justify"
                                    }}>
                                    {t("Yes")}
                                </Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </>

    )
}

export default DeletteCommentButton