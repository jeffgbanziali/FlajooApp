import React, { useState } from "react";
import { Animated, Dimensions, Easing, KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { formatPostDate } from "../Context/Utils";
import Modal from "react-native-modal";
import { useDarkMode } from "../Context/AppContext";
import { TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from "react-i18next";


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const MessagesUser = ({ message, own, user }) => {
  const userData = useSelector((state) => state.userReducer);
  const [showMessageTools, setMessageTools] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [messageHeight, setCommentsHeight] = useState(new Animated.Value(0));
  const { isDarkMode } = useDarkMode();
  console.log(user)
  const userImageUri = own ? userData.picture : user.picture;

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
  

  const {t} = useTranslation();


  const deleteMessage = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/message/${message._id}`, {
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

  console.log(message)

  let opacity = new Animated.Value(0);

  


  return (
    <>
      {
        own ? (

          <View style={styles.messageOwn}>

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
                        borderRadius: 20,
                        maxWidth: 300,
                        maxHeight: 200,
                        padding: 10,
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
                      <Text
                        style={
                          {
                            fontSize: 18,
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
                    {formatPostDate(message.createdAt)}
                  </Text>
                </View>
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
                                  fontSize: 18,
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
                      {formatPostDate(message.createdAt)}
                    </Text>
                  </View>
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
                      {formatPostDate(message.createdAt)}
                    </Text>
                  </View>
                </>
              )
            }
          </View >
        ) : (
          <View style={styles.messageOther}>
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
                          backgroundColor: isDarkMode ? "#403F3F" : "#FDFDFD",
                          flexDirection: "column",
                          borderRadius: 20,
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
                              fontSize: 18,
                              color: isDarkMode ? "#FFFFFF" : "#5E5E5E",
                              textAlign: 'justify',
                              fontFamily: 'Roboto',
                              fontWeight: "500",
                              lineHeight: 24
                            }}>
                          {message.text}
                        </Text>
                      </View>
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
                      {formatPostDate(message.createdAt)}
                    </Text>
                  </View>
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
                              backgroundColor: isDarkMode ? "#403F3F" : "#FDFDFD",
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
                                  fontSize: 18,
                                  color: isDarkMode ? "#FFFFFF" : "#5E5E5E",
                                  textAlign: 'justify',
                                  fontFamily: 'Roboto',
                                  fontWeight: "500",
                                  lineHeight: 24
                                }
                              }>
                              {message.text}
                            </Text>
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
                      {formatPostDate(message.createdAt)}
                    </Text>
                  </View>
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
                              backgroundColor: isDarkMode ? "#403F3F" : "#FDFDFD",
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
                      {formatPostDate(message.createdAt)}
                    </Text>
                  </View>
                </>
              )
            }

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
    marginTop: "2.5%",
  },
  messageOther: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
    marginTop: "2.5%",
    marginLeft: 10,
  },

});

export default MessagesUser;
