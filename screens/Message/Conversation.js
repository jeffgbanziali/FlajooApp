import { View, Text, Image, TouchableOpacity, Pressable, Modal } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formatConversationDate, isEmpty } from "../../components/Context/Utils";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import FollowHandler from "../../components/ProfileUtils.js/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, markConversationAsRead, markMessagesAsRead } from "../../actions/conversation.action";
import { readMessage } from "../../actions/message.actions";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

const Conversation = ({ conversation, currentUser }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const { isDarkMode, isConnected } = useDarkMode();
  const [showOptions, setShowOptions] = useState(false);
  const { uid } = useContext(UidContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadConversation, setLoadConversation] = useState(true);

  const usersData = useSelector((state) => state.usersReducer);
  const friendId = conversation.members.receiverId !== uid ? conversation.members.receiverId : conversation.members.senderId;
  const messages = useSelector((state) => state.messageReducer.messages)

  const dispatch = useDispatch()



  useEffect(() => {
    !isEmpty(usersData)[0] && setIsLoading(false);
  }, [usersData]);


  const foundUser = usersData.map(user => {
    if (user._id === friendId) {
      return user;
    }
    return null;
  }).filter(user => user !== null)[0];


  const isUserOnline = foundUser.onlineStatus === true
  const différentv = conversation && conversation.members.receiverId === uid && conversation.members.senderId !== uid



  //console.log("La liste de ceux qui sont en ligne là:", foundUser);
  //console.log("L'id de la conversation est là:", conversation._id);
  //console.log("Le receiver Id:", conversation.members.receiverId === uid);
  //console.log("Le senderID:", conversation.members.senderId);
  // console.log("Il est vraiment différent:", différentv);


  useEffect(() => {
    dispatch(readMessage(conversation._id));
  }, [dispatch, conversation._id]);

  const filteredMessages = messages.filter(message => message.isRead === false && message.senderId !== uid);
  console.log("Mes messages", filteredMessages)

  const handleOpenConversation = async () => {

    try {
      if (différentv && conversation && conversation._id && conversation.message.isRead === false) {
        await dispatch(markConversationAsRead(conversation._id));
        console.log("Conversation marquée comme lue :", conversation._id);
        setLoadConversation(true)
      } else if (différentv === false || différentv === true && conversation && conversation._id && conversation.message.isRead === true) {
        console.log("Bonne humeur aujourd'hui")
        setLoadConversation(true)

      } else {
        console.error("ID de conversation non défini :", conversation);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la conversation :", error);
    }
  };

  useEffect(() => {
    if (loadConversation) {
      dispatch(fetchConversations(uid));
      setLoadConversation(false);
    }
  }, [loadConversation, dispatch]);



  const handleClickMessage = useCallback(() => {
    handleOpenConversation();
    setLoadConversation(true)
    navigation.navigate("Chatlist", {
      conversationId: conversation._id,
      conversation: conversation,
      user: foundUser
    });

  }, [handleOpenConversation, conversation, foundUser, navigation]);

  const viewProfile = () => {
    setShowOptions(!showOptions);
  };

  const closeModal = () => {
    setShowOptions(false);
  };

  const goProfil = (id) => {
    navigation.navigate("ProfilFriends", { id });
    closeModal();
  };


  const MAX_MESSAGE_LENGTH = 60;

  const renderLimitedMessage = (message) => {
    if (message.length <= MAX_MESSAGE_LENGTH) {
      return message;
    } else {
      return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
    }
  };


  return (
    <>
      {
        isLoading ? (
          <>
            <View
              style={{
                width: "100%",
                padding: 1,
                height: 80,
                justifyContent: "center",
                //backgroundColor: "red"
              }}>
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  // backgroundColor: "green",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "20%",
                    // backgroundColor: "green",
                    alignItems: "center",
                  }}>
                  <Pressable
                    onPress={viewProfile}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,

                    }}
                  >
                    <Image
                      source={{
                        uri:
                          "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                      }}

                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                      }}
                    />


                  </Pressable>
                </View>
                <View
                  style={{
                    display: "flex",
                    width: "30%",
                    height: "100%",
                    justifyContent: "space-between",
                    flexDirection: "row",

                    //  borderBottomWidth: 1,
                    //  borderColor: "#2C2828",
                  }}>
                  <View
                    style={{
                      justifyContent: "center",

                      //backgroundColor: "red",
                      height: "100%",
                      width: "84%"
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        alignItems: "center",
                        fontWeight: "600",
                        color: isDarkMode ? "white" : "black",
                      }}
                    >
                      {t('Loading')}

                    </Text>

                  </View>
                  <View style={{
                    justifyContent: "center",

                    /// backgroundColor: "red",
                    height: "100%",
                    width: "20%"
                  }}>
                    <ActivityIndicator size={"small"} color={isDarkMode ? "white" : "black"} />

                  </View>


                </View>

              </View>
            </View>


          </>
        ) : (
          <>
            <TouchableOpacity
              key={conversation._id}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleClickMessage}
              style={{
                width: "100%",
                padding: 1,
                height: 80,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: isPressed ? "#6F6F6F" : "#F3F2F2",
                  backgroundColor: isDarkMode ? "#0D0C0C" : "#F9F9F9",
                  width: "100%",

                  height: "100%",
                }}

              >

                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "green",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "20%",
                      // backgroundColor: "green",
                      alignItems: "center",
                    }}>
                    <Pressable
                      onPress={viewProfile}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,

                      }}
                    >
                      <Image
                        source={{
                          uri:
                            !isEmpty(usersData[0]) &&
                            usersData
                              .map((user) => {
                                if (user._id === friendId) {
                                  console.log("user picture ", user.picture)
                                  return user.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png";
                                }
                                return null;
                              })
                              .filter((url) => url !== null) // Retirer les éléments nuls
                              .join(""),
                        }}

                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 100,
                        }}
                      />

                      {isUserOnline && (<View
                        style={{
                          backgroundColor: "#09C03C",
                          position: "absolute",
                          left: 40,
                          width: 14,
                          height: 14,
                          borderRadius: 25,
                          borderWidth: 2,
                          borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                          top: 30,
                          zIndex: 100
                        }}>
                      </View>
                      )}
                    </Pressable>
                  </View>


                  <View
                    style={{
                      display: "flex",
                      width: "80%",
                      height: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      //  borderBottomWidth: 1,
                      //  borderColor: "#2C2828",
                    }}>
                    <View
                      style={{
                        justifyContent: "center",

                        //backgroundColor: "red",
                        height: "100%",
                        width: "78%"
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          alignItems: "center",
                          fontWeight: "600",
                          color: isDarkMode ? "white" : "black",
                        }}
                      >
                        {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                            if (user._id === friendId) return user.pseudo;
                            else return null;
                          })}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 4,
                          alignItems: "center",
                          fontWeight: différentv && conversation.message.isRead === false ? "800" : "400",
                          color: différentv && conversation.message.isRead === false ? "#004AAD" : "gray"
                        }}
                      >
                        {renderLimitedMessage(conversation.message.text)}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: "22%",
                        //  backgroundColor: "blue",
                        paddingRight: 10,
                        height: "80%",
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          alignItems: "center",
                          fontWeight: "400",
                          color: isDarkMode ? (
                            différentv && conversation.message.isRead === false ? "red" : "white") : (
                            différentv && conversation.message.isRead === false ? "red" : "black"),

                        }}
                      >
                        {formatConversationDate(conversation.updatedAt)}
                      </Text>

                      {
                        différentv && conversation.message.isRead === false && (
                          <View
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 100,
                              backgroundColor: "red",
                              alignItems: "center",
                              top: 8,
                              justifyContent: "center"

                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                alignItems: "center",
                                fontWeight: "normal",
                                color: "white"
                              }}
                            >
                              {filteredMessages.length}
                            </Text>
                          </View>
                        )

                      }
                    </View>
                  </View>


                </View>

              </View>

            </TouchableOpacity>

            <Modal
              visible={showOptions}
              transparent={true}
              animationType="slide"
              onRequestClose={closeModal}>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "10%",
                  marginTop: "4%",
                  zIndex: 3
                }}
              >
                <TouchableOpacity
                  onPress={closeModal}
                  style={{
                    width: '10%',
                    height: '100%',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo
                    size={35}
                    name='cross'
                    color="white" />
                </TouchableOpacity>

              </View>
              <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDarkMode ? "rgba(0, 1, 1, 0.5)" : "rgba(0, 0, 0, 0.5)",
              }}>


                <View style={{
                  borderRadius: 10,
                  width: "80%",
                  height: "40%",
                  borderRadius: 20,
                  padding: 2,
                  backgroundColor: isDarkMode ? "#171717" : "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: isDarkMode ? 1 : 2,
                  },
                  shadowOpacity: isDarkMode ? 0.16 : 0.6,
                  shadowRadius: 3.84,
                  elevation: 2,
                }}>

                  <View
                    style={{
                      width: "100%",
                      height: "12%",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: "70%",
                      zIndex: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: isDarkMode ? "white" : "white",
                        fontSize: 20,
                        fontWeight: '500'
                      }}
                    >
                      {foundUser?.pseudo}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "12%",
                      top: "70%",
                      position: "absolute",
                      backgroundColor: "black",
                      opacity: 0.5,
                      zIndex: 2,
                    }}
                  >
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "82%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >

                    <Image
                      source={{ uri: foundUser?.picture ? foundUser.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        resizeMode: "contain"
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      height: "18%",
                      backgroundColor: isDarkMode ? "#3B3A3A" : "#E9C8C8",
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => goProfil(foundUser._id)}
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                      }}
                    >
                      <FontAwesome
                        name="user"
                        size={36}
                        color={isDarkMode ? "white" : "white"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                      }}
                    >
                      <Ionicons
                        name="call"
                        size={34}
                        color={isDarkMode ? "white" : "white"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                      }}
                    >
                      <FontAwesome5
                        name="video"
                        size={30}
                        color={isDarkMode ? "white" : "white"}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: "26%",
                        height: 40,
                        backgroundColor: "blue",
                        borderRadius: 16,
                      }}
                    >
                      <FollowHandler idToFollow={foundUser?._id ?? ''} type={"mess"} />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )
      }



    </>
  );
};

export default Conversation;
