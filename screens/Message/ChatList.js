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
import { io } from "socket.io-client";
import { APP_API_URL, MESSAGE_ADRESS_IP } from "../../config";
import Video from 'react-native-video';
//import { collection, addDoc, getDoc, } from 'firebase/firestore';
//import { firestore, uploadMediaToFirebase } from '../../Data/FireStore';
import { launchImageLibrary } from 'react-native-image-picker';
import { EasingFunction } from 'react-native';
import RNFS from 'react-native-fs';
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import ChatingHeader from "./ChatingHeader";
import ChatTools from "./ChatTools";
import ChatSending from "./ChatSending";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Message = () => {
  const navigation = useNavigation();
  const [currentChat, setCurrentChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState();
  const [arrivalChat, setArrivalChat] = useState([]);
  const [height, setHeight] = useState(40);
  const [selectTools, setSelectTools] = useState();
  const socket = useRef(io(`ws:${MESSAGE_ADRESS_IP}:8900`));
  const { uid } = useContext(UidContext);
  const scrollRef = useRef();
  const route = useRoute();
  const { conversationId, user } = route.params;
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);



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
    socket.current = io(`ws:${MESSAGE_ADRESS_IP}:8900`);
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





  const handleSelect = () => {
    setSelectTools(!selectTools)

  }

  /*************************************************************** */






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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? "#202020" : "#E9C8C8",
          width: "100%",
        }}
      >

        <ChatingHeader
          user={user}
          renderLimitedMessage={renderLimitedMessage} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={{
            flex: 1,
            paddingBottom: 10,
            backgroundColor: isDarkMode ? "#101010" : "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "5%",
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
                  marginTop: "4%"
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
                  <ChatTools

                    user={user}
                    newChat={newChat}
                    handleSendMessage={handleSendMessage}
                    setNewChat={setNewChat}
                    setSelectTools={setSelectTools}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    selectedVideo={selectedVideo}
                    setSelectedVideo={setSelectedVideo}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                  />
                )
              }

              <ChatSending
                handleSelect={handleSelect}
                newChat={newChat}
                setNewChat={setNewChat}
                handleSendMessage={handleSendMessage} />
            </>
          ) : (
            <Text>{t('Loading')}</Text>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>


    </>
  );
};

export default Message;