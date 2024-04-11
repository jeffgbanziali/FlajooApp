import { View, Text, Image, TouchableOpacity, Pressable, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { APP_API_URL } from "../../config";
import { formatPostDate } from "../../components/Context/Utils";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDarkMode } from "../../components/Context/AppContext";
import FollowHandler from "../../components/ProfileUtils.js/FollowHandler";

const Conversation = ({ conversation, currentUser }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [user, setUser] = useState();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log(currentUser._id);

    const getFriendInfo = async () => {
      try {
        const response = await axios.get(
          `${APP_API_URL}/api/user/${friendId}`
        );
        setUser(response.data);
        console.log("Updated user state:", response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getFriendInfo();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: isPressed ? "#6F6F6F" : "#F3F2F2",
    backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
    width: "100%",
    height: "100%",
  };

  const handleClickMessage = () => {
    console.log("clicked");
    navigation.navigate("Chatlist", {
      conversationId: conversation._id,
      user: user
    });
  };



  const viewProfile = () => {
    setShowOptions(!showOptions);
  };
  const closeModal = () => {
    setShowOptions(false);
  };
  const goProfil = (id) => {

    navigation.navigate("ProfilFriends", { id });
    console.log("go to profile friends", id);
    closeModal();
  };

  const MAX_MESSAGE_LENGTH = 36;

  const renderLimitedMessage = (message) => {
    if (message.length <= MAX_MESSAGE_LENGTH) {
      return message;
    } else {
      return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
    }
  };


  return (
    <>
      <TouchableOpacity
        style={containerStyle}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={handleClickMessage}
      >

        <View
          style={{
            width: "100%",
            height: "100%",
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
                width: 60,
                height: 60,
                borderRadius: 100,
              }}
            >
              <Image
                source={{
                  uri: user?.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
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
              width: "80%",
              height: "100%",
              //backgroundColor: "red",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                justifyContent: "center",
                //backgroundColor: "red",
                height: "80%",
                width: "84%"
              }}>
              <Text
                style={{
                  fontSize: 18,
                  alignItems: "center",
                  fontWeight: "600",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                {user?.pseudo}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 4,
                  alignItems: "center",
                  fontWeight: "400",
                  color: "gray"
                }}
              >
                {renderLimitedMessage(conversation.message)}
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "16%",
                height: "80%",
              }}>
              <Text
                style={{
                  fontSize: 12,
                  alignItems: "center",
                  fontWeight: "600",
                  color: isDarkMode ? "white" : "black",

                }}
              >
                22:11
              </Text>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 100,
                  backgroundColor: "red",
                  alignItems: "center",
                  marginTop: 6,
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
                  2
                </Text>
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
                {user?.pseudo}
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
                source={{ uri: user?.picture ? user.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
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
                onPress={() => goProfil(user._id)}
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
                <FollowHandler idToFollow={user?._id ?? ''} type={"mess"} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Conversation;
