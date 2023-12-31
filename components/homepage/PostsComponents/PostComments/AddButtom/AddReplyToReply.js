import { View, Text, Image, TouchableOpacity, TextInput, Pressable, Modal, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from "../../../../Context/AppContext";
import { getPosts, replyComment } from "../../../../../actions/post.actions";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../../../Context/Utils";
import Video from 'react-native-video';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SafeAreaView } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadMediaToFirebase } from '../../../../../Data/FireStore';



const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const AddReplyToReply = ({ post, selectedComment, selectedReply, partVisible }) => {
    const { isDarkMode } = useDarkMode();

    const [text, setText] = useState("");
    const [showImage, setShowImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [loadPost, setLoadPost] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (text.length > 0) {
            setIsButtonVisible(true);
        } else {
            setIsButtonVisible(false);
        }
    }, [text]);

    const commenterId = selectedComment._id



    const handleComment = async () => {
        try {

            let mediaUrl = null;
            let mediaType = null;

            if (selectedImage) {
                const mediaName = `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`;
                mediaUrl = await uploadMediaToFirebase(selectedImage.uri, mediaName, 'image');
                mediaType = 'image';
            } else if (selectedVideo) {
                const mediaName = `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`;
                mediaUrl = await uploadMediaToFirebase(selectedVideo.uri, mediaName, 'video');
                mediaType = 'video';
            }


            if (userData._id && (text || mediaType) && selectedReply) {


                const replyData = {
                    commentId: commenterId,
                    replierId: userData._id,
                    replierPseudo: userData.pseudo,
                    text: text,
                    repliedTo: {
                        replierToId: selectedReply.replierId,
                        replierToPseudo: selectedReply.replierPseudo,
                    },
                    //replyType
                };
                saveCommentLocally(
                    post._id,
                    replyData.commentId,
                    replyData.replierId,
                    replyData.replierPseudo,
                    replyData.text,
                    mediaUrl,
                    mediaType,
                    replyData.repliedTo

                );

                dispatch(
                    replyComment(
                        post._id,
                        replyData.commentId,
                        replyData.replierId,
                        replyData.replierPseudo,
                        replyData.text,
                        mediaUrl,
                        mediaType,
                        replyData.repliedTo

                    )
                );




                dispatch(getPosts());
                setText("");
                setSelectedImage(null);
                setSelectedVideo(null);
                setShowImage(false);
            } else {
                Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour publier une histoire.');
            }


        } catch (error) {
            // Handle any errors that occurred during the async operations
            console.error("Error handling comment:", error);
        }

    };


    const saveCommentLocally = async (comment) => {
        try {
            // Récupérer les commentaires existants
            const existingCommentStr = await AsyncStorage.getItem('localComment');
            const existingComment = existingCommentStr ? JSON.parse(existingCommentStr) : [];

            // Ajouter le nouveau commentaire à la liste
            existingComment.push(comment);

            // Sauvegarder la liste mise à jour localement
            await AsyncStorage.setItem('localComment', JSON.stringify(existingComment));

            console.log('Comment sauvegardé localement avec succès !');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde locale du commentaire :', error);
            throw error;
        }
    };







    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

    const { t } = useTranslation();




    const addImageComment = async () => {
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


    const addAudioComment = () => {
        console.warn("je suis kizou")
    }
    const addGifComment = () => {
        console.warn("je suis kizou")
    }
    const addUserComment = () => {
        console.warn("je suis kizou")
    }

    return (
        <>

            {userData._id && (
                <>
                    {partVisible && (
                        <View
                            style={{
                                paddingTop: 10,
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                //backgroundColor: "red",
                                height: "40%"
                            }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "45%",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    //backgroundColor: "black",
                                    marginLeft: "12%",
                                    height: "100%"
                                }}>
                                <Pressable
                                    onPress={addImageComment}
                                    style={{
                                        flexDirection: "row",
                                        width: 40,
                                        alignItems: "center",
                                        //backgroundColor: "green",
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Ionicons name="images-outline" size={28} color={isDarkMode ? "#F5F5F5" : "black"} />

                                </Pressable>
                                <Pressable
                                    onPress={addGifComment}
                                    style={{
                                        flexDirection: "row",
                                        width: 40,
                                        alignItems: "center",
                                        //backgroundColor: "green",
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <MaterialCommunityIcons name="file-gif-box" size={35} color={isDarkMode ? "#F5F5F5" : "black"} />

                                </Pressable>
                                <Pressable
                                    onPress={addAudioComment}
                                    style={{
                                        flexDirection: "row",
                                        width: 40,
                                        alignItems: "center",
                                        //backgroundColor: "green",
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Ionicons name="mic-outline" size={28} color={isDarkMode ? "#F5F5F5" : "black"} />

                                </Pressable>
                                <Pressable
                                    onPress={addUserComment}
                                    style={{
                                        flexDirection: "row",
                                        width: 40,
                                        alignItems: "center",
                                        //backgroundColor: "green",
                                        height: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Fontisto name="hashtag" size={20} color={isDarkMode ? "#F5F5F5" : "black"} />

                                </Pressable>
                            </View>

                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            height: "60%",
                            alignItems: "center"

                        }}
                    >
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                marginLeft: "2.5%",
                            }}
                        >
                            <Image
                                source={{ uri: userData.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 100,
                                }}
                                alt="commenter-pic"
                            />
                        </View>
                        <TextInput
                            style={{
                                width: "78%",
                                height: "100%",
                                paddingLeft: 12,
                                marginLeft: 2,
                                fontSize: 16,
                                fontWeight: "500"
                            }}
                            onChangeText={(text) => setText(text)}
                            value={text}
                            placeholder={`${t('ReplyTo')} ${!isEmpty(usersData[0]) &&
                                (() => {
                                    const user = usersData.find((user) => user._id === selectedReply.replierId);
                                    return user ? user.pseudo : '';
                                })()
                                }`}

                            placeholderTextColor={isDarkMode ? "#F5F5F5" : "black"}
                            color={isDarkMode ? "#F5F5F5" : "black"}
                        />
                        {isButtonVisible && (
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingRight: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={handleComment}
                                >
                                    <Ionicons name="send" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </>
            )}
            <Modal
                visible={showImage}
                transparent={true}
                animationType="slide"
                onRequestClose={closeImageModal}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: "black",
                        width: windowWidth,
                        height: windowHeight
                    }}>

                    <SafeAreaView>
                        <View
                            style={{
                                flex: 1,
                                width: windowWidth,
                                height: windowHeight,
                                //backgroundColor: "black"
                            }}>

                            <View
                                style={{
                                    width: "100%",
                                    height: "8%",
                                    //backgroundColor: "green",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderBottomWidth: 1,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",

                                }}
                            >
                                <Pressable
                                    onPress={closeImageModal}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        //backgroundColor: "blue",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}>
                                    <Entypo name="cross" size={30} color="white" />
                                </Pressable>
                                <View
                                    style={{
                                        width: "40%",
                                        height: 60,
                                        //backgroundColor: "red",
                                        justifyContent: "center",
                                    }}>
                                    <Text
                                        style={{
                                            color: isDarkMode ? "#F5F5F5" : "black",
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {t("Reply")}
                                    </Text>
                                </View>


                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    height: "84%",
                                    paddingTop: "1%"
                                }}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "8%",
                                        paddingLeft: "4%",
                                        //backgroundColor: "red",
                                        flexDirection: "row",
                                        alignItems: "center"

                                    }}>
                                    <View
                                        style={{
                                            width: 50,
                                            height: 50,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: userData.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 100,
                                            }}
                                            alt="commenter-pic"
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: "70%",
                                            height: "100%",
                                            paddingLeft: 10,
                                            flexDirection: "column"
                                        }}>
                                        <View
                                            style={{
                                                width: "78%",
                                                height: "50%",
                                                justifyContent: "center",
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: "bold",
                                                    marginRight: 5,
                                                    fontSize: 16,
                                                    color: isDarkMode ? "#F5F5F5" : "black",
                                                }}
                                            >
                                                {userData.pseudo}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: "78%",
                                                height: "50%",
                                                //backgroundColor: "red"
                                            }}
                                        >
                                            <TextInput
                                                style={{
                                                    width: "78%",
                                                    height: "100%",
                                                    marginLeft: 2,
                                                    fontSize: 18,
                                                    fontWeight: "600"
                                                    //backgroundColor:"red"
                                                }}
                                                onChangeText={(text) => setText(text)}
                                                value={text}
                                                placeholder={`${t('ReplyTo')} ${!isEmpty(usersData[0]) &&
                                                    (() => {
                                                        const user = usersData.find((user) => user._id === selectedComment.commenterId);
                                                        return user ? user.pseudo : '';
                                                    })()
                                                    }`}

                                                placeholderTextColor={isDarkMode ? "gray" : "black"}
                                                color={isDarkMode ? "#F5F5F5" : "black"}
                                            />
                                        </View>



                                    </View>

                                </View>

                                <View
                                    style={{
                                        width: "100%",
                                        height: "92%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        //backgroundColor: "blue"
                                    }}>
                                    <View
                                        style={{
                                            width: "80%",
                                            height: "90%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            //backgroundColor: "blue",
                                            borderRadius: 20
                                        }}>

                                        <View
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: isDarkMode ? "#171717" : "#171717",
                                                borderRadius: 20,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.4,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                            }}
                                        >

                                            {selectedImage && (
                                                <Image
                                                    source={{ uri: selectedImage.uri }}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        resizeMode: "cover",
                                                        borderRadius: 20,
                                                    }}
                                                />
                                            )}

                                            {selectedVideo && (
                                                <Video
                                                    source={{ uri: selectedVideo.uri }}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: 20
                                                    }}
                                                    rate={1.0}
                                                    volume={1.0}
                                                    isMuted={false}
                                                    resizeMode="cover"
                                                    shouldPlay
                                                    isLooping
                                                />

                                            )}
                                        </View>

                                    </View>

                                </View>

                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    height: "8%",
                                    //backgroundColor: "green",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderTopWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",

                                }}
                            >
                                <View
                                    style={{
                                        width: "70%",
                                        height: "100%",
                                        //backgroundColor: "red",
                                        justifyContent: "center",
                                        paddingLeft: "4%"
                                    }}>
                                    <Text
                                        style={{
                                            color: isDarkMode ? "gray" : "black",
                                            fontSize: 18,
                                            fontWeight: "500",
                                        }}
                                    >
                                        {t("Every")}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: "30%",
                                        height: "100%",
                                        //backgroundColor: "blue",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}>
                                    <Pressable
                                        onPress={handleComment}
                                        style={{
                                            width: 110,
                                            height: 45,
                                            backgroundColor: "blue",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 20,
                                            backgroundColor: isDarkMode ? "#F5F5F5" : "black",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: isDarkMode ? "black" : "#F5F5F5",
                                                fontSize: 18,
                                                fontWeight: "500",

                                            }}
                                        >
                                            {t("Reply")}
                                        </Text>
                                    </Pressable>
                                </View>


                            </View>
                        </View>
                    </SafeAreaView>



                </View>
            </Modal>
        </>

    );
};

export default AddReplyToReply;
