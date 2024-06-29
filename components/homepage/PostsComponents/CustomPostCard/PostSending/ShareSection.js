import React from 'react';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ShareSection = ({ isDarkMode, t }) => (
    <View
        style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
        }}
    >
        <View
            style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: 20,
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 4
                }}>
                <View
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: isDarkMode ? "#202020" : "#D9D9D9",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <AntDesign
                        name="sync"
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
                    {t('Républier')}
                </Text>
            </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 4

                }}>
                <View
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: isDarkMode ? "#202020" : "#D9D9D9",
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

        </View>
    </View>
);

export default ShareSection;
