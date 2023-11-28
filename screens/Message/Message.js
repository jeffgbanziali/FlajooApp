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
import ChatOnline from "../../components/MessagesUser/ChatOnline";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import axios from "axios";
import { APP_API_URL } from "../../config";
import { SafeAreaView } from "react-native";
import { USER } from "../../Data/Users";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
import { isEmpty } from "../../components/Context/Utils";
import { useTranslation } from "react-i18next";

const Message = () => {
  const [conver, setConver] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { isDarkMode } = useDarkMode();
  const usersData = initializeUseSelector((state) => state.usersReducer);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    !isEmpty(usersData)[0] && setIsLoading(false);
  }, [usersData]);


  const { uid } = useContext(UidContext);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${APP_API_URL}/api/conversation/${uid}`
        );

        const sortedConversations = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setConver(sortedConversations);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    getConversation();
  }, [uid]);

  const navigation = useNavigation();
  const handleClickReturnHome = () => {
    console.log("clicked");
    navigation.navigate("TabNavigation");
  };
  const handleSearch = () => {
    console.warn("Searching");
  };

  const handleCreateNewMessage = () => {
    console.warn("newMEssage");
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
            width: "30%",

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
            <TouchableOpacity onPress={handleClickReturnHome}>
              <AntDesign
                name="arrowleft"
                size={28}
                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "50%",
              height: "80%",
              marginLeft: "3.5%",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
              }}
            >
              {t('Chat')}
            </Text>

          </View>
        </View>
        <View
          style={{
            width: "20%",
            marginRight: "1%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleCreateNewMessage}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          >
            <Entypo
              name="new-message"
              size={28}
              color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 30,
            }}
          >
            <AntDesign
              name="search1"
              size={28}
              color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          height: "14%",
          width: "100%",
          flexDirection: "row",
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
              }}
            >
              <FlatList
                data={conver}
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
