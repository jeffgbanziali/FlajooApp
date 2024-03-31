import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Logout from "../Profile/Logout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();
  const { t } = useTranslation();


  const handleClickReturnProfile = () => {
    console.log("clicked home");
    navigation.navigate("Profile");
  };

  const handleClickAppli = () => {
    console.log("clicked");
    navigation.navigate("buttonning");
  };

  const handleAccount = () => {
    console.warn("clicked");
  };

  const handleEditProfil = () => {
    console.log("clicked");
    navigation.navigate("EditProfil");
  };



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',

      }}
    >
      <View
        style={{
          paddingBottom: 2,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: "row",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          justifyContent: "space-between",
        }}>
        <TouchableOpacity onPress={() => handleClickReturnProfile()}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              width: 40,
              height: 40,
              borderRadius: 30,
            }}
          >
            <MaterialIcons
              name="arrow-back"
              size={28}
              color={isDarkMode ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 40,
            color: isDarkMode ? "white" : "black",
            fontWeight: "bold",
            marginLeft: 10,
          }}>
          {t('Settings')}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleAccount}

          style={{
            marginTop: 12,
            width: "98%",
            height: "6%",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            backgroundColor: isDarkMode ? "#171717" : "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={{
                marginLeft: 10,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {t('Account')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClickAppli}

          style={{
            marginTop: 12,
            width: "98%",
            height: "6%",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            backgroundColor: isDarkMode ? "#171717" : "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={{
                marginLeft: 10,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {t('Application-Settings')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEditProfil}
          style={{
            marginTop: 12,
            width: "98%",
            height: "6%",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            backgroundColor: isDarkMode ? "#171717" : "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="user-edit"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={{
                marginLeft: 10,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {t('Edit-Profile')}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 12,
            width: "98%",
            height: "10%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Logout />
        </View>
      </View>
    </SafeAreaView>
  );
};






export default Settings;
