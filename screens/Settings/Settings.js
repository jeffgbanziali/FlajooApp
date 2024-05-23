import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Logout from "../Profile/Logout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
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
    navigation.goBack("Profile");
  };

  const handleClickAppli = () => {
    console.log("clicked");
    navigation.navigate("buttonning");
  };

  const handleAccount = () => {
    navigation.navigate("AccountSetting");
  };

  const handlePrivacy = () => {
    navigation.navigate("Privacy");
  };

  const handleUseTerms = () => {
    navigation.navigate("UseTerms");
  };

  const handleFaq = () => {
    navigation.navigate("Privacy");
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
        {/**Account setting */}
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

        {/**App setting */}
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

        {/**PRofile update */}
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


        {/**Privacy */}
        <TouchableOpacity
          onPress={handlePrivacy}
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
            <MaterialIcons
              name="privacy-tip"
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
              {t('PricacyPolicy')}
            </Text>
          </View>
        </TouchableOpacity>


        {/**Use terms */}
        <TouchableOpacity
          onPress={handleUseTerms}
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
            <Feather
              name="file-text"
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
              {t('TermsUsing')}
            </Text>
          </View>
        </TouchableOpacity>


        {/**Faq */}
        <TouchableOpacity
          onPress={handleFaq}
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
            <Feather
              name="file-text"
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
              {t('FAQ')}
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
