
import { View, Text, Image, Pressable, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDarkMode } from '../../../../Context/AppContext';
import { isEmpty } from '../../../../Context/Utils';
import { useTranslation } from 'react-i18next';
import { deletePost, getPosts } from '../../../../../actions/post.actions';
import { Modal } from 'react-native';



const PostTools = ({ post, toggleToolings }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [loadPost, setLoadPost] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const { isDarkMode } = useDarkMode();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);




    const handleDeletePost = async () => {
        try {
            dispatch(deletePost(post._id));
            setLoadPost(true);
            areYouDelete();
            toggleToolings();
            Alert.alert(`${t("DeletePosting")}`)
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };


    const areYouDelete = () => {
        setDeleting(!deleting);

    }






    const savePost = () => {
        console.warn("Mbi nga zo")
    }







    return (
        <View
            style={{
                width: "100%",
                height: "90%",
            }}>


            {post.posterId === userData._id ? (
                <View
                    style={{
                        width: "100%",
                        height: "20%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderTopWidth: 2,
                        borderColor: isDarkMode ? "#343232" : "lightgray",
                    }}
                >
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>


                        <TouchableOpacity
                            onPress={areYouDelete}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                                borderWidth: 1,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <MaterialCommunityIcons
                                name="delete"
                                size={28}
                                color={isDarkMode ? "red" : "red"}
                            />

                        </TouchableOpacity>


                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                fontWeight: "600",
                                fontSize: 16
                            }}
                        >
                            {t("Delete")}
                        </Text>

                    </View>
                    <Modal
                        visible={deleting}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={areYouDelete}
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

                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between",

                        }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                                borderWidth: 1,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <MaterialCommunityIcons
                                name="pencil"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </View>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "black",
                                fontWeight: "600",
                                fontSize: 16
                            }}
                        >
                            {t("Modify")}
                        </Text>

                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between",


                        }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                backgroundColor: isDarkMode ? "#3F3F3F" : "#F9F8F8",
                                borderWidth: 3,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Fontisto
                                name="heart-alt"
                                size={24}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </View>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: 14
                            }}
                        >
                            Enregistrer
                        </Text>

                    </View>
                </View>
            ) : (
                <View
                    style={{
                        width: "100%",
                        height: "25%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderTopWidth: 2,
                        borderColor: isDarkMode ? "#343232" : "lightgray",
                    }}
                >
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between"

                        }}>
                        <Pressable
                            onPress={savePost}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                //backgroundColor: "blue",
                                borderWidth: 3,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Fontisto
                                name="heart-alt"
                                size={24}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </Pressable>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: 14
                            }}
                        >
                            Enregistrer
                        </Text>

                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between"

                        }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                //backgroundColor: "blue",
                                borderWidth: 3,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Fontisto
                                name="heart-alt"
                                size={24}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </View>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: 14
                            }}
                        >
                            Enregistrer
                        </Text>

                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            alignItems: "center",
                            justifyContent: "space-between"

                        }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                //backgroundColor: "blue",
                                borderWidth: 3,
                                borderColor: isDarkMode ? "gray" : "lightgray",
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Fontisto
                                name="heart-alt"
                                size={24}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        </View>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: 14
                            }}
                        >
                            Enregistrer
                        </Text>

                    </View>
                </View>
            )}






            <View
                style={{
                    width: "100%",
                    height: "10%",
                    borderTopWidth: 2,
                    borderColor: isDarkMode ? "#343232" : "lightgray",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "80%",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 20
                    }}>




                    {post.likers && post.likers.length > 0 ? (
                        post.likers.length === 1 ? (
                            <>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={{ uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.picture }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 30
                                        }}
                                    />

                                </View>
                                <Text
                                    style={{
                                        paddingLeft: 10,
                                        fontSize: 16,
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                    }}>
                                    {t("LikeThat")} {""}
                                    <Text
                                        style={{
                                            paddingLeft: 10,
                                            fontSize: 16,
                                            fontWeight: "600"
                                        }}
                                    >
                                        {!isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.pseudo}

                                    </Text>
                                </Text>
                            </>


                        ) : (
                            <>

                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 30
                                    }}
                                >
                                    <Image
                                        source={{ uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.picture }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 30
                                        }}
                                    />

                                </View>
                                <Text
                                    style={{
                                        paddingLeft: 10,
                                        fontSize: 16,
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                    }}>
                                    {t("LikeThat")} {""}
                                    <Text
                                        style={{
                                            paddingLeft: 10,
                                            fontSize: 16,
                                            fontWeight: "600"
                                        }}
                                    >
                                        {!isEmpty(usersData[0]) && usersData.find((user) => user._id === post.likers[0])?.pseudo}
                                    </Text>
                                    {" "}

                                    {t("And")} {post.likers.length - 1} {t("OtherPerso")}
                                </Text>
                            </>
                        )
                    ) : (
                        <Text
                            style={{
                                paddingLeft: 10,
                                fontSize: 16,
                                fontWeight: "400",
                                color: isDarkMode ? "#F5F5F5" : "black",
                            }}
                        >
                            {t("NoOneLikedYet")}
                        </Text>
                    )}

                </View>

            </View>
            <View
                style={{
                    width: "100%",
                    height: "10%",
                    borderTopWidth: 2,
                    borderColor: isDarkMode ? "#343232" : "lightgray",
                    justifyContent: "center",
                }}
            >

            </View>

        </View>
    )
}

export default PostTools