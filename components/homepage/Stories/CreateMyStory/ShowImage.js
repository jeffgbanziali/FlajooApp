import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';

const ShowImage = ({ selectedImage, addText, postText,selectedEffect, handleAddEffect, setPostText, handlePress, handleStorySubmit, isDarkMode, selectedVideo, closeImageModal }) => {

    const { t } = useTranslation();

    return (
        <SafeAreaView>
            <View
                style={{
                    width: "100%",
                    height: "5%",
                    justifyContent: "center",
                    //backgroundColor: "blue",
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2%",
                    }}
                    onPress={closeImageModal}
                >
                    <Entypo name="cross" size={36} color="white" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    //backgroundColor: "red",
                    width: "100%",
                    height: "85%",
                    alignItems: "center",

                }}>
                {selectedImage && !selectedVideo && (

                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain"
                        }}
                    />
                )}

                {selectedVideo && (

                    <Video
                        source={{ uri: selectedVideo.uri }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                    />

                )}
                <View
                    style={{
                        width: "100%",
                        height: "20%",
                        marginTop: "20%",
                        alignItems: "flex-end",
                        position: "absolute",
                        zIndex: 1,
                    }}
                >
                    <TouchableOpacity
                        onPress={handlePress}
                        style={{
                            width: "25%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginRight: "2%",
                            flexDirection: "row",
                            padding: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                marginRight: 12,
                                fontWeight: "600",
                            }}
                        >
                            {t('Text')}
                        </Text>
                        <Ionicons
                            name="text"
                            size={30}
                            color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: "25%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginRight: "2%",
                            marginTop: "2%",
                            flexDirection: "row",
                            padding: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                marginRight: 12,
                                fontWeight: "600",
                            }}
                        >
                            {t('Song')}
                        </Text>
                        <Ionicons
                            name="musical-notes"
                            size={30}
                            color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleAddEffect}
                        style={{
                            width: "30%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginRight: "2%",
                            marginTop: "2%",
                            flexDirection: "row",
                            padding: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                marginRight: 12,
                                fontWeight: "600",
                            }}
                        >
                            {t('Effects')}
                        </Text>
                        <Entypo
                            name="adjust"
                            size={30}
                            color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                        />
                    </TouchableOpacity>
                </View>
                {addText && (
                    <View
                        style={{
                            width: "100%",
                            height: "20%",
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 5,
                            //backgroundColor: "green",
                            bottom: "10%",
                        }}
                    >
                        <TextInput
                            style={{
                                width: "100%",
                                padding: 5,
                                //backgroundColor: "red",
                                height: "80%",
                                paddingLeft: 12,
                                fontSize: 10,
                                fontWeight: "normal",
                                overflow: "hidden",
                                color: "white",
                            }}
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            value={postText}
                            onChangeText={(text) => setPostText(text)}
                            editable
                            placeholder="Leave a short text..."
                            placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                            fontSize={20}
                            color={isDarkMode ? "#F5F5F5" : "white"} />
                    </View>
                )}

            </View>

            <View
                style={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    position: "relative",
                    alignItems: "flex-end",
                    paddingRight: 14,
                    //backgroundColor: "blue",
                    zIndex: 1,
                }}
            >
                <TouchableOpacity
                    onPress={handleStorySubmit}
                    style={{
                        width: 100,
                        height: 40,
                        backgroundColor: isDarkMode ? "#E52C2C" : "#2B60E8",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        flexDirection: "row",
                        zIndex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: "white"
                        }}>
                        {t('AddPost')}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ShowImage