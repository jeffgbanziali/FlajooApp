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
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { KeyboardAvoidingView } from "react-native";
import VideoRéelsUser from "../../components/ProfileUtils.js/VideoRéelsUser";
import { SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import MaterialTopNavigation from "../../navigation/MaterialTopNavigation";
import ProfilsStatements from "./ProfilsStatements";









const Profile = () => {
  const { isDarkMode, isConnected } = useDarkMode();


  return (

    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false} >
        <View
          style={{
            //backgroundColor: "red",
            width: "100%",
            maxHeight: 400,
          }}>

          <ProfilsStatements />

          <ProfileUtils />
        </View>

        <View
          style={{
            backgroundColor: "red",
            width: "100%",
            height: 900,
            marginTop: "10%"
          }}>
          <MaterialTopNavigation />
        </View>

      </ScrollView>


    </SafeAreaView >

  );
};


export default Profile;
