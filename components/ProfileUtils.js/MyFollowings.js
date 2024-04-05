import { View, Text, Image, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FollowHandler from "./FollowHandler";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";


const MyFollowers = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const navigation = useNavigation();



  const handleClickReturnProfile = () => {
    console.log("clicked");
    navigation.navigate("TabNavigation");
  };


  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "black",
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
            onPress={handleClickReturnProfile}
            style={{
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "#161414",
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: "3.5%",
              marginTop: "1.5%",
            }}
          >
            <View>
              <AntDesign
                name="arrowleft"
                size={25}
                color="#5F5858"
                style={{
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                  resizeMode: "contain",
                }}
              />
            </View>
          </TouchableOpacity>


          <Text
            style={{
              fontSize: 28,
              fontWeight: "semibold",
              color: "#F6F6F6",
              textAlign: "center",
              marginRight: "4.5%",
            }}
          >
            {t('Myfollowed')}
          </Text>
        </View>

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
          <>
            {usersData.map((user) => {
              for (let i = 0; i < userData.following.length; i++) {
                if (user._id === userData.following[i]) {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%"
                        }}
                      >
                        <View
                          key={user._id}
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
                              color: "#F6F6F6",
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
                        </View>
                        <View
                          style={{
                            padding: 5,
                            marginTop: 10,
                            marginBottom: 10,
                            justifyContent: "center",
                          }}
                        >
                          {user._id === userData._id ? (
                            <Text>
                              {t('You')}
                            </Text>
                          ) : (
                            <FollowHandler
                              idToFollow={user._id}
                              type={"suggestion"}
                            />
                          )

                          }

                        </View>
                      </View>
                    </>
                  );
                }
              }
              return null;
            })}
          </>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MyFollowers;
