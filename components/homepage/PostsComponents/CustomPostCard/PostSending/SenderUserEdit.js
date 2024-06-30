import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, Alert, SafeAreaView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UidContext } from '../../../../Context/AppContext';
import { getPosts, sharePostWithUser } from '../../../../../actions/post.actions';
import { fetchConversations } from '../../../../../actions/conversation.action';
import { useDispatch, useSelector } from 'react-redux';




const popularEmojis = ['😀', '😂', '😍', '🥺', '😎', '😭', '😊', '👍'];  // Liste des émojis populaires


const SenderUserEdit = ({ closeModel, modalVisible, toggleSending, userSelect, isDarkMode, t, postSenderPost }) => {

    const [text, setText] = useState("");
    const { uid } = useContext(UidContext);
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch()


    const conversations = useSelector((state) => {
        return state.conversationReducer.conversations;
    });

    useEffect(() => {
        if (uid) {
            setLoadPost(true);
            dispatch(fetchConversations(uid))
                .finally(() => {
                    setLoadPost(false);
                });

        }

    }, [uid, dispatch]);


    const addEmojiToText = (emoji) => {
        setText(text + emoji);
    };


    let conversationTools = null;

    if (Array.isArray(conversations)) {
        conversationTools = conversations.map(function (conversationTools) {
            if (conversationTools.members.receiverId === uid &&
                conversationTools.members.senderId === userSelect ||
                conversationTools.members.receiverId === userSelect &&
                conversationTools.members.senderId === uid) {
                return conversationTools;
            }
            return null;
        }).filter(Boolean)[0];
    } else {
        console.error('convertsation data is not an array', conversations);
    }





    const handleShareWithUser = async (postId, sharedId, receiverId, conversationId, text) => {
        try {
            toggleSending();

            console.log("postId:", postId);
            console.log("Shared:", sharedId);
            console.log("receiverId:", receiverId);
            console.log("ma conversation:", conversationId);
            console.log("my text is here", text);

            const postData = {
                postId,
                sharedId,
                receiverId,
                conversationId,
                text: text || "",
            };

            const response = await dispatch(sharePostWithUser(postData));
            console.log('Response:', response);

            if (response.status === 200) {
                Alert.alert("Vous avez partagé ce post")
            }
        } catch (error) {
            console.error("An error occurred while sharing the post:", error);
        }
    };




    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModel}
            >
                <View style={{ flex: 1, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 400, height: 220, backgroundColor: isDarkMode ? "#171717" : "white", borderRadius: 20, alignItems: 'center' }}>
                        <View style={{ width: "100%", height: "50%", flexDirection: "row", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <TextInput
                                style={{ width: "75%", height: "100%", paddingLeft: 20, borderRadius: 10, fontSize: 16, fontWeight: "500", color: isDarkMode ? "#F5F5F5" : "black" }}
                                onChangeText={(text) => setText(text)}
                                value={text}
                                placeholder="Écrire un message..."
                                placeholderTextColor={isDarkMode ? "#F5F5F5" : "black"}
                            />
                            <View style={{ width: "25%", height: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: 60, height: 70, borderRadius: 10 }}>
                                    {postSenderPost?.media?.[0]?.mediaType === "image" && (
                                        <Image
                                            source={{ uri: postSenderPost.media[0].mediaUrl }}
                                            style={{ width: "100%", height: "100%", borderRadius: 10, resizeMode: "cover" }}
                                        />
                                    )}
                                    {postSenderPost?.media?.[0]?.mediaType === "video" && (
                                        <Video
                                            source={{ uri: postSenderPost.media[0].mediaUrl }}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={false}
                                            isLooping
                                            paused
                                            style={{ width: "100%", height: "100%", borderRadius: 10, resizeMode: "cover" }}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                height: "20%",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            {popularEmojis.map((emoji, index) => (
                                <TouchableOpacity key={index} onPress={() => addEmojiToText(emoji)}>
                                    <Text style={{ fontSize: 30, margin: 5 }}>{emoji}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{ width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ width: 120, height: 40, margin: 4, borderRadius: 10, backgroundColor: "red", justifyContent: "center", alignItems: "center" }}
                                onPress={() => handleShareWithUser(postSenderPost._id, uid, userSelect, conversationTools._id, text)}
                            >
                                <Text style={{ fontSize: 14, fontWeight: "600", color: isDarkMode ? "#FFFFFF" : "black" }}>
                                    {t('Shared')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: 120, height: 40, margin: 4, borderRadius: 10, backgroundColor: "#2196F3", justifyContent: "center", alignItems: "center" }}
                                onPress={closeModel}
                            >
                                <Text style={{ fontSize: 14, fontWeight: "600", color: isDarkMode ? "#FFFFFF" : "black" }}>
                                    {t('Close')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </>
    )
}

export default SenderUserEdit