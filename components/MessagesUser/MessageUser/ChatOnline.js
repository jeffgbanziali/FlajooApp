import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useDarkMode } from '../../Context/AppContext';
import { USER } from '../../../Data/Users';
import { useSelector } from 'react-redux';

const ChatOnline = ({ user }) => {
    const { isDarkMode, usersOnline, isConnected } = useDarkMode();

    const usersData = useSelector((state) => state.usersReducer);
    const firstTenUsers = usersData.slice(10, 40);

    const MAX_MESSAGE_LENGTH = 8;
    const renderLimitedMessage = (message) => {
        if (message && message.length <= MAX_MESSAGE_LENGTH) {
            return message;
        } else if (message) {
            return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
        } else {
            return "";
        }
    };





    const renderItem = ({ item }) => {

        const isUserOnline = usersOnline.some(onlineUse => onlineUse.id === item._id) && isConnected;
        console.log("Mon profile est en ligne:", isUserOnline)

        return (


            <View
                style={{
                    flexDirection: 'column',
                    height: "100%",
                    width: 80,
                    alignItems: "center",
                    justifyContent: 'center',
                    //backgroundColor: "blue",
                    marginLeft: 10

                }}
            >
                <View
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        alignContent: 'center',
                    }}>
                    <Image source={{ uri: item.picture }}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </View>

                {isUserOnline && (
                    <View
                        style={{
                            backgroundColor: "#09C03C",
                            position: "absolute",
                            left: 58,
                            width: 14,
                            height: 14,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                            //top: 60,
                            bottom: 60,
                            zIndex: 100
                        }}>
                    </View>
                )}

                <View
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 6
                    }}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: isDarkMode ? "#F5F5F5" : "black",
                        }}
                    >
                        {renderLimitedMessage(item.pseudo)}
                    </Text>
                </View>

            </View>
        );
    }



    return (
        <View
            style={{
                height: "50%",
                width: "100%",
                flexDirection: "row",
                //backgroundColor: "blue",
                justifyContent: "center",
                marginTop: 10
            }}
        >
            <FlatList
                data={firstTenUsers}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

    );
}

export default ChatOnline;
