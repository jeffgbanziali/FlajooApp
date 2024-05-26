import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Animated, Easing,
  Pressable
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from "@react-navigation/native";
import FollowHandler from "../../components/ProfileUtils.js/FollowHandler";
import { useDispatch, useSelector } from "react-redux";
import NavButtonProfile from "../../components/ProfileUtils.js/NavButtonProfile";
import ProfileFriendsTools from "../../components/ProfileFriendsUtils/ProfileFriendsTools";
import PostsFriendsUser from "../../components/ProfileFriendsUtils/PostsFriendsUser";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import VideoRéelsFriendsUser from "../../components/ProfileFriendsUtils/VideoRéelsFriendsUser";
import { SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import FriendsSettings from "../../components/ProfileFriendsUtils/FriendsSettings";
import MaterialTopNavigation from "../../navigation/MaterialTopNavigation";
import { isEmpty } from "../../components/Context/Utils";
import MaterialTopFriendsNavigation from "../../navigation/MaterialTopFriendsNavigation";
import { createConversation, fetchConversations } from "../../actions/conversation.action";
import SendMessage from "../../components/ProfileUtils.js/SendMessage";
import FriendsTools from "./FriendsTools";


const ProfileFriends = () => {
  const route = useRoute();
  const { id } = route.params;
  const { isDarkMode, isConnected } = useDarkMode();
  const navigation = useNavigation();
  const { uid } = useContext(UidContext)
  const usersData = useSelector((state) => state.usersReducer);
  const users = usersData.find((user) => user._id === id);


  const [pressComment, setPressComment] = useState(new Animated.Value(0));
  const [pressInComments, setPressInComments] = useState(false);


  const areYouPressComment = () => {
    if (pressInComments) {
      Animated.timing(pressComment, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setPressInComments(false));
    } else {
      setPressInComments(true);
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
      <SafeAreaView

        style={{
          backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      >

        <ScrollView
          showsVerticalScrollIndicator={false} >
          <View
            style={{
              //backgroundColor: "red",
              width: "100%",
              maxHeight: 450,
            }}>

            <FriendsTools
              users={users}
              areYouPressComment={areYouPressComment}
            />


            <ProfileFriendsTools users={users} />

          </View >

          {

         /* <View
            style={{
              backgroundColor: "red",
              width: "100%",
              height: 600,
              marginTop: "13%"
            }}>
            <MaterialTopFriendsNavigation users={users} />


          </View>*/}
        </ScrollView >



      </SafeAreaView >






      <Modal
        isVisible={pressInComments}
        onBackdropPress={areYouPressComment}
        //transparent={true}
        backdropOpacity={0.5}
        animationIn="pulse"
        animationOut="fadeOut"
        useNativeDriverForBackdrop
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FriendsSettings areYouPressComment={areYouPressComment} users={users} />

      </Modal>

    </ >
  );
};

export default ProfileFriends;
