import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { USER } from '../../../../Data/Users';
import { getStories, getStoriesWithViews } from '../../../../actions/story.action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatPostDate, isEmpty } from '../../../Context/Utils';
import { useDarkMode } from '../../../Context/AppContext';
import { useTranslation } from 'react-i18next';



const StoriesViewUser = ({ story }) => {
    const [loadStories, setLoadStories] = useState(true);
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.usersReducer);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();




    const storiesViewer = story.views.sort((a, b) => {
        return new Date(b.viewed_at) - new Date(a.viewed_at);
    });





    useEffect(() => {
        if (loadStories) {
            dispatch(getStories());
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);




    const renderItem = ({ item, index }) => {



        return (
            <View
                key={index}
                style={{
                    width: '100%',
                    //backgroundColor: "red",
                    marginTop: "1%",
                }}>

                {
                    item.viewerId !== story.posterId && (
                        <View
                            style={{
                                width: '100%',
                                height: 60,
                                paddingLeft: '4%',
                                alignItems: 'center',
                                flexDirection: 'row',


                            }}>
                            <View
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 100,

                                }}>
                                <Image
                                    source={{
                                        uri:
                                            !isEmpty(usersData) &&
                                            usersData
                                                .map((user) => {
                                                    if (user._id === item.viewerId)
                                                        return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                                    else return null;
                                                })
                                                .join(""),
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 100,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'space-evenly',
                                    paddingLeft: '5%',
                                    //backgroundColor: "red"

                                }}>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        letterSpacing: 1,
                                        fontWeight: '500',
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                    }}>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id === item.viewerId) return user.pseudo;
                                            else return null;
                                        })}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'normal',
                                        color: isDarkMode ? "gray" : "gray",
                                    }}>
                                    {formatPostDate(item.viewed_at)}
                                </Text>
                            </View>
                        </View>
                    )
                }


            </View>
        );
    };

    return (
        <View
            style={{
                height: "66%",
                width: "100%",
                shadowColor: "#000",
                //backgroundColor: "red",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 40,
                    //backgroundColor: 'black',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        //backgroundColor: "green",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '500',
                            color: isDarkMode ? "#F5F5F5" : "black",
                        }}>
                        {t('ViewerBy')}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '500',
                            paddingLeft: "2%",
                            color: isDarkMode ? "#F5F5F5" : "black",
                        }}>
                        {storiesViewer.length}
                    </Text>
                </View>

            </View>
            <FlatList
                data={storiesViewer}
                keyExtractor={(item, index) => index.toString()} // Convertir en chaîne
                renderItem={renderItem}
            />
        </View>
    );
};

export default StoriesViewUser;
