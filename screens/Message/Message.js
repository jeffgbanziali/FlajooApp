import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
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
import { fetchConversations, markConversationAsRead } from "../../actions/conversation.action";
import ConversationHeader from "./ConversationHeader";
import ConversationSearching from "./ConversationSearching";
import { readMessage } from "../../actions/message.actions";

const Message = () => {


  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const usersData = useSelector((state) => state.usersReducer);
  const conversations = useSelector(state => state.conversationReducer);
  const [loadStories, setLoadStories] = useState(true);
  const { uid } = useContext(UidContext);


  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();





  useEffect(() => {
    if (loadStories) {
      dispatch(fetchConversations(uid));
      setLoadStories(false);
    }
  }, [loadStories, dispatch]);



  const dispatch = useDispatch();



  const myConversation = conversations.conversations.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt))


  useEffect(() => {
    !isEmpty(usersData)[0] && setIsLoading(false);
  }, [usersData]);



  return (

    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        //backgroundColor: isDarkMode ? "#3B3A3A" : "#E9C8C8",
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F9F9F9",

        alignItems: "center"
      }}>
      <ConversationHeader />

      <View
        style={{
          flex: 1,
          height: "94%",
          width: "100%",
          backgroundColor: isDarkMode ? "#0D0C0C" : "#F9F9F9",
          //borderTopLeftRadius: 30,
          //borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
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
                <ActivityIndicator size="small" color={isDarkMode ? "white" : "black"} />
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
              <View
                style={{
                  width: 140,
                  height: 140,
                  marginTop: 20,
                  borderRadius: 100,
                  //backgroundColor: "red"
                }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                  source={isDarkMode ? require("../../assets/Logos/1.png") : require("../../assets/Logos/1.png")}
                />
              </View>
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
              //  keyExtractor={(item) => item._id}
                renderItem={({ item: c }) => {


                  return (

                    <Conversation conversation={c} currentUser={uid} />
                  )

                }}

                ListHeaderComponent={() => (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      height: 220,
                    }}>
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
                  </View>

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
