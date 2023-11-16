import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios";
import MessagesUser from "../../components/MessagesUser/MessagesUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { io } from "socket.io-client";
import { APP_API_URL } from "../../config";
import { Image } from "react-native";

const Message = () => {
  const navigation = useNavigation();
  const [currentChat, setCurrentChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState("");
  const [arrivalChat, setArrivalChat] = useState([]);
  const [height, setHeight] = useState(40);
  const socket = useRef(io("ws://localhost:8900"));
  const { uid } = useContext(UidContext);
  const scrollRef = useRef();
  const route = useRoute();
  const { conversationId, user } = route.params;
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Établir la connexion une seule fois lors du montage du composant
    socket.current = io("ws://localhost:8900");
    // Émission de l'événement "addUser" après la connexion
    socket.current.on("connect", () => {
      console.log("Utilisateur connecté !!!!", socket.current.id);
      socket.current.emit("addUser", uid);
    });

    socket.current.on("getMessage", (data) => {
      console.log("Received message:", data);
      setArrivalChat((prevArrivalChat) => [
        ...prevArrivalChat,
        {
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        },
      ]);
    });

    // Nettoyage lors du démontage du composant
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


  useEffect(() => {
    setCurrentChat(chat);
  }, [chat.length]);

  console.log(currentChat);

  const handleSendMessage = async () => {
    console.log("handleSendMessage called");
    console.log("newChat:", newChat);
    const message = {
      senderId: uid,
      text: newChat,
      conversationId: conversationId,
    };
    console.log("où est mon : ", conversationId);

    const mesSenders = [
      ...new Set(currentChat.map((message) => message.senderId)),
    ];
    const receiverId = mesSenders.find((sender) => sender !== uid);

    socket.current.emit("sendMessage", {
      senderId: uid,
      receiverId,
      text: newChat,
    });


    try {
      const response = await axios.post(
        `${APP_API_URL}/api/message/`,
        message
      );

      setChat((prevChat) => [...prevChat, response.data]);
      setCurrentChat((prevCurrentChat) => [...prevCurrentChat, response.data]);
      setNewChat("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollToEnd({ animated: true });
  }, [chat]);

  console.log("toi là ", user)



  const handleClickReturnMessageList = () => {
    console.log("clicked");
    navigation.navigate("Messages");
  };
  const handleClickCall = (user) => {
    console.log("Calling")
    navigation.navigate("CallingOn", { user: user })
  };

  const handleClickVideoCall = (user) => {
    console.warn("user called");
    navigation.navigate("VideoCall", { user: user });
  };










  return (
    <>

      <View
        style={{
          flex: 1,
          backgroundColor: "#2C2828",
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
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#161414",
                width: 40,
                height: 40,
                borderRadius: 30,
                marginLeft: "3.5%",
              }}
              onPress={handleClickReturnMessageList}>
              <AntDesign
                name="arrowleft"
                size={25}
                color="#5F5858"

              />
            </TouchableOpacity>
            <Image
              source={{ uri: user.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                marginLeft: "4%"
              }}
            />
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "4%"

              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                {user.pseudo}
              </Text>
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                Online
              </Text>
            </View>


          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "35%",
              justifyContent: "space-around",
              marginRight: "4%",
            }}>
            <TouchableOpacity onPress={() => handleClickCall(user)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#D9D9D9",
                width: 40,
                height: 40,
                borderRadius: 30,
                marginTop: "1.5%",
              }}
            >
              <Ionicons
                name="call"
                size={25}
                color="#000000"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClickVideoCall(user)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#D9D9D9",
                width: 40,
                height: 40,
                borderRadius: 30,
              }}
            >
              <Ionicons
                name="videocam"
                size={24}
                color="#000000"

              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClickCall}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#D9D9D9",
                width: 40,
                height: 40,
                borderRadius: 30,
              }}
            >
              <Entypo
                name="dots-three-vertical"
                size={20}
                color="black" />

            </TouchableOpacity>
          </View>


        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={{
            flex: 1,
            paddingBottom: 10,
            backgroundColor: "black",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "2%",
            width: "100%",
            height: "100%",
          }}
        >
          {currentChat ? (
            <>
              <ScrollView
                ref={(ref) => {
                  scrollRef.current = ref;
                }}
                onContentSizeChange={() =>
                  scrollRef.current.scrollToEnd({ animated: true })
                }
                style={{
                  marginTop: "2%"
                }}
              >
                {chat.map((mes, index) => (
                  <View
                    key={index}
                    style={{
                      position: "relative",
                      bottom: 10,
                      width: "100%",
                    }}
                  >
                    <MessagesUser message={mes} user={user} own={mes.senderId === uid} />
                  </View>
                ))}
              </ScrollView>

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
                    backgroundColor: "gray",
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
                    <AntDesign name="smile-circle" size={28} color="#D9D9D9" />
                  </TouchableOpacity>

                  <TextInput
                    value={newChat}
                    onChangeText={(text) => setNewChat(text)}
                    onContentSizeChange={(e) =>
                      setHeight(e.nativeEvent.contentSize.height)
                    }
                    style={{

                      width: "67%",
                      borderColor: "gray",
                      borderWidth: 2,
                      marginLeft: "2%",
                      color: "white",
                      textAlignVertical: 'center',
                      height: Math.max(50, height),
                    }}
                    placeholder="Message"
                    placeholderTextColor="lightgray"
                    backgroundColor="gray"
                    fontSize={22}
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
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <FontAwesome name="paperclip" size={28} color="#D9D9D9" />
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
                      <FontAwesome name="camera" size={25} color="#D9D9D9" />
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
                      onPress={handleSendMessage}
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
            <Text>Loading...</Text>
          )}
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Message;