
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDarkMode } from '../../../../Context/AppContext';
import { isEmpty } from '../../../../Context/Utils';
import { useTranslation } from 'react-i18next';
import DeleteButton from './DeleteButton';
import ModifyPostButton from './ModifyPostButton';
import SavePost from './SavePost';
import QRCode from './QRCode';
import FollowHandler from '../../../../ProfileUtils.js/FollowHandler';
import RegisterSaved from './RegisterSaved';
import { useNavigation, useRoute } from "@react-navigation/native";




const PostTools = ({ post, toggleToolings }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();




    const goToAbout = (id) => {
        console.log("clicked");
        navigation.navigate("AboutThisAccount", { id });
        toggleToolings()
    }




    return (
        <View
            style={{
                width: "100%",
                height: "90%",
                //backgroundColor:"red"
            }}>


            {post.posterId === userData._id ? (
                <>
                    <View
                        style={{
                            width: "100%",
                            height: "18%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                        }}
                    >
                        <DeleteButton toggleToolings={toggleToolings} post={post} />
                        <ModifyPostButton />



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
                                <Fontisto
                                    name="heart-alt"
                                    size={24}
                                    color={isDarkMode ? "#F5F5F5" : "black"}

                                />
                            </View>
                            <Text
                                style={{
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    fontWeight: "600",
                                    fontSize: 14
                                }}
                            >
                                {t("AddFav")}
                            </Text>

                        </View>
                    </View>



                    <View
                        style={{
                            width: "100%",
                            height: "8%",
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
                                paddingLeft: 20,

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
                                                fontSize: 14,
                                                color: isDarkMode ? "gray" : "black",
                                            }}>
                                            {t("LikeThat")} {""}
                                            <Text
                                                style={{
                                                    color: isDarkMode ? "gray" : "black",
                                                    paddingLeft: 10,
                                                    fontSize: 16,
                                                    fontWeight: "600"
                                                }}
                                            >
                                                {t("You")}

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
                                                color: isDarkMode ? "gray" : "black",
                                                paddingLeft: 10,
                                                fontSize: 14,
                                                color: isDarkMode ? "gray" : "lightgray"
                                            }}>
                                            {t("LikeThat")} {""}
                                            <Text
                                                style={{
                                                    color: isDarkMode ? "gray" : "black",
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
                                        color: isDarkMode ? "gray" : "black",
                                        fontSize: 14,
                                        fontWeight: "400",
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                    }}
                                >
                                    {t("NoOneLikedYet")}
                                </Text>
                            )}

                        </View>
                    </View>



                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>

                            <Feather
                                name="share-2"
                                size={24}
                                color={isDarkMode ? "gray" : "black"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("Share")}
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <FontAwesome5
                                name="user-friends"
                                size={24}
                                color={isDarkMode ? "gray" : "black"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("Identify")}
                            </Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            //borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <Ionicons
                                name="information-circle-outline"
                                size={26}
                                color={isDarkMode ? "gray" : "black"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("WhatSeePub")}
                            </Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            //borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <MaterialIcons
                                name="report-problem"
                                size={26}
                                color={isDarkMode ? "red" : "red"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("SignalPub")}
                            </Text>
                        </View>


                    </TouchableOpacity>
                </>


            ) : (
                <>


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
                        <RegisterSaved post={post} />

                        <QRCode />

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
                        <View
                            style={{
                                width: "100%",
                                height: "80%",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingLeft: 20,

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
                                                fontSize: 14,
                                                color: isDarkMode ? "gray" : "lightgray",
                                            }}>
                                            {t("LikeThat")} {""}
                                            <Text
                                                style={{
                                                    color: isDarkMode ? "gray" : "black",
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
                                                fontSize: 14,
                                                color: isDarkMode ? "gray" : "black",
                                            }}>
                                            {t("LikeThat")} {""}
                                            <Text
                                                style={{
                                                    color: isDarkMode ? "gray" : "black",
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
                                        color: isDarkMode ? "gray" : "black",
                                        fontSize: 14,
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
                        <View
                            style={{
                                width: "100%",
                                height: "80%",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingLeft: 20,

                            }}>

                        </View>
                    </View>


                    <View
                        style={{
                            width: "100%",
                            height: "20%",
                            borderTopWidth: 2,
                            borderBottomWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            justifyContent: "center",
                            alignContent: 'center',
                            //backgroundColor: "red"

                        }}
                    >

                        <TouchableOpacity
                            onPress={() => goToAbout(post.posterId)}
                            style={{
                                width: "100%",
                                height: "50%",
                                borderColor: isDarkMode ? "#343232" : "lightgray",
                                //backgroundColor: "red",
                                alignItems: "center",
                                flexDirection: "row"

                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    //backgroundColor: "green",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingLeft: 20,

                                }}>
                                <Feather
                                    name="user"
                                    size={24}
                                    color={isDarkMode ? "gray" : "black"} />
                                <Text
                                    style={{
                                        color: isDarkMode ? "gray" : "black",
                                        fontWeight: "500",
                                        fontSize: 18,
                                        paddingLeft: 10,
                                    }}
                                >
                                    {t("AccountInfos")}
                                </Text>
                            </View>


                        </TouchableOpacity>

                        <View
                            style={{
                                width: "100%",
                                height: "50%",
                                justifyContent: "center",
                                alignContent: 'center',
                                //backgroundColor: "green"

                            }}>
                            <FollowHandler idToFollow={post.posterId} type={"PostTools"} />

                        </View>

                    </View>

                    <SavePost post={post} />

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <Feather
                                name="eye-off"
                                size={24}
                                color={isDarkMode ? "gray" : "black"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("ToMask")}
                            </Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            //borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <Ionicons
                                name="information-circle-outline"
                                size={24}
                                color={isDarkMode ? "gray" : "black"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("WhatSeePub")}
                            </Text>
                        </View>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "10%",
                            //borderTopWidth: 2,
                            borderColor: isDarkMode ? "#343232" : "lightgray",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row"

                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "green",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingLeft: 20,

                            }}>
                            <MaterialIcons
                                name="report-problem"
                                size={24}
                                color={isDarkMode ? "red" : "red"} />
                            <Text
                                style={{
                                    color: isDarkMode ? "gray" : "black",
                                    fontWeight: "500",
                                    fontSize: 18,
                                    paddingLeft: 10,
                                }}
                            >
                                {t("SignalPub")}
                            </Text>
                        </View>


                    </TouchableOpacity>


                </>


            )}






        </View >
    )
}

export default PostTools