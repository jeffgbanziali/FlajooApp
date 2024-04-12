import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
    Modal,
    Image,
    Dimensions,
    Alert,
    FlatList,
    Animated
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios";
import MessagesUser from "../../components/MessagesUser/MessageUser/MessagesUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from "react-i18next";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



const ChatTools = ({ handleSendMessage, showImage, setShowImage, user, setSelectTools, selectedImage, setSelectedImage, newChat, setNewChat, selectedVideo, setSelectedVideo, selectedDocument, setSelectedDocument }) => {

    const [addText, setAddText] = useState(false);
    const [postText, setPostText] = useState('');
    const [height, setHeight] = useState(40);
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();




    const selectImage = async () => {
        try {
            console.log('Ouverture de la bibliothèque de médias...');
            const result = await launchImageLibrary({
                mediaType: 'mixed',
                allowsEditing: false,
                quality: 1,
            });

            if (!result.didCancel) {
                if (result.assets && result.assets.length > 0) {
                    const selectedAsset = result.assets[0];

                    if (selectedAsset.uri.endsWith('.mp4')) {
                        setSelectedVideo(selectedAsset);
                        setSelectedImage(null);
                        setShowImage(true);
                        console.log('Vidéo sélectionnée :', selectedAsset);
                    } else {
                        setSelectedImage(selectedAsset);
                        setSelectedVideo(null);
                        setShowImage(true);
                        console.log('Image sélectionnée :', selectedAsset);
                    }
                } else {
                    console.log('Aucun média sélectionné');
                }
            } else {
                console.log('Sélection annulée');
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du média :', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection du média.');
        }
    };


    const closeImageModal = () => {
        setShowImage(false);
    };
    const handlePress = () => {
        setAddText(!addText);
    };

    return (

        <>
            <Animated.View
                style={{
                    width: "100%",
                    height: "90%",
                    position: "absolute",
                    bottom: "13%",
                    justifyContent: "space-between",
                    alignItems: "center",

                }}
            >
                <Pressable
                    onPress={() => setSelectTools(false)}
                    style={{
                        width: "100%",
                        height: "60%",

                    }}
                >
                </Pressable>

                <View
                    style={{
                        width: "80%",
                        height: "40%",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: isDarkMode ? "#343434" : "#F7F4F4",
                        justifyContent: "center",
                        borderRadius: 10,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: isDarkMode ? 1 : 2,
                        },
                        shadowOpacity: isDarkMode ? 0.16 : 0.6,
                        shadowRadius: 3.84,
                        elevation: 2,
                    }}
                >
                    <View
                        style={{
                            width: 80,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "#115A05",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <MaterialCommunityIcons
                                name="file"
                                color="white"
                                size={28}
                            />

                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                fontSize: 15
                            }}
                        >
                            {t('Files')}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 80,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "pink",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Entypo
                                name="camera"
                                color="white"
                                size={28}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                fontSize: 15
                            }}>
                            {t('Camera')}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 80,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            onPress={selectImage}
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "#B803F8",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Ionicons
                                name="image"
                                color="white"
                                size={28}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                fontSize: 15
                            }}
                        >
                            {t('Gallery')}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 80,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "#A94626",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Fontisto
                                name="headphone"
                                color="white"
                                size={28}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                fontSize: 15
                            }}>
                            {t('Audio')}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "#D8EB66",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <MaterialCommunityIcons
                                name="map-marker"
                                color="white"
                                size={28}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                fontSize: 15
                            }}
                        >
                            {t('Location')}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 80,
                            height: 90,
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 60,
                                height: 60,
                                margin: 10,
                                borderRadius: 100,
                                backgroundColor: "#1DA2DB",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <FontAwesome5
                                name="user-friends"
                                color="white"
                                size={24}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 15,
                                color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                            }}
                        >
                            {t('Friends')}
                        </Text>
                    </View>

                </View>
            </Animated.View>






            <Modal
                visible={showImage}
                transparent={true}
                animationType="slide"
                onRequestClose={closeImageModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "null"}
                    style={{
                        flex: 1,

                    }}
                >
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: isDarkMode ? "black" : "black",
                        width: windowWidth,
                        height: windowHeight
                    }}>
                        <View
                            style={{
                                width: "100%",
                                height: 40,
                                marginTop: "12%",
                                justifyContent: "center",
                                position: "absolute",
                                zIndex: 2,
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
                                        color: "white",
                                    }}
                                    multiline
                                    numberOfLines={4}
                                    maxLength={40}
                                    value={postText}
                                    onChangeText={(text) => setPostText(text)}
                                    editable
                                    placeholder={t('TextInputStory')}
                                    placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                                    fontSize="20"
                                    color={isDarkMode ? "#F5F5F5" : "white"} />
                            </View>
                        )}


                        <View
                            style={{
                                width: "100%",
                                height: "14%",
                                bottom: "3%",
                                position: "absolute",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "column",
                                zIndex: 1,
                            }}
                        >
                            <View
                                style={{
                                    width: "90%",
                                    height: Math.max(50, height),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    backgroundColor: isDarkMode ? "#343434" : "#F7F4F4",
                                    borderRadius: 30,
                                    padding: 10
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 100,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <AntDesign name="smile-circle" size={28} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                                </TouchableOpacity>
                                <TextInput
                                    value={newChat}
                                    onChangeText={(text) => setNewChat(text)}
                                    onContentSizeChange={(e) =>
                                        setHeight(e.nativeEvent.contentSize.height)
                                    }
                                    style={{

                                        width: "67%",
                                        borderColor: isDarkMode ? "#343434" : "#F7F4F4",
                                        borderWidth: 2,
                                        marginLeft: "2%",
                                        color: isDarkMode ? "#F7F4F4" : "#5E5E5E",
                                        textAlignVertical: 'center',
                                        height: Math.max(50, height),
                                        paddingTop: 8,
                                    }}
                                    placeholder={t('placeholder')}
                                    placeholderTextColor={isDarkMode ? "lightgray" : "gray"}
                                    backgroundColor={isDarkMode ? "#343434" : "#F7F4F4"}
                                    fontSize={22}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    height: "50%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <View

                                    style={{
                                        flex: 1,
                                        maxWidth: 180,
                                        minWidth: 60,
                                        height: "80%",
                                        backgroundColor: isDarkMode ? "#343434" : "#262626",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: "2.5%",
                                        flexDirection: "row",
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            textAlign: "center",
                                            color: isDarkMode ? "lightgray" : "#B8B8B8",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {user.pseudo}
                                    </Text>

                                </View>
                                <TouchableOpacity
                                    onPress={handleSendMessage}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        marginRight: "2.5%",
                                        backgroundColor: "red",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 100,
                                        flexDirection: "row",
                                        zIndex: 1,
                                    }}
                                >
                                    <Ionicons
                                        name="send"
                                        size={26}
                                        color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </KeyboardAvoidingView>

            </Modal>

        </>
    )
}

export default ChatTools