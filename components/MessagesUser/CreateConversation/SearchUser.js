import { View, Text, Image, SafeAreaView, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../Context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';



const SearchUser = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector((state) => state.usersReducer);
    const firstTenUsers = searchResults.slice(10, 40);

    const [checkedItems, setCheckedItems] = useState({});

    const onToggleCheckUser = (index) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]

        }));
    }




    const renderItem = ({ item, index }) => {

        const isChecked = checkedItems[index];


        return (


            <Pressable
                onPress={() => onToggleCheckUser(index)}
                style={{
                    width: "100%",
                    height: 80,
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 2,
                }}>

                <View
                    style={{
                        width: "20%",
                        height: "80%",
                        justifyContent: "center",
                        //backgroundColor: "blue",
                        paddingLeft: 4,
                        alignItems: "center",
                    }}>
                    <Image
                        source={{
                            uri:
                                item.picture ||
                                "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                        }}
                    />
                </View>


                <View
                    style={{
                        width: "68%",
                        height: "80%",
                        //backgroundColor: "green",
                        paddingTop: 10
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                        }}>
                        {item.firstName} {item.lastName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                        }}>
                        {" "}@{item.pseudo}
                    </Text>
                </View>

                <View
                    style={{
                        width: "12%",
                        height: "80%",
                        //backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            //backgroundColor: "green",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        {

                            isChecked ? (
                                <AntDesign
                                    name="checkcircle"
                                    size={24}
                                    color={isDarkMode ? "red" : "red"} />

                            ) : (
                                <View
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        borderColor: "gray"
                                    }}>

                                </View>

                            )
                        }


                    </View>

                </View >





            </Pressable >


        )
    }










    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            style={{
                width: "100%",
                height: "84%",
                paddingBottom: 10,

                //backgroundColor: "green",
            }}>



            <View
                style={{
                    width: "100%",
                    height: "84%",
                    //backgroundColor: "blue",
                }}>
                <GestureHandlerRootView>

                    <FlatList
                        onEndReachedThreshold={0.5}

                        data={firstTenUsers}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        ListHeaderComponent={() => (
                            <View
                                style={{
                                    width: "100%",
                                    height: 40,
                                    //backgroundColor: "red",
                                    justifyContent: "center",
                                    paddingLeft: 10
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                    }}>
                                    {t("Suggested")}
                                </Text>
                            </View>
                        )}

                    />
                </GestureHandlerRootView >
            </View>


            <View
                style={{
                    width: "100%",
                    height: "16%",
                    //backgroundColor: "blue",
                    justifyContent: "center",
                    position: "relative",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        width: 320,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                        }}>
                        {t("CreateDiscuss")}
                    </Text>

                </View>

            </View>


        </KeyboardAvoidingView >

    )
}

export default SearchUser