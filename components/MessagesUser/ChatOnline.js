import { View, Text, Image } from 'react-native'
import React from 'react'
import { useDarkMode } from '../Context/AppContext';
import { USER } from '../../Data/Users';



const ChatOnline = ({ user }) => {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            {
                USER.map((user, index) => (
                    <View
                        key={index}

                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: "100%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginLeft: "2%"
                        }}
                    >

                        <>
                            <View
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 100,
                                    alignContent: 'center',
                                    //borderColor: "#3B4FB8",
                                    //padding: 2,
                                    //borderWidth: 4,
                                }}>
                                <Image source={{ uri: user.image }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 100,
                                        alignContent: 'center',
                                        resizeMode: "cover"
                                    }}

                                />
                            </View>

                            <View style={{
                                backgroundColor: "#09C03C",
                                position: "absolute",
                                left: 48,
                                width: 20,
                                height: 20,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: "#E9C8C8",
                                justifyContent: "center",
                                alignSelf: "center",
                                alignItems: "center",
                                top: 60,
                                zIndex: 100
                            }}>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#fff',
                                }}
                            >
                                {user.user}
                            </Text>
                        </>

                    </View>
                ))
            }
        </>

    )
}

export default ChatOnline