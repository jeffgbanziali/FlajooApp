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
import ConversationHeader from "./ConversationHeader";
import ConversationSearching from "./ConversationSearching";

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
        width: "100%",
        height: "100%",
        //backgroundColor: isDarkMode ? "#3B3A3A" : "#E9C8C8",
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",

        alignItems: "center"
      }}>
      <ConversationHeader />

      <View
        style={{
          flex: 1,
          height: "94%",
          width: "100%",
          backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
          //borderTopLeftRadius: 30,
          //borderTopRightRadius: 30,
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
                height: "100%",
              }}
            >
              <FlatList
                data={myConversation}
                keyExtractor={(item) => item._id} // Utilise une clé unique de chaque élément
                renderItem={({ item: c }) => {
                  console.log("Me conversation", c)
                  return (
                    <TouchableOpacity onPress={() => setCurrentChat(c)}
                      style={{
                        width: "100%",
                        // backgroundColor: "green",
                        padding: 1,
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Conversation conversation={c} currentUser={uid} />
                    </TouchableOpacity>
                  )

                }}

                ListHeaderComponent={() => (
                  <>
                    <ConversationSearching />
                    <ChatOnline />
                    <View
                      style={{
                        width: "100%",
                        position: "relative",
                        marginBottom: "1%",
                        marginLeft: "3%",
                        padding: 10
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: isDarkMode ? "white" : "black",
                        }}>
                        {t('Messages')}
                      </Text>

                    </View>
                  </>

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
