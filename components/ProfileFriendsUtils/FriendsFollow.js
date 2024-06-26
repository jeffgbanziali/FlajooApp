import { Link, useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable, NavLink } from "react-native";
import { useDarkMode } from "../Context/AppContext";
import axios from "axios";
import { APP_API_URL } from "@env";;
import { useTranslation } from "react-i18next";


const Followers = ({ users }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const [user, setUser] = useState([]);


  const { t } = useTranslation();

  const id = users._id;

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const response = await axios.get(`${APP_API_URL}/api/post/${users._id}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getPostUser();
  }, [users._id]);


  const handleFollowing = () => {
    navigation.navigate("FriendsFollowing", { id });
  };

  const handleFollowers = () => {
    navigation.navigate("FriendsFollowers", { id });
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
          <TouchableOpacity onPress={() => handleFollowers(id)}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: isDarkMode ? "#F5F5F5" : "black",
                textAlign: "center",
              }}
            >
              {users.followers ? users.followers.length : 0}
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
          <TouchableOpacity onPress={() => handleFollowing(id)}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: isDarkMode ? "#F5F5F5" : "black",
                textAlign: "center",
              }}
            >
              {users.following ? users.following.length : 0}
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
