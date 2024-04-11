import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Conversation from "./Conversation";
import ChatOnline from "../../components/MessagesUser/MessageUser/ChatOnline";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import axios from "axios";
import { APP_API_URL } from "../../config";
import { SafeAreaView } from "react-native";
import { isEmpty } from "../../components/Context/Utils";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../actions/conversation.action";

const Message = () => {

  const [currentChat, setCurrentChat] = useState(null);


  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const conversations = useSelector(state => state.conversationReducer);

  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    !isEmpty(usersData)[0] && setIsLoading(false);
  }, [usersData]);


  const { uid } = useContext(UidContext);

  const dispatch = useDispatch();



  const myConversation = conversations.conversations.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt))



  useEffect(() => {
    dispatch(fetchConversations(uid));
  }, [dispatch, uid]);


  const handleClickReturnHome = () => {
    console.log("clicked");
    navigation.navigate("TabNavigation");
  };



  const handleSearch = () => {
    console.warn("Searching");
  };




  const handleCreateNewMessage = () => {
    navigation.navigate("CreateNewConversation")
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

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#3B3A3A" : "#E9C8C8",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "6%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "40%",

          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 30,
              marginLeft: "3.5%",
            }}
          >
            <TouchableOpacity
              onPress={handleClickReturnHome}>
              <AntDesign
                name="arrowleft"
                size={28}
                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              height: "80%",
              marginLeft: "1.5%",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
              }}
            >
              {renderLimitedMessage(userData.pseudo)}
            </Text>
          </View>
        </View>


        <View
          style={{
            width: "20%",
            marginRight: "1%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            //backgroundColor:"red",
            alignItems: "center",
          }}
        >


          <TouchableOpacity onPress={handleCreateNewMessage}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
          >
            <Entypo
              name="new-message"
              size={22}
              color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={handleSearch}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
          >
            <AntDesign
              name="search1"
              size={24}
              color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: "14%",
          //backgroundColor: "red",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <ChatOnline />
      </View>

      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: "2%"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            position: "relative",
          }}
        >
          <View
            style={{
              width: "100%",
              position: "relative",
              marginTop: "2%",
              marginBottom: "1%",
              marginLeft: "3%",
              padding: 10
            }}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: "500",
                color: isDarkMode ? "white" : "black",
              }}>
              {t('Messages')}
            </Text>
          </View>

          {isLoading ? (

            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: isDarkMode ? "white" : "black",
                  }}
                >
                  {t('Loading')}
                </Text>
                <ActivityIndicator size="large" color="white" />
              </View>
              <Text
                style={{
                  fontSize: 26,
                  marginTop: "5%",
                  textAlign: "center",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                {t('PleaseWait')}
              </Text>
            </View>

          ) : (
            <View
              style={{
                width: "100%",
                height: "78%",
                marginTop: 10,
              }}
            >
              <FlatList
                data={myConversation}
                keyExtractor={(item) => item._id} // Utilise une clé unique de chaque élément
                renderItem={({ item: c }) => (
                  <TouchableOpacity onPress={() => setCurrentChat(c)}>
                    <View
                      style={{
                        width: "100%",
                        padding: 1,
                        height: 90,
                        justifyContent: "center",
                      }}
                    >
                      <Conversation conversation={c} currentUser={uid} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Message;
