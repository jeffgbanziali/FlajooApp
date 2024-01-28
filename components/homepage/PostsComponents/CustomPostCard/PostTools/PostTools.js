
import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSelector } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDarkMode } from '../../../../Context/AppContext';
import { isEmpty } from '../../../../Context/Utils';
import { useTranslation } from 'react-i18next';
import DeleteButton from './DeleteButton';
import ModifyPostButton from './ModifyPostButton';
import SavePost from './SavePost';
import QRCode from './QRCode';



const PostTools = ({ post, toggleToolings }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();








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
                    <SavePost post={post} />

                    <QRCode />
                   
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