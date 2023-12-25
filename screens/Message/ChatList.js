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
import MessagesUser from "../../components/MessagesUser/MessagesUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { io } from "socket.io-client";
import { APP_API_URL } from "../../config";
import Video from 'react-native-video';
//import { collection, addDoc, getDoc, } from 'firebase/firestore';
//import { firestore, uploadMediaToFirebase } from '../../Data/FireStore';
import { launchImageLibrary } from 'react-native-image-picker';
import { EasingFunction } from 'react-native';
import RNFS from 'react-native-fs';
import { useTranslation } from "react-i18next";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Message = () => {
  const navigation = useNavigation();
  const [currentChat, setCurrentChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState();
  const [arrivalChat, setArrivalChat] = useState([]);
  const [height, setHeight] = useState(40);
  const [selectTools, setSelectTools] = useState();
  const socket = useRef(io("ws://192.168.1.73:8900"));
  const { uid } = useContext(UidContext);
  const scrollRef = useRef();
  const route = useRoute();
  const { conversationId, user } = route.params;
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [addText, setAddText] = useState(false);



  /* const handleSendMessage = async () => {
     try {
       const { uri: imageUri } = selectedImage || {};
       const { uri: videoUri } = selectedVideo || {};
       const { uri: documentUri } = selectedDocument || {};
   
       const promises = [];
   
       if (imageUri) promises.push(uploadMediaToFirebase(imageUri, `image-${Date.now()}.${imageUri.split('.').pop()}`));
       if (videoUri) promises.push(uploadMediaToFirebase(videoUri, `video-${Date.now()}.${videoUri.split('.').pop()}`));
       if (documentUri) promises.push(uploadMediaToFirebase(documentUri, `document-${Date.now()}.${documentUri.split('.').pop()}`));
   
       const [imageUrl, videoUrl, documentUrl] = await Promise.all(promises);
   
       const attachment = selectedImage
         ? { type: 'image', url: imageUrl }
         : selectedVideo
         ? { type: 'video', url: videoUrl }
         : selectedDocument
         ? { type: 'document', url: documentUrl }
         : null;
   
       const messageData = {
         senderId: uid,
         conversationId,
         text: newChat || "",
         attachment,
       };
   
       const socketData = {
         senderId: uid,
         receiverId: [...new Set(currentChat.map((message) => message.senderId))].find(
           (sender) => sender !== uid
         ),
         text: newChat || "",
         attachment,
       };
   
       socket.current.emit("sendMessage", socketData);
   
       if (newChat || attachment) {
         const response = await axios.post(`${APP_API_URL}/api/message/`, messageData);
         const docRef = await addDoc(collection(firestore, 'media'), messageData);
         const docSnapshot = await getDoc(docRef);
         console.log('Story créée avec succès! Document ID:', docRef.id);
         console.log('Document data:', docSnapshot.data());
   
         setChat((prevChat) => [...prevChat, response.data]);
         setCurrentChat((prevCurrentChat) => [...prevCurrentChat, response.data]);
         setNewChat("");
         setPostText('');
         setSelectedImage(null);
         setSelectedVideo(null);
         setSelectedDocument(null);
         setShowImage(false);
         setSelectTools(false);
       } else {
         Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour envoyer un message.');
       }
     } catch (error) {
       console.error('Erreur lors de l\'envoi du message :', error);
       Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'envoi du message.');
     }
   };*/

  /*const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    console.log("newChat:", newChat);

    const promises = [];
    const message = {
      senderId: uid,
      text: newChat,
      conversationId: conversationId,
    };

    const mesSenders = [
      ...new Set(currentChat.map((message) => message.senderId)),
    ];

    const receiverId = mesSenders.find((sender) => sender !== uid);

    if (selectedImage) {
      promises.push(uploadMediaToFirebase(selectedImage.uri, `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`));
    }

    if (selectedVideo) {
      promises.push(uploadMediaToFirebase(selectedVideo.uri, `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`));
    }

    if (selectedDocument) {
      promises.push(uploadMediaToFirebase(selectedDocument.uri, `document-${Date.now()}.${selectedDocument.uri.split('.').pop()}`));
    }

    try {
      const [imageUrl, videoUrl, documentUrl] = await Promise.all(promises);

      if (imageUrl || videoUrl || documentUrl) {
        const attachment = imageUrl
          ? { type: 'image', url: imageUrl }
          : videoUrl
            ? { type: 'video', url: videoUrl }
            : documentUrl
              ? { type: 'document', url: documentUrl }
              : null;

        message.attachment = attachment;
      }

      socket.current.emit("sendMessage", {
        senderId: uid,
        receiverId,
        text: newChat,
        attachment: message.attachment,
      });

      const response = await axios.post(`${APP_API_URL}/api/message/`, message);

      setChat((prevChat) => [...prevChat, response.data]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, response.data]);
      setNewChat("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setSelectedDocument(null);
      setShowImage(false);
      setSelectTools(false);
    } catch (err) {
      console.log(err);
    }
  };*/


  /*************************************************************** */


  const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    console.log("newChat:", newChat);

    const promises = [];
    const message = {
      senderId: uid,
      text: newChat,
      conversationId: conversationId,
    };

    const mesSenders = [
      ...new Set(currentChat.map((message) => message.senderId)),
    ];

    const receiverId = mesSenders.find((sender) => sender !== uid);

    if (selectedImage) {
      promises.push(saveMediaLocally(selectedImage.uri, `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`, 'image'));
    }

    if (selectedVideo) {
      promises.push(saveMediaLocally(selectedVideo.uri, `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`, 'video'));
    }

    if (selectedDocument) {
      promises.push(saveMediaLocally(selectedDocument.uri, `document-${Date.now()}.${selectedDocument.uri.split('.').pop()}`, 'document'));
    }

    try {
      const [imageUrl, videoUrl, documentUrl] = await Promise.all(promises);

      if (imageUrl || videoUrl || documentUrl) {
        const attachment = imageUrl
          ? { type: 'image', url: imageUrl }
          : videoUrl
            ? { type: 'video', url: videoUrl }
            : documentUrl
              ? { type: 'document', url: documentUrl }
              : null;

        message.attachment = attachment;
      }

      socket.current.emit("sendMessage", {
        senderId: uid,
        receiverId,
        text: newChat,
        attachment: message.attachment,
      });

      const response = await axios.post(`${APP_API_URL}/api/message/`, message);

      setChat((prevChat) => [...prevChat, response.data]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, response.data]);
      setNewChat("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setSelectedDocument(null);
      setShowImage(false);
      setSelectTools(false);
    } catch (err) {
      console.log(err);
    }
  };

  const saveMediaLocally = async (uri, fileName, mediaType) => {
    return new Promise((resolve, reject) => {
      RNFS.copyFile(uri, `${RNFS.DocumentDirectoryPath}/${fileName}`)
        .then(() => {
          console.log(`${mediaType} sauvegardé avec succès !`);
          resolve(`${RNFS.DocumentDirectoryPath}/${fileName}`);
        })
        .catch((error) => {
          console.error(`Erreur lors de la sauvegarde du ${mediaType}.`, error);
          reject(error);
        });
    });
  };


  /*************************************************************** */


  useEffect(() => {
    socket.current = io("ws://192.168.1.73:8900");
    socket.current.on("connect", () => {
      console.log("Utilisateur connecté !!!!", socket.current.id);
      socket.current.emit("addUser", uid);
    });
    socket.current.on("getMessage", (data) => {
      const hasText = data.text !== undefined && data.text !== null;
      const hasAttachment = data.attachment !== undefined && data.attachment !== null;

      setArrivalChat((prevArrivalChat) => [
        ...prevArrivalChat,
        {
          senderId: data.senderId,
          text: hasText ? data.text : "",
          attachment: hasAttachment ? data.attachment : null,
          createdAt: Date.now(),
        },
      ]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [uid]);


  /*************************************************************** */

  useEffect(() => {
    if (arrivalChat.length > 0) {
      setChat((prevChat) => [...prevChat, ...arrivalChat]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, ...arrivalChat]);
    }
  }, [arrivalChat]);


  /*************************************************************** */

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${APP_API_URL}/api/message/${conversationId}`
        );
        console.log("Messages Response:", response.data);
        setChat(response.data);
        setCurrentChat(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMessages();
  }, [conversationId]);

  /*************************************************************** */


  useEffect(() => {
    if (arrivalChat.length > 0) {
      setChat((prevChat) => {
        const uniMessages = new Set([...prevChat, ...arrivalChat]);
        return [...uniMessages];
      });

      setCurrentChat((prevCurrentChat) => {
        const uniMessages = new Set([...prevCurrentChat, ...arrivalChat]);
        return [...uniMessages];
      });
      console.log(arrivalChat)
    }
  }, [arrivalChat]);

  /*************************************************************** */


  useEffect(() => {
    setCurrentChat(chat);
  }, [chat.length]);


  /*************************************************************** */


  useEffect(() => {
    scrollRef?.current?.scrollToEnd({ animated: true });
  }, [chat]);

  /*************************************************************** */


  const handleClickReturnMessageList = () => {
    console.log("clicked");
    navigation.navigate("Messages");
  };
  const handleSendVoice = () => {
    console.warn("recording");
  };
  const handleClickCall = (user) => {
    console.log("Calling")
    navigation.navigate("CallingOn", { user: user })
  };
  const handleClickSettings = (user) => {
    console.log("Calling")
  };

  const handleClickVideoCall = (user) => {
    navigation.navigate("VideoCall", { user: user });
  };

  const handleSelect = () => {
    setSelectTools(!selectTools)

  }

  /*************************************************************** */


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


  const MAX_MESSAGE_LENGTH = 15;
  const renderLimitedMessage = (message) => {
    if (message && message.length <= MAX_MESSAGE_LENGTH) {
      return message;
    } else if (message) {
      return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
    } else {
      return "";
    }
  };


  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? "#202020" : "#E9C8C8",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12%",
            width: "100%",
            height: "6%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 30,
                marginLeft: "3.5%",
              }}
              onPress={handleClickReturnMessageList}>
              <AntDesign
                name="arrowleft"
                size={25}
                color={isDarkMode ? "white" : "black"}

              />
            </TouchableOpacity>
            <Image
              source={{ uri: user.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginLeft: "2%"
              }}
            />
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "4%",
                width: 180,
                height: "90%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#FFFFFF",
                }}
              >
                {renderLimitedMessage(user.pseudo)}
              </Text>
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                {t('Online')}
              </Text>
            </View>


          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "40%",
              justifyContent: "space-around",
              marginRight: "2%",
            }}>
            <TouchableOpacity
              onPress={() => handleClickCall(user)}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}

              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isPressed ? "#D9D9D9" : "red",
                backgroundColor: isDarkMode ? "#202020" : "#E9C8C8",
                width: 50,
                height: 50,
                borderRadius: 30,
                marginTop: "1.5%",
              }}
            >
              <Ionicons
                name="call"
                size={30}
                color={isDarkMode ? "white" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClickVideoCall(user)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isPressed ? "#D9D9D9" : "#6F6F6F",
                backgroundColor: isDarkMode ? "#202020" : "#E9C8C8",
                width: 50,
                height: 500,
                borderRadius: 30,
              }}
            >
              <Ionicons
                name="videocam"
                size={30}
                color={isDarkMode ? "white" : "white"}

              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClickSettings}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isPressed ? "#D9D9D9" : "red",
                backgroundColor: isDarkMode ? "#202020" : "#E9C8C8",
                width: 40,
                height: 40,
                borderRadius: 30,
              }}
            >
              <Entypo
                name="dots-three-vertical"
                size={22}
                color={isDarkMode ? "white" : "white"} />

            </TouchableOpacity>
          </View>

        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={{
            flex: 1,
            paddingBottom: 10,
            backgroundColor: isDarkMode ? "#101010" : "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "4%",
            width: "100%",
            height: "100%",
          }}
        >
          {currentChat ? (
            <>
              <FlatList
                ref={(ref) => {
                  scrollRef.current = ref;
                }}
                onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
                style={{
                  marginTop: "2%"
                }}
                data={chat}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    key={index}
                    style={{
                      position: "relative",
                      bottom: 10,
                      width: "100%",
                    }}
                  >
                    <MessagesUser message={item} user={user} own={item.senderId === uid} />
                  </View>
                )}
              />

              {
                selectTools &&
                (
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
                )
              }
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  height: "12%",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 4
                }}
              >

                <View
                  style={{
                    width: "85%",
                    height: Math.max(50, height),
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: isDarkMode ? "#343434" : "#F7F4F4",
                    borderRadius: 30,
                    marginBottom: 10,
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
                    onChangeText={(newChat) => setNewChat(newChat)}
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
                    placeholder={t("Message")}
                    placeholderTextColor={isDarkMode ? "lightgray" : "gray"}
                    backgroundColor={isDarkMode ? "#343434" : "#F7F4F4"}
                    fontSize={22}
                    multiline={true} // Permet à l'utilisateur de saisir sur plusieurs lignes
                    numberOfLines={4}
                  />
                  <View
                    style={{
                      width: "23%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleSelect}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <FontAwesome name="paperclip" size={28} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <FontAwesome name="camera" size={25} color={isDarkMode ? "#D9D9D9" : "#656363"} />
                    </TouchableOpacity>
                  </View>
                </View>

                {
                  newChat === "" ?
                    <Pressable
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginLeft: "2%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        marginBottom: 10
                      }}
                      onPress={handleSendVoice}
                    >
                      <MaterialCommunityIcons
                        name="microphone"
                        size={24}
                        color="#FFFFFF"
                      />

                    </Pressable>
                    :
                    <Pressable
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginLeft: "2%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        marginBottom: 10
                      }}
                      onPress={handleSendMessage}
                    >
                      <MaterialIcons
                        name="send"
                        size={24}
                        color="#FFFFFF"
                      />
                    </Pressable>
                }
              </View>
            </>
          ) : (
            <Text>{t('Loading')}</Text>
          )}
        </KeyboardAvoidingView>
      </View>

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
  );
};

export default Message;