import { View, Text, Pressable } from 'react-native'
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
                        <AntDesign
                            name="staro"
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
            {uid && favorite && (
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
                        <AntDesign
                            name="star"
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

export default SavePost