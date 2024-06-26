import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProfileFriends from "../screens/ProfileFriends/ProfileFriends";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Modal from "react-native-modal";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Réels from "../screens/Réels/Réels";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import NewPostScreen from "../screens/NewPostScreen/NewPostScreen";
import Profile from "../screens/Profile/Profile";
import Search from "../components/Search/Search";
import { useDarkMode } from "../components/Context/AppContext";
import Notifications from "../screens/Notifications/Notifications";
import CallScreen from "../screens/CallScreen/CallScreen";
import IncomingCall from "../screens/CallScreen/IncomingCall";
import VoiceCall from "../screens/CallScreen/VoiceCall";
import { useTranslation } from "react-i18next";
import { Easing } from "react-native";
import BestModel from "../screens/BestModel/BestModel";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { isDarkMode } = useDarkMode();
  const [clickCount, setClickCount] = useState(0);
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { t } = useTranslation();
  const [pressComment, setPressComment] = useState(new Animated.Value(0));




  const closeModal = () => {
    setShowOptions(false);
  };

  const AddPost = () => {
    console.log("AddPost")
    navigation.navigate("NewPostScreen")
    closeModal()

  }
  const AddReels = () => {
    console.log("AddReels")
    navigation.navigate("createRéels")
    closeModal()

  }
  const AddStory = () => {
    console.log("AddStory")
    navigation.navigate("StoryCreate")
    closeModal()

  }
  const StartLive = () => {
    console.log("StartLive")
    navigation.navigate("Live")
    closeModal()

  }

  const arePress = () => {
    if (showOptions) {
      Animated.timing(pressComment, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setShowOptions(false));
    } else {
      setShowOptions(true);
      Animated.timing(pressComment, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  };






  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            display: "flex",
            backgroundColor: isDarkMode ? "#171717" : "white",
            justifyContent: "center",
          },
          headerShown: false,
          tabBarActiveTintColor: isDarkMode ? "white" : "black",
          tabBarLabelStyle: {
            color: isDarkMode ? "white" : "black",
          },
          tabBarLabel: {
            display: "none"
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              focused ? (
                <Foundation name="home"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]}
                />
              ) : (
                <Feather
                  name="home"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]}
                />
              )
            ),
          }}
        />

        <Tab.Screen
          name="Searching"
          component={Search}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (

              <Feather
                name="search"
                size={26}
                color={isDarkMode ? "white" : "black"}
                style={[focused && styles.bottomTabIconFocused]}
              />

            ),
          }}
        />
        <Tab.Screen
          name="NewPostScreen"
          component={NewPostScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={arePress}
                style={{
                  backgroundColor: isDarkMode ? "#0D0C0C" : "#0D0C0C",
                  borderRadius: 10,
                  marginTop: 10,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Image
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: 100,
                  }}
                  source={isDarkMode ? require("../assets/Logos/1.png") : require("../assets/Logos/1.png")}
                />
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
            },
          })}
        />
        <Tab.Screen
          name="Réels"
          component={Réels}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              focused ? (
                <MaterialCommunityIcons
                  name="youtube-tv"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]}
                />
              ) : (
                <Octicons name="video"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]} />
              )

            ),
          }}
        />
        <Tab.Screen
          name="BestModel"
          component={BestModel}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              focused ? (
                <Feather

                  name="menu"
                  size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]}
                />
              ) : (
                <Feather
                  name="menu" size={26}
                  color={isDarkMode ? "white" : "black"}
                  style={[focused && styles.bottomTabIconFocused]}
                />
              )

            ),
          }}
        />
      </Tab.Navigator>


      <Modal
        isVisible={showOptions}
        //transparent={true}
        backdropOpacity={0.5}
        animationIn="pulse"
        animationOut="fadeOut"
        useNativeDriverForBackdrop
        onBackdropPress={arePress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >



        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>


          <View
            style={{
              borderRadius: 10,
              width: 240,
              height: 220,
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


            <TouchableOpacity
              onPress={AddPost}
              style={{
                width: '100%',
                height: '25%',
                flexDirection: "row",
                alignItems: "center",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255)",
                backgroundColor: isPressed ? "#F5F5F5" : "#FFFFFF",
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',

              }}>
              <AntDesign name="picture" size={25} color={isDarkMode ? "white" : "black"} />
              <Text
                style={{
                  color: isDarkMode ? "#F5F5F5" : "black",
                  fontSize: 18,
                  marginLeft: 14
                }}
              >
                {t('AddPosting')}
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={AddReels}
              style={{
                width: '100%',
                height: '25%',
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255)",
                backgroundColor: isPressed ? "#F5F5F5" : "#FFFFFF",
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',

              }}>
              <MaterialCommunityIcons
                name="youtube-tv"
                size={25}
                color={isDarkMode ? "white" : "black"}
              />
              <Text style={{
                color: isDarkMode ? "#F5F5F5" : "black",
                fontSize: 18,
                marginLeft: 14

              }}>
                {t('AddReels')}
              </Text>
            </TouchableOpacity>



            <TouchableOpacity
              onPress={AddStory}

              style={{
                width: '100%',
                height: '25%',
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255,255,255)",
              }}>
              <Ionicons name="book"
                size={25}
                color={isDarkMode ? "white" : "black"} />
              <Text style={{
                color: isDarkMode ? "#F5F5F5" : "black",
                fontSize: 18,
                marginLeft: 16
              }}>
                {t('AddStory')}
              </Text>
            </TouchableOpacity>



            <TouchableOpacity
              onPress={StartLive}
              style={{
                width: '100%',
                height: '25%',
                flexDirection: "row",
                alignItems: "center",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
                padding: 10,
                borderBottomColor: "rgba(255,255,255)",
              }}>

              <FontAwesome5
                name="video"
                size={25}
                color={isDarkMode ? "white" : "black"} />
              <Text style={{
                color: isDarkMode ? "#F5F5F5" : "black",
                fontSize: 18,
                marginLeft: 16
              }}>
                {t('LiveStream')}
              </Text>
            </TouchableOpacity>



          </View>
        </View>
      </Modal>



    </>
  );
};


const styles = StyleSheet.create(
  {



    bottomTabIconFocused: {
      color: "#ED3237",


    },

    tabIconContainer: {
      flexDirection: "row",
      width: "10%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ED3237"

    },

    addButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
export default TabNavigation;
