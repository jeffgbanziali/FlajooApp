import { View, Text, Image, SafeAreaView, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { UidContext, useDarkMode } from '../../Context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { createConversation } from '../../../actions/conversation.action';



const SearchUser = ({ onSelectUser }) => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const { uid } = useContext(UidContext);
    const searchResults = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const firstTenUsers = searchResults.sort((a, b) => {
        const nameA = a.firstName || '';
        const nameB = b.firstName || '';
        return nameA.localeCompare(nameB);
    });

    const [users, setUsers] = useState([]);

    const onToggleCheckUser = (index) => {
        const user = firstTenUsers[index];

        const isSelected = users.some((selectedReceiver) => selectedReceiver._id === user._id);

        if (isSelected) {
            const filteredUsers = users.filter((selectedReceiver) => selectedReceiver._id !== user._id);
            setUsers(filteredUsers);
        } else {
            setUsers([...users, user]);
        }

    }


    const handleCreateConversation = async () => {
        try {
            if (users.length === 0) {
                throw new Error("Aucun utilisateur sélectionné !");
            }

            const senderId = uid;

            for (const user of users) {
                const receiverId = user._id;
                dispatch(createConversation(senderId, receiverId));
                navigation.navigate("Chatlist", { user });
            }
            console.log("New conversation created")
        } catch (error) {
            console.error(error.message);
        }
    };





    const renderItem = ({ item, index }) => {

        const isChecked = users.some((selectedReceiver) => selectedReceiver._id === item._id);

        console.log("Toi lààààà", users);


        return (


            <Pressable
                onPress={() => onToggleCheckUser(index)}
                style={{
                    width: "100%",
                    //backgroundColor: "red",
                    height: 60,
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
                                    size={22}
                                    color={isDarkMode ? "red" : "red"} />

                            ) : (
                                <View
                                    style={{
                                        width: 22,
                                        height: 22,
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
                <Pressable
                    onPress={handleCreateConversation}
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

                </Pressable>

            </View>


        </KeyboardAvoidingView >

    )
}

export default SearchUser