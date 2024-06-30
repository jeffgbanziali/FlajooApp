import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RepostPostEdit from './RepostPostEdit';

const ShareSection = ({ isDarkMode, t, postSenderPost, toggleSending }) => {



    const [modalRepostVisible, setModalReposVisible] = useState(false);
    const [text, setText] = useState("");

    const closeRepostModel = () => {
        setModalReposVisible(false);
    }

    const replyPost = () => {
        setModalReposVisible(true)
    }


    return (





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
                <TouchableOpacity
                    onPress={replyPost}
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
                </TouchableOpacity>

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

            <RepostPostEdit
                closeModel={closeRepostModel}
                isDarkMode={isDarkMode}
                t={t}
                modalVisible={modalRepostVisible}
                toggleSending={toggleSending}
                postSenderPost={postSenderPost}


            />
        </View >
    )
}

export default ShareSection;
