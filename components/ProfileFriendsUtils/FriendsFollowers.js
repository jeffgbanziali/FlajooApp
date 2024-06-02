import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import FollowHandler from "../ProfileUtils.js/FollowHandler";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../Context/AppContext";


const FriendsFollowers = () => {
  const route = useRoute();
  const { id } = route.params;
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const users = usersData.find((user) => user._id === id);
  const { t } = useTranslation();
  const { isDarkMode, isConnected } = useDarkMode();

  const navigation = useNavigation();
  const handleClickReturnProfile = () => {
    console.log("clicked");
    navigation.goBack("ProfilFriends", { id });
  };



  const goProfil = (id) => {
    if (userData._id === id) {
      navigation.navigate("Profile", { id });
    } else {
      navigation.navigate("ProfilFriends", { id });
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",

      }}
    >
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => handleClickReturnProfile(id)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkMode ? "#161414" : "#E3E4E5",
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: "3.5%",
              marginTop: "1.5%",
            }}
          >
            <AntDesign
              name="arrowleft"
              size={25}
              color={isDarkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "semibold",
              color: isDarkMode ? "white" : "black",
              textAlign: "center",
              marginRight: "4.5%",
            }}
          >
            {users.followers ? users.followers.length : 0}      {t("Myfollowers")}
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 50,
              marginTop: 10,
            }}
          >
            {usersData.map((user) => {
              for (let i = 0; i < users.followers.length; i++) {
                if (user._id === users.followers[i]) {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => goProfil(user._id)}
                        style={{
                          padding: 5,
                          marginTop: 10,
                          marginBottom: 10,
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              user.picture ||
                              "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            objectFit: "cover",
                          }}
                        />

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: isDarkMode ? "white" : "black",
                            textAlign: "center",
                            marginLeft: 16,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                          }}
                        >
                          {user.pseudo}
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={{
                          padding: 5,
                          marginTop: 10,
                          marginBottom: 10,
                          justifyContent: "center",

                        }}
                      >
                        {user._id === userData._id ? (
                          <Text
                            style={{
                              fontSize: 20,
                              color: isDarkMode ? "white" : "black",
                            }}
                          >
                            {t('You')}
                          </Text>
                        ) : (
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        )}

                      </View>

                    </View>
                  );
                }
              }
              return null;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendsFollowers;
