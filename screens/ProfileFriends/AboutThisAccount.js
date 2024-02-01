import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../components/Context/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { formatPostDate, timestampParser } from '../../components/Context/Utils';


const AboutThisAccount = () => {

    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const usersData = useSelector((state) => state.usersReducer);
    const route = useRoute();
    const { id } = route.params;

    const users = usersData.find((user) => user._id === id);





    const retourToFriends = () => {
        console.log("clicked");
        navigation.goBack();
    }


    console.log("viens me voir ", users)





    return (
        <SafeAreaView
            style={{
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                flex: 1,
                width: "100%",
                height: "100%"
            }}
        >
            <View
                style={{
                    paddingBottom: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity onPress={() => retourToFriends()}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        //backgroundColor: "blue",
                        borderRadius: 30,
                    }}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={28}
                        color={isDarkMode ? "white" : "black"}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 30,
                        color: isDarkMode ? "white" : "black",
                        fontWeight: "500",
                        marginLeft: 10,
                    }}>
                    {t('ToPoperst')}
                </Text>
            </View>


            <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                }}>
                <View
                    style={{
                        width: "100%",
                        height: "20%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <View
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 100,
                            backgroundColor: "red",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Image
                            source={{
                                uri: users.picture,
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                                objectFit: "cover",
                            }}
                        />

                    </View>

                </View>

                <View
                    style={{
                        width: "100%",
                        height: "5%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "600",
                            marginLeft: 10,
                        }}
                    >
                        {users.pseudo}
                    </Text>

                </View>

                <View
                    style={{
                        width: "100%",
                        height: "10%",
                        // backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                </View>

                <View
                    style={{
                        width: "100%",
                        height: "20%",
                        //backgroundColor: "blue",
                        alignItems: "center",
                    }}>

                    <View
                        style={{
                            width: "100%",
                            height: "30%",
                            //backgroundColor: "red",
                            alignItems: "center",
                            flexDirection: "row",
                            paddingLeft: 20
                        }}>
                        <View
                            onPress={() => retourToFriends()}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 40,
                                height: 40,
                                //backgroundColor: "blue",
                                borderRadius: 30,
                            }}
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={35}
                                color={isDarkMode ? "white" : "black"}
                            />
                        </View>

                        <Ionicons />
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                //backgroundColor: "red",
                                justifyContent: "center",
                                paddingLeft: 10
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: isDarkMode ? "white" : "black",
                                    fontWeight: "500",
                                }}>
                                Date d'inscription
                            </Text>
                            <Text
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                    fontWeight: "400",
                                    fontSize: 16,
                                }}>
                                {timestampParser(users.createdAt)}
                            </Text>
                        </View>



                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: "30%",
                            //backgroundColor: "yellow",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>


                    </View>

                </View>




            </View>
        </SafeAreaView >
    )
}

export default AboutThisAccount