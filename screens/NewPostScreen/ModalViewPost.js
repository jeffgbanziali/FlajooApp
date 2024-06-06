import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Dimensions, Image, SafeAreaView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, getPosts } from '../../actions/post.actions';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { uploadImageToFirebase } from '../../Data/FireStore';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import { FlatList } from 'react-native';


const ModalViewPost = ({ closeImageModal, windowWidth, handlePostSubmit, addText, selectedMediaArray, handlePress }) => {
    const { isDarkMode } = useDarkMode();
    const [postText, setPostText] = useState('');
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

            <FlatList
                horizontal
                data={selectedMediaArray}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: windowWidth,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            //backgroundColor: "red"
                        }}
                    >
                        {(item.type === 'image/jpg' || item.type === 'image/png') && (
                            <Image
                                source={{ uri: item.uri }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain"
                                }}
                            />
                        )}
                        {(item.type === 'video/mp4' || item.type === "video/mp3") && (
                            <Video
                                source={{ uri: item.uri }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "contain"

                                }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                shouldPlay
                                isLooping
                            />
                        )}
                    </View>
                )}
            />


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
                        padding: 5,
                        bottom: "20%",
                    }}
                >
                    <TextInput
                        style={{
                            width: "100%",
                            height: "100%",
                            paddingLeft: 12,
                            fontSize: 10,
                            fontWeight: "normal",
                            overflow: "hidden",
                            color: "green",
                        }}
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        value={postText}
                        onChangeText={(text) => setPostText(text)}
                        editable
                        placeholder={t('TextInputStory')}
                        placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                        fontSize={20}
                        color={isDarkMode ? "#F5F5F5" : "white"} />
                </View>
            )}
            <View
                style={{
                    width: "100%",
                    height: "10%",
                    bottom: "3%",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingRight: 14,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity
                    onPress={handlePostSubmit}
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

export default ModalViewPost