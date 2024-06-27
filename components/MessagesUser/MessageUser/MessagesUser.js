import React, { useEffect, useState } from "react";
import { Animated, Dimensions, Easing, KeyboardAvoidingView, Linking, Platform, Pressable, Text } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { formatMessageDate, formatPostDate, isEmpty } from "../../Context/Utils";
import Modal from "react-native-modal";
import { useDarkMode } from "../../Context/AppContext";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { APP_API_URL } from "@env";
import Video from 'react-native-video';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const MessagesUser = ({ message, own, user, conversationToos }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [showMessageTools, setMessageTools] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [postInSender, setPostInSender] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [messageHeight, setCommentsHeight] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  const { isDarkMode, isConnected } = useDarkMode();
  const userImageUri = own ? userData.picture : user.picture;

  const goProfil = (id) => {
    if (userData._id === id) {
      navigation.navigate("Profile", { id });
    } else {
      navigation.navigate("ProfilFriends", { id });
    }
  };

  const isUserOnline = user.onlineStatus === true


  const messageTools = () => {
    if (showMessageTools) {
      Animated.timing(messageHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setMessageTools(false));
    } else {
      setMessageTools(true);
      Animated.timing(messageHeight, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const messageOther = () => {
    console.warn("betise")
  }


  const closeImageModal = () => {
    setShowImage(!showImage);
  };

  const handleImagePress = () => {
    setSelectedImage(message.attachment.url);
    setShowImage(true);
  };


  const { t } = useTranslation();


  const deleteMessage = async () => {
    try {
      const response = await fetch(`${APP_API_URL}/api/message/${message._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // La suppression a réussi, tu peux mettre à jour l'état ou effectuer d'autres actions nécessaires.
        console.log('Message deleted successfully');
        setMessageTools(false);
      } else {
        // La suppression a échoué, tu peux afficher un message d'erreur ou prendre d'autres mesures.
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message', error);
    }
  };





  useEffect(() => {
    const getPostUser = async () => {
      try {
        const response = await axios.get(`${APP_API_URL}/api/post/`);
        setPostInSender(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getPostUser();
  }, []);



  const foundPoster = postInSender.map(post => {
    if (post._id === message.postId) {
      return post;
    }
    return null;
  }).filter(post => post !== null)[0];

  console.log("mes messages", foundPoster)


  return (
    <>
      {
        own ? (

          <View style={styles.messageOwn}>
            {
              message.type === "message" && (
                <>
                  {message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />
                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: "#F80303",
                              borderRadius: 10,
                              maxWidth: 300,
                              maxHeight: 200,
                              padding: 10,

                              justifyContent: "center",
                              flexDirection: "row",
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
                            <Text
                              style={
                                {
                                  fontSize: 16,
                                  color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                  textAlign: 'justify',
                                  fontFamily: 'Roboto',
                                  fontWeight: "500",
                                  lineHeight: 24
                                }
                              }>
                              {message.text}
                              {" "}
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  fontSize: 14,
                                  color: "lightgray",
                                }}
                              >
                                {formatMessageDate(message.createdAt)}
                              </Text>
                            </Text>

                          </View>
                          {
                            own && isUserOnline && message.isRead === false ?
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  paddingTop: 5,
                                  fontSize: 12,
                                  color: "lightgray",
                                }}
                              >
                                Distribué
                              </Text>
                              :
                              <View
                                style={{
                                  backgroundColor: "#09C03C",
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  width: 10,
                                  height: 10,
                                  borderRadius: 30,
                                }}
                              >

                              </View>
                          }


                        </Pressable>
                      </View >

                    </>

                  )}
                  {
                    message.attachment && message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,
                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                          >
                            {
                              message.attachment.type === "image" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 200,
                                    height: 300,
                                    maxHeight: 600,
                                    padding: 4,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Image
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "90%",
                                      resizeMode: "cover",
                                      borderRadius: 10,
                                    }}
                                  />
                                  <Text
                                    style={
                                      {
                                        fontSize: 16,
                                        color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                        textAlign: 'justify',
                                        fontFamily: 'Roboto',
                                        fontWeight: "500",
                                        lineHeight: 24
                                      }
                                    }>
                                    {message.text}
                                    {" "}
                                    <Text
                                      style={{
                                        fontWeight: "400",
                                        marginLeft: 10,
                                        fontSize: 14,
                                        color: "lightgray",
                                      }}
                                    >
                                      {formatMessageDate(message.createdAt)}
                                    </Text>
                                  </Text>
                                </View>
                              )
                            }
                            {
                              message.attachment.type === "document" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 200,
                                    height: 300,
                                    maxHeight: 600,
                                    padding: 4,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Text
                                    style={{
                                      width: "100%",
                                      borderRadius: 10,
                                      color: 'blue', // couleur du lien
                                      textDecorationLine: 'underline', // soulignement du lien
                                    }}
                                    onPress={() => Linking.openURL(message.attachment.url)}
                                  >
                                    {message.attachment.url}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                      textAlign: 'justify',
                                      fontFamily: 'Roboto',
                                      fontWeight: "500",
                                      lineHeight: 24
                                    }}
                                  >
                                    {message.text}
                                    {" "}
                                    <Text
                                      style={{
                                        fontWeight: "400",
                                        marginLeft: 10,
                                        fontSize: 14,
                                        color: "lightgray",
                                      }}
                                    >
                                      {formatMessageDate(message.createdAt)}
                                    </Text>
                                  </Text>
                                </View>
                              )
                            }

                          </Pressable>
                        </View >
                      </>
                    )
                  }
                  {
                    message.attachment && !message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,

                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                            onPress={() => handleImagePress(message.attachment.url)}
                          >
                            {
                              message.attachment.type === "image" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 200,
                                    height: 300,
                                    maxHeight: 600,
                                    padding: 4,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Image
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: 10,
                                      resizeMode: "cover"
                                    }}
                                  />

                                </View>
                              )
                            }

                          </Pressable>
                        </View >
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 10,
                              color: "gray",
                              marginLeft: 5,
                              marginRight: 5,
                              marginTop: 5,
                            }}
                          >
                            {formatMessageDate(message.createdAt)}
                          </Text>
                        </View>
                      </>
                    )
                  }
                </>
              )}

            {
              message.type === "sending" && (
                <>
                  {!message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />
                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: "#F80303",
                              borderRadius: 20,
                              maxWidth: 250,
                              maxHeight: 200,
                              padding: 4,

                              justifyContent: "center",
                              flexDirection: "column",
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
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingLeft: 10,
                                marginTop: 2,
                              }}>

                              <FontAwesome
                                name="mail-forward"
                                size={14}
                                color={"lightgray"}

                              />
                              <Text
                                style={{
                                  color: "lightgray",
                                  marginLeft: 5,
                                  fontWeight: "600",
                                  fontSize: 12,
                                }}
                              >
                                forwarded
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                position: "relative ",
                                zIndex: 1,
                                marginBottom: 10,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: 10
                                }}
                              >
                                <TouchableOpacity

                                  style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 30,
                                    marginLeft: 10,
                                    zIndex: 1,
                                  }}
                                  onPress={() => goProfil(foundPoster.posterId)}>
                                  <Image
                                    source={{
                                      uri:
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                          .map((user) => {
                                            if (user._id === foundPoster?.posterId) {
                                              return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                            }
                                            else
                                              return null;
                                          })
                                          .join(""),
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: 30,
                                      resizeMode: "cover",
                                      zIndex: 1,
                                    }}
                                  />
                                  {!isUserOnline && (<View
                                    style={{
                                      backgroundColor: "#09C03C",
                                      position: "absolute",
                                      left: 20,
                                      width: 6,
                                      height: 6,
                                      borderRadius: 25,
                                      borderWidth: 1,
                                      borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                                      top: 20,
                                      zIndex: 100
                                    }}>
                                  </View>
                                  )}
                                </TouchableOpacity>



                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginLeft: 6,
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: 5,
                                        fontWeight: "600",
                                        fontSize: 12,
                                      }}
                                    >
                                      {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                          if (user._id === foundPoster?.posterId) return user.pseudo;
                                          else return null;
                                        })}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: isDarkMode ? "#F5F5F5" : "black",

                                      fontSize: 10,
                                      marginLeft: 5,
                                      marginTop: 4,
                                      fontWeight: "400",
                                      fontSize: 10,
                                      lineHeight: 12,
                                    }}
                                  >
                                    {formatPostDate(foundPoster?.createdAt)}
                                  </Text>
                                </View>
                              </View>



                            </View>

                            <View
                              style={{
                                zIndex: 1,
                                //height: "20%",
                                width: "90%",
                                marginLeft: 10,
                                paddingTop: 10,
                                paddingBottom: 20,
                                // backgroundColor:"red"
                              }}
                            >
                              <Text
                                style={{
                                  color: isDarkMode ? "#F5F5F5" : "black",
                                  fontSize: 14,
                                  fontWeight: "400",
                                  textAlign: "justify",
                                  lineHeight: 20,
                                }}
                              >

                                {foundPoster?.message}
                              </Text>
                            </View>


                          </View>

                          {

                            own && isUserOnline && message.isRead === false ?
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  paddingTop: 5,
                                  fontSize: 12,
                                  color: "lightgray",
                                }}
                              >
                                Distribué
                              </Text>
                              :
                              <View
                                style={{
                                  backgroundColor: "#09C03C",
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  width: 10,
                                  height: 10,
                                  borderRadius: 30,
                                }}
                              >

                              </View>
                          }


                        </Pressable>
                      </View >

                    </>

                  )}


                  {message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />
                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: "#F80303",
                              borderRadius: 10,
                              maxWidth: 300,
                              maxHeight: 200,
                              padding: 10,

                              justifyContent: "center",
                              flexDirection: "row",
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
                            <Text
                              style={
                                {
                                  fontSize: 16,
                                  color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                  textAlign: 'justify',
                                  fontFamily: 'Roboto',
                                  fontWeight: "500",
                                  lineHeight: 24
                                }
                              }>
                              {message.text}
                              {" "}
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  fontSize: 14,
                                  color: "lightgray",
                                }}
                              >
                                {formatMessageDate(message.createdAt)}
                              </Text>
                            </Text>

                          </View>
                          {
                            own && isUserOnline && message.isRead === false ?
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  paddingTop: 5,
                                  fontSize: 12,
                                  color: "lightgray",
                                }}
                              >
                                Distribué
                              </Text>
                              :
                              <View
                                style={{
                                  backgroundColor: "#09C03C",
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  width: 10,
                                  height: 10,
                                  borderRadius: 30,
                                }}
                              >

                              </View>
                          }


                        </Pressable>
                      </View >

                    </>

                  )}
                  {
                    message.attachment && message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,
                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                          >
                            {
                              message.attachment.type === "image" && (

                                <>
                                  <View
                                    style={{
                                      backgroundColor: "#F80303",
                                      borderRadius: 10,
                                      width: 130,
                                      height: 200,
                                      maxHeight: 600,
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "column",
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
                                    <Image
                                      source={{
                                        uri: message.attachment.url,
                                      }}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 10,
                                      }}
                                    />

                                  </View>
                                  <View
                                    style={{
                                      backgroundColor: "#F80303",
                                      borderRadius: 10,
                                      maxWidth: 300,
                                      maxHeight: 200,
                                      padding: 4,
                                      marginTop: 5,
                                      justifyContent: "center",
                                      flexDirection: "row",
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                      },
                                      shadowOpacity: isDarkMode ? 0.16 : 0.6,
                                      shadowRadius: 3.84,
                                      elevation: 2,
                                    }}>
                                    <Text
                                      style={
                                        {
                                          fontSize: 14,
                                          color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                          textAlign: 'justify',
                                          fontFamily: 'Roboto',
                                          fontWeight: "500",
                                          lineHeight: 24
                                        }
                                      }>
                                      {message.text}
                                    </Text>
                                  </View>
                                </>
                              )
                            }
                            {
                              message.attachment.type === "video" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 130,
                                    height: 200,
                                    maxHeight: 600,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Video
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      resizeMode: "cover",
                                      borderRadius: 10,
                                    }}
                                  />
                                  <View
                                    style={{
                                      backgroundColor: "#F80303",
                                      borderRadius: 10,
                                      maxWidth: 300,
                                      maxHeight: 200,
                                      padding: 4,
                                      marginTop: 5,
                                      justifyContent: "center",
                                      flexDirection: "row",
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                      },
                                      shadowOpacity: isDarkMode ? 0.16 : 0.6,
                                      shadowRadius: 3.84,
                                      elevation: 2,
                                    }}>
                                    <Text
                                      style={
                                        {
                                          fontSize: 14,
                                          color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                          textAlign: 'justify',
                                          fontFamily: 'Roboto',
                                          fontWeight: "500",
                                          lineHeight: 24
                                        }
                                      }>
                                      {message.text}
                                    </Text>
                                  </View>
                                </View>
                              )
                            }

                          </Pressable>
                        </View >
                      </>
                    )
                  }
                  {
                    message.attachment && !message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,

                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                            onPress={() => handleImagePress(message.attachment.url)}
                          >
                            {
                              message.attachment.type === "image" && (

                                <>
                                  <View
                                    style={{
                                      backgroundColor: "#F80303",
                                      borderRadius: 10,
                                      width: 130,
                                      height: 200,
                                      maxHeight: 600,
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "column",
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
                                    <Image
                                      source={{
                                        uri: message.attachment.url,
                                      }}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 10,
                                      }}
                                    />

                                  </View>

                                </>
                              )
                            }
                            {
                              message.attachment.type === "video" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 200,
                                    height: 300,
                                    maxHeight: 600,
                                    padding: 4,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Video
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "90%",
                                      resizeMode: "cover",
                                      borderRadius: 10,
                                    }}
                                  />

                                </View>
                              )
                            }

                          </Pressable>
                        </View >

                      </>
                    )
                  }
                </>
              )}

          </View >
        ) : (



          <View style={styles.messageOther}>
            {
              message.type === "message" && (<>
                {
                  message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />

                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                              flexDirection: "column",
                              borderRadius: 10,
                              maxWidth: 300,
                              padding: 10,
                              maxHeight: 200,
                              justifyContent: "center",
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: isDarkMode ? 1 : 2,
                              },
                              shadowOpacity: isDarkMode ? 0.16 : 0.6,
                              shadowRadius: 3.84,
                              elevation: 2,
                            }
                            }
                          >
                            <Text
                              style={
                                {
                                  fontSize: 16,
                                  color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                  textAlign: 'justify',
                                  fontFamily: 'Roboto',
                                  fontWeight: "500",
                                  lineHeight: 24
                                }
                              }>
                              {message.text}
                              {" "}
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  fontSize: 14,
                                  color: "lightgray",
                                }}
                              >
                                {formatMessageDate(message.createdAt)}
                              </Text>
                            </Text>
                          </View>

                        </Pressable>
                      </View >
                    </>
                  )
                }
                {
                  message.attachment && message.text && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />

                        <Pressable
                          onLongPress={messageTools}
                        >
                          {
                            message.attachment.type === "image" && (
                              <View
                                style={{
                                  backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                  borderRadius: 10,
                                  width: 200,
                                  height: 300,
                                  maxHeight: 600,
                                  padding: 4,
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  flexDirection: "column",
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
                                <Image
                                  source={{
                                    uri: message.attachment.url,
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "90%",
                                    borderRadius: 10,
                                    resizeMode: "cover"
                                  }}
                                />
                                <Text
                                  style={
                                    {
                                      fontSize: 16,
                                      color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                      textAlign: 'justify',
                                      fontFamily: 'Roboto',
                                      fontWeight: "500",
                                      lineHeight: 24
                                    }
                                  }>
                                  {message.text}
                                  {" "}
                                  <Text
                                    style={{
                                      fontWeight: "400",
                                      marginLeft: 10,
                                      fontSize: 14,
                                      color: "lightgray",
                                    }}
                                  >
                                    {formatMessageDate(message.createdAt)}
                                  </Text>
                                </Text>
                              </View>
                            )
                          }
                        </Pressable>
                      </View >
                    </>
                  )
                }
                {
                  message.attachment && !message.text && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,

                          }}
                        />

                        <Pressable
                          onLongPress={messageTools}
                          onPress={handleImagePress}
                        >
                          {
                            message.attachment.type === "image" && (
                              <View
                                style={{
                                  backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                  borderRadius: 10,
                                  width: 200,
                                  height: 300,
                                  maxHeight: 600,
                                  padding: 4,
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  flexDirection: "column",
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
                                <Image
                                  source={{
                                    uri: message.attachment.url,
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 10,
                                    resizeMode: "cover"
                                  }}
                                />

                              </View>
                            )
                          }

                        </Pressable>
                      </View >
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "gray",
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 5,
                          }}
                        >
                          {formatMessageDate(message.createdAt)}
                        </Text>
                      </View>
                    </>
                  )
                }
              </>)}

            {
              message.type === "sending" && (
                <>
                  {!message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />
                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                              borderRadius: 10,
                              maxWidth: 250,
                              maxHeight: 200,
                              padding: 4,
                              justifyContent: "center",
                              flexDirection: "column",
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
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingLeft: 10,
                                marginTop: 2,
                              }}>

                              <FontAwesome
                                name="mail-forward"
                                size={14}
                                color={"lightgray"}

                              />
                              <Text
                                style={{
                                  color: "lightgray",
                                  marginLeft: 5,
                                  fontWeight: "600",
                                  fontSize: 12,
                                }}
                              >
                                forwarded
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                position: "relative ",
                                zIndex: 1,
                                marginBottom: 10,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginTop: 10
                                }}
                              >
                                <TouchableOpacity

                                  style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 30,
                                    marginLeft: 10,
                                    zIndex: 1,
                                  }}
                                  onPress={() => goProfil(foundPoster.posterId)}>
                                  <Image
                                    source={{
                                      uri:
                                        !isEmpty(usersData[0]) &&
                                        usersData
                                          .map((user) => {
                                            if (user._id === foundPoster?.posterId) {
                                              return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                                            }
                                            else
                                              return null;
                                          })
                                          .join(""),
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: 30,
                                      resizeMode: "cover",
                                      zIndex: 1,
                                    }}
                                  />

                                </TouchableOpacity>



                                <View
                                  style={{
                                    flexDirection: "column",
                                    marginLeft: 6,
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: 5,
                                        fontWeight: "600",
                                        fontSize: 12,
                                      }}
                                    >
                                      {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                          if (user._id === foundPoster?.posterId) return user.pseudo;
                                          else return null;
                                        })}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      color: isDarkMode ? "#F5F5F5" : "black",

                                      fontSize: 10,
                                      marginLeft: 5,
                                      marginTop: 4,
                                      fontWeight: "400",
                                      fontSize: 10,
                                      lineHeight: 12,
                                    }}
                                  >
                                    {formatPostDate(foundPoster?.createdAt)}
                                  </Text>
                                </View>
                              </View>



                            </View>

                            <View
                              style={{
                                zIndex: 1,
                                //height: "20%",
                                width: "90%",
                                marginLeft: 10,
                                paddingTop: 10,
                                paddingBottom: 20,
                                // backgroundColor:"red"
                              }}
                            >
                              <Text
                                style={{
                                  color: isDarkMode ? "#F5F5F5" : "black",
                                  fontSize: 14,
                                  fontWeight: "400",
                                  textAlign: "justify",
                                  lineHeight: 20,
                                }}
                              >

                                {foundPoster?.message}
                              </Text>
                            </View>
                          </View>

                        </Pressable>
                      </View >

                    </>

                  )}

                  {message.text && !message.attachment && (
                    <>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Image
                          source={{
                            uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 100,
                            marginRight: 10,
                          }}
                        />
                        <Pressable
                          onLongPress={messageTools}
                        >
                          <View
                            style={{
                              backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                              borderRadius: 10,
                              maxWidth: 300,
                              maxHeight: 200,
                              padding: 10,

                              justifyContent: "center",
                              flexDirection: "row",
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
                            <Text
                              style={
                                {
                                  fontSize: 16,
                                  color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                  textAlign: 'justify',
                                  fontFamily: 'Roboto',
                                  fontWeight: "500",
                                  lineHeight: 24
                                }
                              }>
                              {message.text}
                              {" "}
                              <Text
                                style={{
                                  fontWeight: "400",
                                  marginLeft: 10,
                                  fontSize: 14,
                                  color: "lightgray",
                                }}
                              >
                                {formatMessageDate(message.createdAt)}
                              </Text>
                            </Text>

                          </View>

                        </Pressable>
                      </View >

                    </>

                  )}
                  {
                    message.attachment && message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,
                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                          >
                            {
                              message.attachment.type === "image" && (

                                <>
                                  <View
                                    style={{
                                      backgroundColor: "#F80303",
                                      borderRadius: 10,
                                      width: 130,
                                      height: 200,
                                      maxHeight: 600,
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "column",
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
                                    <Image
                                      source={{
                                        uri: message.attachment.url,
                                      }}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 10,
                                      }}
                                    />

                                  </View>
                                  <View
                                    style={{
                                      backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                      borderRadius: 10,
                                      maxWidth: 300,
                                      maxHeight: 200,
                                      padding: 4,
                                      marginTop: 5,
                                      justifyContent: "center",
                                      flexDirection: "row",
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                      },
                                      shadowOpacity: isDarkMode ? 0.16 : 0.6,
                                      shadowRadius: 3.84,
                                      elevation: 2,
                                    }}>
                                    <Text
                                      style={
                                        {
                                          fontSize: 14,
                                          color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                          textAlign: 'justify',
                                          fontFamily: 'Roboto',
                                          fontWeight: "500",
                                          lineHeight: 24
                                        }
                                      }>
                                      {message.text}
                                    </Text>
                                  </View>
                                </>
                              )
                            }
                            {
                              message.attachment.type === "video" && (
                                <View
                                  style={{
                                    backgroundColor: "#F80303",
                                    borderRadius: 10,
                                    width: 130,
                                    height: 200,
                                    maxHeight: 600,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Video
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      resizeMode: "cover",
                                      borderRadius: 10,
                                    }}
                                  />
                                  <View
                                    style={{
                                      backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                      borderRadius: 10,
                                      maxWidth: 300,
                                      maxHeight: 200,
                                      padding: 4,
                                      marginTop: 5,
                                      justifyContent: "center",
                                      flexDirection: "row",
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: isDarkMode ? 1 : 2,
                                      },
                                      shadowOpacity: isDarkMode ? 0.16 : 0.6,
                                      shadowRadius: 3.84,
                                      elevation: 2,
                                    }}>
                                    <Text
                                      style={
                                        {
                                          fontSize: 14,
                                          color: isDarkMode ? "#FFFFFF" : "#FFFFFF",
                                          textAlign: 'justify',
                                          fontFamily: 'Roboto',
                                          fontWeight: "500",
                                          lineHeight: 24
                                        }
                                      }>
                                      {message.text}
                                    </Text>
                                  </View>
                                </View>
                              )
                            }

                          </Pressable>
                        </View >
                      </>
                    )
                  }
                  {
                    message.attachment && !message.text && (
                      <>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            source={{
                              uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                            }}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 100,
                              marginRight: 10,

                            }}
                          />

                          <Pressable
                            onLongPress={messageTools}
                            onPress={() => handleImagePress(message.attachment.url)}
                          >
                            {
                              message.attachment.type === "image" && (

                                <>
                                  <View
                                    style={{
                                      backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                      borderRadius: 10,
                                      width: 130,
                                      height: 200,
                                      maxHeight: 600,
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "column",
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
                                    <Image
                                      source={{
                                        uri: message.attachment.url,
                                      }}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 10,
                                      }}
                                    />

                                  </View>

                                </>
                              )
                            }
                            {
                              message.attachment.type === "video" && (
                                <View
                                  style={{
                                    backgroundColor: isDarkMode ? "#403F3F" : "#004AAD",
                                    borderRadius: 10,
                                    width: 200,
                                    height: 300,
                                    maxHeight: 600,
                                    padding: 4,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
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
                                  <Video
                                    source={{
                                      uri: message.attachment.url,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: "90%",
                                      resizeMode: "cover",
                                      borderRadius: 10,
                                    }}
                                  />

                                </View>
                              )
                            }

                          </Pressable>
                        </View >

                      </>
                    )
                  }
                </>
              )}

          </View >
        )
      }

      <Modal
        isVisible={showMessageTools}
        onBackdropPress={messageTools}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriverForBackdrop
      >
        <View
          style={{
            backgroundColor: "white",
            height: "60%",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <Text style={{ marginBottom: 10 }}>Message text: {message.text}</Text>
          <Pressable
            onPress={deleteMessage}
            style={{
              backgroundColor: "red",
              height: "10%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                textAlign: 'justify',
                fontFamily: 'Roboto',
                fontWeight: "500",
                lineHeight: 24
              }}
            >
              Remove message
            </Text>
          </Pressable>


        </View>
      </Modal >

      <Modal
        isVisible={showImage}
        transparent={true}
        animationType="slide"
        onRequestClose={closeImageModal}
      >
        <View style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: isDarkMode ? "black" : "black",
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

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}
          >
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain"
                }}
              />
            )}
          </View>
        </View>
      </Modal>

    </>

  );
};

const styles = StyleSheet.create({
  messageOwn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 10,
    marginLeft: 10,
    marginTop: "4%",
  },
  messageOther: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
    marginTop: "4%",
    marginLeft: 10,
  },


});

export default MessagesUser;
