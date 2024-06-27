import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PostSendingHeader = ({ isDarkMode, t, userData }) => (
    <>
        <View
            style={{
                width: 30,
                height: 6,
                alignSelf: 'center',
                backgroundColor: 'gray',
                marginTop: 10,
                borderRadius: 5,
            }}
        />
        <View
            style={{
                height: "16%",
                width: "92%",
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: isDarkMode ? "#202020" : "#D9D9D9",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            <View
                style={{
                    height: 40,
                    width: 40,
                    borderRadius: 30,
                    marginLeft: 8,
                }}
            >
                <Image
                    source={{ uri: userData.picture }}
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 30,
                    }}
                />
            </View>
            <View
                style={{
                    height: "100%",
                    width: "52%",
                    marginLeft: 8,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{
                    color: isDarkMode ? "#FFFFFF" : "black",
                    fontSize: 16,
                    fontWeight: "500"
                }}>
                    {t("EditAndShare")}
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    height: 40,
                    width: 90,
                    backgroundColor: "red",
                    marginLeft: 8,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: isDarkMode ? "#FFFFFF" : "black", fontSize: 15, fontWeight: "500" }}>
                    {t("SharingStory")}
                </Text>
            </TouchableOpacity>
        </View>
    </>
);

export default PostSendingHeader;
