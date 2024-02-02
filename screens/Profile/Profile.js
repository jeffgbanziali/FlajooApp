import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import ProfileUtils from "../../components/ProfileUtils.js/ProfileUtils";
import NavButtonProfile from "../../components/ProfileUtils.js/NavButtonProfile";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import PostsUser from "../../components/ProfileUtils.js/PostsUser";
import { useDarkMode } from "../../components/Context/AppContext";
import { KeyboardAvoidingView } from "react-native";
import VideoRéelsUser from "../../components/ProfileUtils.js/VideoRéelsUser";
import { SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer);
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();


  const [selectedSwitchValue, setSelectedSwitchValue] = useState();

  const handleClickReturnHome = () => {
    console.log("clicked");
    navigation.navigate("TabNavigation");
  };
  const handleClickSettings = () => {
    console.log("clicked");
    navigation.navigate("Settings");
  };


  const { t } = useTranslation();


  const MAX_MESSAGE_LENGTH = 180;
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
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >



      <View
        style={{
          //backgroundColor: "red",
          width: "100%",
          maxHeight: 380,
        }}>

        <View
          style={{
            backgroundColor: isDarkMode ? "#171717" : "white",
            borderRadius: 30,
            width: "100%",
            height: "100%",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              //backgroundColor: "red",
              paddingTop: "1.5%",
            }}
          >
            <TouchableOpacity
              onPress={handleClickReturnHome}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                width: 50,
                height: 50,
                borderRadius: 30,
                marginLeft: "3.5%",
              }}
            >
              <MaterialIcons
                name="arrow-back"
                size={28}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClickSettings}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                width: 50,
                height: 50,
                borderRadius: 30,
                marginRight: "3.5%",
              }}
            >
              <Entypo
                name="dots-three-horizontal"
                size={28}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              //backgroundColor: "red"
            }}
          >
            <Pressable
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
              }}>
              <Image
                source={{
                  uri: userData?.picture
                    ? userData.picture
                    : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />

              <View
                style={{
                  backgroundColor: "#09C03C",
                  position: "absolute",
                  left: 22,
                  width: 20,
                  height: 20,
                  borderRadius: 25,
                  borderWidth: 3,
                  borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  marginLeft: 80,
                  marginTop: 100,
                  zIndex: 100,
                }}
              ></View>
            </Pressable>

          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              //height: "10%",
              //backgroundColor: "red",
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "justify",
                color: isDarkMode ? "white" : "black",
              }}
            >
              {userData.pseudo}
            </Text>

          </View>
          <View
            style={{
              alignItems: "center",
              width: "60%",
              maxHeight: 200,
              // backgroundColor: "black",
              marginTop: 10
            }}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                color: "#5F5858",
                fontWeight: "500",
              }}
            >
              {renderLimitedMessage(userData.bio)}
            </Text>
          </View>
        </View>
        <ProfileUtils />
      </View>

      <View
        style={{
          //backgroundColor: "red",
          width: "100%",
          height: "100%",
          marginTop: "10%"
        }}>
        <NavButtonProfile onSwitchChange={setSelectedSwitchValue} />
        {
          selectedSwitchValue === "P" && (
            <View style={{ flex: 1, width: '100%', }}>
              <PostsUser />
            </View>
          )
        }
        {
          selectedSwitchValue === "V" && (
            <View style={{
              flex: 1,
              width: '100%',
              marginBottom: 10
            }}>
              <VideoRéelsUser />
            </View>
          )
        }
      </View>


    </SafeAreaView >
  );
};


export default Profile;
