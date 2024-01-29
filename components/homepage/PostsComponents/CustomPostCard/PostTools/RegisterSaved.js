import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UidContext, useDarkMode } from '../../../../Context/AppContext';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addSavedPost, removeSavedPost } from '../../../../../actions/user.action';








const RegisterSaved = ({ post }) => {



    const { uid } = useContext(UidContext);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [save, setSave] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    const addFavorite = () => {
        dispatch(addSavedPost(uid, post._id));
        setSave(true);
    };

    const removeFavorite = () => {
        dispatch(removeSavedPost(uid, post._id));
        setSave(false);
    };

    console.log("Mes favoris", userData.favoritePost)



    useEffect(() => {
        if (userData.savedPost.includes(post._id))
            setSave(true);
        else
            setSave(false);
    }, [post._id, userData.savedPost, save]);



    return (
        <>
            {uid && save == false && (
                <View
                    style={{
                        width: 90,
                        height: 90,
                        alignItems: "center",
                        justifyContent: "space-between"

                    }}>

                    <Pressable
                        onPress={addFavorite}
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
                        <Ionicons
                            name="bookmark-outline"
                            size={30}
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
                        {t("AddFav")}
                    </Text>

                </View>
            )}
            {uid && save && (
                <View
                    style={{
                        width: 90,
                        height: 90,
                        alignItems: "center",
                        justifyContent: "space-between"

                    }}>

                    <Pressable
                        onPress={removeFavorite}
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
                        <Ionicons
                            name="bookmark"
                            size={30}
                            color={isDarkMode ? "yellow" : "yellow"}

                        />
                    </Pressable>
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 14
                        }}
                    >
                        {t("remoFav")}
                    </Text>

                </View>
            )}


        </>

    )
}

export default RegisterSaved