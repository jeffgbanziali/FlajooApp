import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Animated, Easing
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from "@react-navigation/native";
import FollowHandler from "../../components/ProfileUtils.js/FollowHandler";
import { useSelector } from "react-redux";
import NavButtonProfile from "../../components/ProfileUtils.js/NavButtonProfile";
import ProfileFriendsTools from "../../components/ProfileFriendsUtils/ProfileFriendsTools";
import PostsFriendsUser from "../../components/ProfileFriendsUtils/PostsFriendsUser";
import { useDarkMode } from "../../components/Context/AppContext";
import VideoRéelsFriendsUser from "../../components/ProfileFriendsUtils/VideoRéelsFriendsUser";
import { SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import FriendsSettings from "../../components/ProfileFriendsUtils/FriendsSettings";
import MaterialTopNavigation from "../../navigation/MaterialTopNavigation";
import { isEmpty } from "../../components/Context/Utils";


const ProfileFriends = () => {
  const route = useRoute();
  const { id } = route.params;
  const { isDarkMode } = useDarkMode();
  const [selectedSwitchValue, setSelectedSwitchValue] = useState();

  const navigation = useNavigation();
  const { t } = useTranslation();



  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);





  const handleClickReturnHome = () => {
    console.log("clicked");
    navigation.navigate("TabNavigation");
  };




  const handleSendMEssage = (id) => {
    console.log("clicked");
    navigation.navigate("Chatlist", { id });
  };

  const users = usersData.find((user) => user._id === id);




  const MAX_MESSAGE_LENGTH = 55;

  const renderLimitedMessage = (message) => {
    if (message && message.length <= MAX_MESSAGE_LENGTH) {
      return message;
    } else if (message) {
      return message.substring(0, MAX_MESSAGE_LENGTH) + "...";
    } else {
      return "";
    }
  };











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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView>




          <View
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? "#171717" : "white",
              borderRadius: 30,
              paddingBottom: 50,
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
                  marginTop: "1.5%",
                }}
              >
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color={isDarkMode ? "white" : "black"}
                />
              </TouchableOpacity>


              <TouchableOpacity
                onPress={areYouPressComment}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  marginRight: "3.5%",
                  marginTop: "1.5%",
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
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: -16,
                padding: 5,
              }}
            >
              <View
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
              >
                <Image
                  source={{
                    uri: users.picture,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    objectFit: "cover",
                  }}
                />

                <View
                  style={{
                    backgroundColor: "#09C03C",
                    position: "absolute",
                    left: 65,
                    width: 20,
                    height: 20,
                    borderRadius: 25,
                    borderWidth: 2,
                    borderColor: "#000000",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    marginLeft: 80,
                    marginTop: 100,
                    zIndex: 100,
                  }}
                ></View>
              </View>

              <Text
                style={{
                  fontSize: 30,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "500",
                  marginTop: 10,
                }}
              >
                {users.pseudo}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  width: "50%",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>
                  {renderLimitedMessage(users.bio)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    marginRight: 4,
                  }}
                >
                  <FollowHandler idToFollow={id} type={"profile"} />
                </View>
                <View
                  style={{
                    marginLeft: 4,
                  }}
                >
                  <TouchableOpacity onPress={() => handleSendMEssage(id)}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "red",
                        borderRadius: 10,
                        height: 38,
                        width: 170,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "500",
                          justifyContent: "center",
                          fontSize: 20,
                        }}
                      >
                        Writing
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>




            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                height: "10%",
              }}

            >
              {users.followers && users.followers.length > 0 && (
                users.followers.length === 1 ? (
                  <>

                    {
                      users.followers[0] === userData._id ? (
                        <>


                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "normal",
                              color: isDarkMode ? "white" : "black",
                            }}
                          >
                            {t('Followby')}{" "}
                          </Text>
                          <Text
                            style={{
                              color: isDarkMode ? "gray" : "black",
                              fontSize: 16,
                              fontWeight: "normal"
                            }}
                          >
                            {t("You")}

                          </Text>
                        </>

                      ) : (
                        <>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "normal",
                              color: isDarkMode ? "white" : "black",
                            }}
                          >
                            {t('Followby')}{" "}
                          </Text>
                          <Text
                            style={{
                              color: isDarkMode ? "gray" : "black",
                              fontSize: 16,
                              fontWeight: "normal"
                            }}
                          >
                            {/*t("You")*/}
                            {!isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.pseudo}

                          </Text>
                        </>
                      )
                    }

                  </>
                ) : users.followers.length > 1 ? (

                  <>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "normal",
                        color: isDarkMode ? "white" : "black",
                      }}
                    >
                      {t('Followby')}
                    </Text>
                    <Image
                      source={{
                        uri: !isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.picture ? !isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                      }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 100,
                        objectFit: "cover",
                        marginLeft: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        paddingLeft: 8,
                        fontWeight: "normal",
                        color: "gray",
                      }}
                    >
                      {!isEmpty(usersData[0]) && usersData.find((user) => user._id === users.followers[0])?.pseudo}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        paddingLeft: 8,
                        fontWeight: "normal",
                        color: isDarkMode ? "white" : "black",
                      }}
                    >
                      {t("And")} {users.followers.length - 1} {t("OtherPerso")}
                    </Text>
                  </>
                ) :
                  (
                    <Text
                      style={{
                        paddingLeft: 10,
                        color: isDarkMode ? "gray" : "black",
                        fontSize: 18,
                        fontWeight: "400",
                        color: isDarkMode ? "#F5F5F5" : "black",
                      }}
                    >
                      {t("NoFollowAccount")}
                    </Text>
                  )

              )}

            </View>






          </View>
          <ProfileFriendsTools users={users} />

          <NavButtonProfile onSwitchChange={setSelectedSwitchValue} />
          {selectedSwitchValue === "P" && (
            <View style={{ flex: 1, width: '100%', marginBottom: 10 }}>
              <PostsFriendsUser users={users} />
            </View>
          )}
          {selectedSwitchValue === "V" && (
            <View style={{
              flex: 1,
              width: '100%',
              marginBottom: 10
            }}>
              <VideoRéelsFriendsUser users={users} />
            </View>
          )}




        </ScrollView>
      </SafeAreaView>


















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

    </KeyboardAvoidingView >
  );
};

export default ProfileFriends;
