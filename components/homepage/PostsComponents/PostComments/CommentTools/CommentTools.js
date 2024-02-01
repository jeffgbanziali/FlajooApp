import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDarkMode } from '../../../../Context/AppContext';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import DeletteCommentButton from '../AddButtom/DeletteCommentButton';





const CommentTools = ({ post, comment, areYouPressComment }) => {
    const userData = useSelector((state) => state.userReducer);


    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    console.log("comment vas-tu ?",)



    return (
        <>

            {/*
                isCurrentUserCommenterOrReplier ?
                    (
                        <>
                            <View
                                style={{

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 400,
                                    height: 140,
                                    borderRadius: 30,
                                }}
                            >

                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 30,
                                        backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}
                                >

                                    <TouchableOpacity
                                        style={{
                                            width: "100%",
                                            height: "45%",
                                            flexDirection: "row",
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            //backgroundColor: "red",
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

                                    <TouchableOpacity
                                        style={{
                                            width: "100%",
                                            height: "45%",
                                            //backgroundColor: "blue",
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
                                            {t("Copy")}
                                        </Text>

                                    </TouchableOpacity>

                                </View>




                            </View>
                        </>
                    ) : (

                        <>
                           
                        </>*/}

            <View
                style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 400,
                    height: 280,
                    borderRadius: 30,
                }}
            >



                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 30,
                        backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >

                    <TouchableOpacity
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
                            {t("SendFriends")}
                        </Text>

                    </TouchableOpacity>




                    <TouchableOpacity
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
                            {t("ToTrad")}
                        </Text>

                    </TouchableOpacity>




                    <TouchableOpacity
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
                            {t("SignalPub")}
                        </Text>

                    </TouchableOpacity>



                    <DeletteCommentButton post={post} comment={comment} areYouPressComment={areYouPressComment} />




                </View>




            </View>

        </>
    );

}

export default CommentTools