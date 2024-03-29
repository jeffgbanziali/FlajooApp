import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import StartPage from "../screens/StartPage/StartPage";
import Message from "../screens/Message/Message";
import Profile from "../screens/Profile/Profile";
import Settings from "../screens/Settings/Settings";
import NewPostScreen from "../screens/NewPostScreen/NewPostScreen";
import Notifications from "../screens/Notifications/Notifications";
import ChatList from "../screens/Message/ChatList";
import { UidContext } from "../components/Context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyFollowers from "../components/ProfileUtils.js/MyFollowers";
import FriendsFollowers from "../components/ProfileFriendsUtils/FriendsFollowers";
import MyFollowings from "../components/ProfileUtils.js/MyFollowings";
import FriendsFollowing from "../components/ProfileFriendsUtils/FriendsFollowing";
import ProfileFriends from "../screens/ProfileFriends/ProfileFriends";
import StoriesStream from "../components/homepage/Stories/StoriesStream";
import Search from "../components/Search/Search";
import TabNavigation from "./TabNavigation";
import Réels from "../screens/Réels/Réels";
import CameraScreen from "../screens/NewPostScreen/CameraScreen";
import LiveScreen from "../screens/LiveScreen/LiveScreen";
import CreateMyStory from "../components/homepage/Stories/CreateMyStory";
import ButtonColor from "../components/Settings/ButtonColor";
import ProfileEdit from "../components/Settings/ProfileEdit";
import BioUpdate from "../components/Settings/BioUpdate";
import StoryCamera from "../components/homepage/Stories/StoryCamera";
import CreateRéels from "../components/Réels/CreateRéels";
import StoriesStreamUser from "../components/homepage/Stories/StoriesStreamUser";
import IncomingCall from "../screens/CallScreen/IncomingCall";
import VoiceCall from "../screens/CallScreen/VoiceCall";
import VideoCall from "../screens/CallScreen/VideoCall";
import CallingOn from "../screens/CallScreen/CallingOn";
import VideoCallProgress from "../screens/CallScreen/VideoCallProgress";
import AboutThisAccount from "../screens/ProfileFriends/AboutThisAccount";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { uid } = useContext(UidContext)

  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('uid')
      .then((storedUid) => {
        if (storedUid) {
          setIsFirstTime(false);
        }
      });
  }, [isFirstTime]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        isFirstTime ? (
          <>
            <Stack.Screen name="Start" component={StartPage} />
            <Stack.Screen name="Signin" component={SignInScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </>
        ) :
          uid ? (
            <>
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
              <Stack.Screen name="Réels" component={Réels} />
              <Stack.Screen name="createRéels" component={CreateRéels} />
              <Stack.Screen name="StoryStream" component={StoriesStream} />
              <Stack.Screen name="StoryStreamUser" component={StoriesStreamUser} />
              <Stack.Screen name="ProfilFriends" component={ProfileFriends} />
              <Stack.Screen name="AboutThisAccount" component={AboutThisAccount} />
              <Stack.Screen name="Messages" component={Message} />
              <Stack.Screen name="IncomingCall" component={IncomingCall} />
              <Stack.Screen name="CallingOn" component={CallingOn} />
              <Stack.Screen name="VideoCallProgress" component={VideoCallProgress} />
              <Stack.Screen name="VoiceCall" component={VoiceCall} />
              <Stack.Screen name="VideoCall" component={VideoCall} />
              <Stack.Screen name="Chatlist" component={ChatList} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="EditProfil" component={ProfileEdit} />
              <Stack.Screen name="buttonning" component={ButtonColor} />
              <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
              <Stack.Screen name="StoryCreate" component={CreateMyStory} />
              <Stack.Screen name="Live" component={LiveScreen} />
              <Stack.Screen name="Photo" component={CameraScreen} />
              <Stack.Screen name="StoryCamera" component={StoryCamera} />
              <Stack.Screen name="BioUpdate" component={BioUpdate} />
              <Stack.Screen name="Notifications" component={Notifications} />
              <Stack.Screen name="Myfollowing" component={MyFollowings} />
              <Stack.Screen name="FriendsFollowing" component={FriendsFollowing} />
              <Stack.Screen name="Myfollowers" component={MyFollowers} />
              <Stack.Screen name="FriendsFollowers" component={FriendsFollowers} />
              <Stack.Screen name="Searching" component={Search} />

            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={SignInScreen} />
              <Stack.Screen name="Signup" component={SignUpScreen} />
              <Stack.Screen name="Changepassword" component={ForgotPasswordScreen} />
            </>
          )
      }



    </Stack.Navigator>
  );
};

export default StackNavigation;
