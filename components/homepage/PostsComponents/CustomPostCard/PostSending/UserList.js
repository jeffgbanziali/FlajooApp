import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UidContext } from '../../../../Context/AppContext';

const popularEmojis = ['😀', '😂', '😍', '🥺', '😎', '😭', '😊', '👍'];  // Liste des émojis populaires

const UserList = ({ firstTenUsers, toggleSending, isDarkMode, t, postSenderPost }) => {
    const [userSelect, setUserSelect] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");
    const { uid } = useContext(UidContext);
    const [postInSender, setPostInSender] = useState([]);

    const selectUserSend = (id) => {
        setUserSelect(id);
        setModalVisible(true);
    };

    const closeModel = () => {
        setUserSelect(null);
        setModalVisible(false);
    }

    const handleShareWithUser = (postId, SharedId, receiverId) => {
        toggleSending();
        console.log("postId:", postId)
        console.log("Shared:", SharedId)
        console.log("receiverId:", receiverId)
    }



    const renderPost = ({ item }) => {
        const isSelected = item._id === userSelect;
        return (
            <TouchableOpacity
                onPress={() => selectUserSend(item._id)}
                style={{ width: 80, alignItems: "center", marginTop: 8, position: 'relative' }}
            >
                <View style={{ width: 60, height: 60, borderRadius: 100 }}>
                    <Image
                        source={{ uri: item.picture }}
                        style={{ width: "100%", height: "100%", borderRadius: 100 }}
                    />
                    {isSelected && (
                        <View
                            style={{
                                position: 'absolute',
                                right: -4,
                                bottom: -2,
                                borderWidth: 2,
                                borderRadius: 100,
                                borderColor: isDarkMode ? "#171717" : "white",
                            }}>
                            <FontAwesome
                                name="check-circle"
                                size={18}
                                color="red"

                            />
                        </View>


                    )}
                </View>
                <Text style={{ marginTop: 8, fontSize: 12, fontWeight: "500", color: isDarkMode ? "#FFFFFF" : "black" }}>
                    {item.pseudo}
                </Text>
            </TouchableOpacity>
        );
    };

    const addEmojiToText = (emoji) => {
        setText(text + emoji);
    };

    return (
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", paddingLeft: 20 }}>
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={firstTenUsers}
                renderItem={renderPost}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View style={{ width: 100, height: 120, alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: isDarkMode ? "#202020" : "#D9D9D9", alignItems: "center", justifyContent: "center" }}>
                            <Entypo name="dots-three-horizontal" size={20} color={isDarkMode ? "white" : "black"} />
                        </View>
                        <Text style={{ marginTop: 8, fontSize: 14, fontWeight: "500", color: isDarkMode ? "#FFFFFF" : "black" }}>
                            {t('Plus')}
                        </Text>
                    </View>
                }
            />

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
                                onPress={() => handleShareWithUser(postSenderPost._id, uid, userSelect)}
                            >
                                <Text style={{ fontSize: 14, fontWeight: "600", color: isDarkMode ? "#FFFFFF" : "black" }}>
                                    {t('Shared')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: 120, height: 40, margin: 4, borderRadius: 10, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}
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
        </View>
    );
};

export default UserList;
