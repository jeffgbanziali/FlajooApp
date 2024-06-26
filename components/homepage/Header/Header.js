import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { readMessage } from "../../../actions/message.actions";
import { fetchConversations } from "../../../actions/conversation.action";

const Header = () => {
  const { isDarkMode } = useDarkMode();
  const [loadPost, setLoadPost] = useState(true);
  const { uid } = useContext(UidContext);
  const dispatch = useDispatch()

  const userData = useSelector((state) => {
    return state.userReducer;
  });
  const messages = useSelector((state) => {
    return state.messageReducer.messages;
  });
  const conversations = useSelector((state) => {
    return state.conversationReducer;
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


  const foundConversation = conversations.conversations.map(conversation => {
    return conversation;
  }).filter(conversation => conversation !== null)[0];

  const différentv = foundConversation && foundConversation.members.receiverId === uid && foundConversation.members.senderId !== uid



  useEffect(() => {
    if (foundConversation?._id) {
      dispatch(readMessage(foundConversation._id));
    }
  }, [dispatch, foundConversation?._id]);


  const navigation = useNavigation(false);
  const filteredMessages = messages.filter(message => message.isRead === false && message.senderId !== uid);



  const handleClickProfile = () => {
    navigation.navigate("Profile");
  };

  const handleClickMessage = () => {
    navigation.navigate("Messages");
  };

  const handleClickNotifications = () => {
    navigation.navigate("Notifications");
  };



  return (
    <View
      style={{
        backgroundColor: isDarkMode ? "#171717" : "white",
        padding: 2

      }}>
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 10,

            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "black",
            width: 100,
            height: 40
          }}
        >

          <Image
            source={require('../../../assets/Logos/Title.png')}
            style={{
              width: '100%',
              height: "100%",
              position: "absolute"
            }
            } />
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              width: 50,
              height: 50,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickNotifications}>
              <Feather
                name="bell"
                size={25}
                color={isDarkMode ? "white" : "black"}

              />
            </TouchableOpacity>
          </View>


          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              width: 50,
              height: 50,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickMessage}>
              {
                différentv && foundConversation.message.isRead === false && (
                  <View
                    style={{
                      backgroundColor: "red",
                      position: "absolute",
                      left: 10,
                      width: 20,
                      height: 20,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      marginLeft: 6,
                      marginTop: -8,
                      zIndex: 100,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {filteredMessages.length}
                    </Text>
                  </View>
                )}
              <AntDesign
                name="message1"
                size={25}
                color={isDarkMode ? "white" : "black"}

              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              marginLeft: 10,
              width: 30,
              height: 30,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickProfile}>
              <Image
                source={{
                  uri: userData.picture ? userData.picture
                    : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
};

export default Header;
