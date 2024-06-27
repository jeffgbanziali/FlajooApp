import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const UserList = ({ firstTenUsers, isDarkMode, t }) => {


    const renderPost = ({ item, index }) => {

        return (
            <View
                style={{
                    width: 90,
                    height: "100%",
                    alignItems: "center",
                    backgroundColor: "red",
                    marginTop: 8,
                }}
            >
                <Image
                    source={{ uri: item.picture }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                    }}
                />
                <Text
                    style={{
                        marginTop: 8,
                        fontSize: 14,
                        fontWeight: "500",
                        color: isDarkMode ? "#FFFFFF" : "black",
                    }}
                >
                    {item.pseudo}
                </Text>
            </View>
        );
    };






    return (

        <View
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
            }}
        >
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={firstTenUsers}
                renderItem={renderPost}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View
                        style={{
                            width: 100,
                            height: 120,
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Entypo
                                name="dots-three-horizontal"
                                size={20}
                                color={isDarkMode ? "white" : "black"}
                            />
                        </View>
                        <Text
                            style={{
                                marginTop: 8,
                                fontSize: 14,
                                fontWeight: "500",
                                color: isDarkMode ? "#FFFFFF" : "black",
                            }}
                        >
                            {t('Plus')}
                        </Text>
                    </View>
                }
            />


        </View>
    )

};



export default UserList;
