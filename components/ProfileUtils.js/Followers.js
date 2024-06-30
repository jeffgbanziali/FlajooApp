import { Link, useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, NavLink } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UidContext, useDarkMode } from "../Context/AppContext";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { APP_API_URL } from "@env";


const Followers = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const { uid } = useContext(UidContext)


  useEffect(() => {
    const getPostUser = async () => {
      try {
        const response = await axios.get(`${APP_API_URL}/api/post/${uid}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getPostUser();
  }, [uid]);



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
              fontSize: 18,
              fontWeight: "600",
              color: isDarkMode ? "#F5F5F5" : "black",
              textAlign: "center",
            }}
          >
            {user ? user.length : 0}
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
                fontSize: 18,
                fontWeight: "600",
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
                fontSize: 18,
                fontWeight: "600",
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
