import { Link, useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, NavLink } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../Context/AppContext";
import { useTranslation } from "react-i18next";

const Followers = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const userData = useSelector((state) => state.userReducer);


  const handleFollowing = () => {
    navigation.navigate("Myfollowing");
  };

  const handleFollowers = () => {
    navigation.navigate("Myfollowers");
  };



  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          zIndex: 1,
          position: "relative",
          marginTop: 18,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: isDarkMode ? "#F5F5F5" : "black",
              textAlign: "center",
            }}
          >
            {userData.posts ? userData.posts.length : 0}
          </Text>
          <Text
            style={{
              color: "#787373",
              textAlign: "center",
            }}
          >
           {t('Post')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={handleFollowers}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: isDarkMode ? "#F5F5F5" : "black",
                textAlign: "center",
              }}
            >
              {userData.followers ? userData.followers.length : 0}
            </Text>
            <Text
              style={{
                color: "#787373",
              }}
            >
             {t('Followers')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={handleFollowing}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: isDarkMode ? "#F5F5F5" : "black",
                textAlign: "center",
              }}
            >
              {userData.following ? userData.following.length : 0}
            </Text>
            <Text
              style={{
                color: "#787373",
              }}
            >
              {t('Followeds')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Followers;
