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
import axios from "axios";
import MessagesUser from "../../components/MessagesUser/MessageUser/MessagesUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { io } from "socket.io-client";
import { APP_API_URL, MESSAGE_ADRESS_IP } from "../../config";
import Video from 'react-native-video';
import { collection, addDoc, getDoc, } from 'firebase/firestore';
import { firestore, uploadMediaToFirebase } from '../../Data/FireStore';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import ChatingHeader from "./ChatingHeader";
import ChatTools from "./ChatTools";
import ChatSending from "./ChatSending";
import { createConversation, fetchConversations } from "../../actions/conversation.action";
import { useDispatch, useSelector } from "react-redux";
import ViewProfile from "../../components/MessagesUser/MessageUser/ViewProfile";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Message = () => {
  const navigation = useNavigation();
  const [currentChat, setCurrentChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState();
  const [arrivalChat, setArrivalChat] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [selectTools, setSelectTools] = useState();
  const socket = useRef(io(`ws:${MESSAGE_ADRESS_IP}:8900`));
  const { uid } = useContext(UidContext);
  const scrollRef = useRef();
  const route = useRoute();
  const { conversationId, conversation, conversationData, user } = route.params;
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const [loadStories, setLoadStories] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const dispatch = useDispatch();


  //console.log("Mon socket", socket)


  const conversationMembersId = conversationId || conversationData._id

  const conversationToos = conversationData || conversation


  const handleSendMessage = async () => {

    const promises = [];


    const mesSenders = [
      ...new Set(currentChat.map((message) => message.senderId)),
    ];



    const receiverId = mesSenders.find((sender) => sender !== uid) || user._id;

    const message = {
      senderId: uid,
      receiverId,
      text: newChat,
      conversationId: conversationMembersId,
    };


    if (selectedImage) {
      promises.push(uploadMediaToFirebase(selectedImage.uri, `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`, 'image'));
    }

    if (selectedVideo) {
      promises.push(uploadMediaToFirebase(selectedVideo.uri, `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`, 'video'));
    }

    if (selectedDocument) {
      promises.push(uploadMediaToFirebase(selectedDocument.uri, `document-${Date.now()}.${selectedDocument.uri.split('.').pop()}`, 'document'));
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

      // Envoyer le message via socket
      socket.current.emit("sendMessage", {
        senderId: uid,
        receiverId,
        text: newChat,
        attachment: message.attachment,
      });


      const response = await axios.post(`${APP_API_URL}/api/message/`, message);



      setChat((prevChat) => [...prevChat, response.data]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, response.data]);
      console.log("reponse vers notre data", response.data)
      setNewChat("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setSelectedDocument(null);
      setShowImage(false);
      setSelectTools(false);
      //setLoadStories(true);


      if (conversationToos) {
        if (!conversationToos.message || !conversationToos.message.text || conversationToos.message.text.length === 0) {
          // Mettre à jour les membres de la conversation avec de nouvelles valeurs
          conversationToos.members = {
            senderId: uid,
            receiverId: receiverId
          };

          // Créer le nouveau message
          conversationToos.message = {
            text: newChat
          };

          // Afficher le premier message de la conversation
          console.log("Premier message de la conversation:", conversationToos.message.text);
        } else if (!conversationToos.members || !conversationToos.members.senderId || !conversationToos.members.receiverId) {
          // Si les membres de la conversation ne sont pas définis, les initialiser avec de nouvelles valeurs
          conversationToos.members = {
            senderId: uid,
            receiverId: receiverId
          };
        }
      }




    } catch (err) {
      console.log(err);
    }
  };


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
          receiverId: data.receiverId,
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






  useEffect(() => {
    if (arrivalChat.length > 0) {
      setChat((prevChat) => [...prevChat, ...arrivalChat]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, ...arrivalChat]);
    }
  }, [arrivalChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${APP_API_URL}/api/message/${conversationMembersId}`
        );
        // console.log("Messages Response:", response.data);
        setChat(response.data);
        setCurrentChat(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMessages();
  }, [conversationMembersId]);




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
      console.log("Pourquoi mon arrivalChat ne marche pas ", arrivalChat)
    }
  }, [arrivalChat]);

  /*************************************************************** */

  console.log("mon arrivalChat est où", arrivalChat)

  useEffect(() => {
    setCurrentChat(chat);
  }, [chat.length]);



  useEffect(() => {
    scrollRef?.current?.scrollToEnd({ animated: true });
  }, [chat]);





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
          backgroundColor: isDarkMode ? "#101010" : "white",
          width: "100%",
        }}
      >

        <ChatingHeader
          user={user}
          initialConversation={conversation}
          conversationToos={conversationToos}
          conversationId={conversationId}
          initialCreateConversation={conversationData}
          renderLimitedMessage={renderLimitedMessage} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={{
            flex: 1,
            paddingBottom: 10,
            backgroundColor: isDarkMode ? "#101010" : "white",
            width: "100%",
            height: "92%",
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
                    <MessagesUser
                      message={item}
                      user={user}
                      conversationToos={conversationToos}
                      own={item.senderId === uid} />
                  </View>
                )}

                ListHeaderComponent={() => (
                  <>
                    <ViewProfile user={user} />
                  </>
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
                    showImage={showImage}
                    setShowImage={setShowImage}
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