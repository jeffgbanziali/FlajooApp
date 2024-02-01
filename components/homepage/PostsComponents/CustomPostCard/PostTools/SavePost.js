import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UidContext, useDarkMode } from '../../../../Context/AppContext';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addFavoPost, removeFavoPost } from '../../../../../actions/user.action';








const SavePost = ({ post }) => {



    const { uid } = useContext(UidContext);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [favorite, setFavorite] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    const addFavorite = () => {
        dispatch(addFavoPost(uid, post._id));
        setFavorite(true);
    };

    const removeFavorite = () => {
        dispatch(removeFavoPost(uid, post._id));
        setFavorite(false);
    };

    console.log("Mes favoris", userData.favoritePost)



    useEffect(() => {
        if (userData.favoritePost.includes(post._id))
            setFavorite(true);
        else
            setFavorite(false);
    }, [post._id, userData.favoritePost, favorite]);



    return (
        <>
            {uid && favorite == false && (
                <TouchableOpacity
                    onPress={addFavorite}
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

                        <AntDesign
                            name="staro"
                            size={30}
                            color={isDarkMode ? "gray" : "black"} />
                        <Text
                            style={{
                                color: isDarkMode ? "gray" : "black",
                                fontWeight: "500",
                                fontSize: 20,
                                paddingLeft: 10,
                            }}
                        >
                            {t("AddFavo")}
                        </Text>
                    </View>


                </TouchableOpacity>
            )}
            {uid && favorite && (
                <TouchableOpacity
                    onPress={removeFavorite}
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

                        <AntDesign
                            name="star"
                            size={30}
                            color={isDarkMode ? "gray" : "black"} />
                        <Text
                            style={{
                                color: isDarkMode ? "gray" : "black",
                                fontWeight: "500",
                                fontSize: 20,
                                paddingLeft: 10,
                            }}
                        >
                            {t("RemoveFavo")}
                        </Text>
                    </View>


                </TouchableOpacity>
            )}


        </>

    )
}

export default SavePost