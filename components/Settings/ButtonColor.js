import { View, Text, Switch, Modal, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from "../Context/AppContext";
import i18next, { languageResources } from "../../Translations/Services/i18next"
import languagesList from "../../Translations/Services/LanguagesList.json"
import { useTranslation } from 'react-i18next'



const ButtonColor = () => {

  const { isDarkMode, toggleDarkMode, selectedLanguage, changeLanguage } = useDarkMode();
  const navigation = useNavigation();

  const handleClickReturnProfile = () => {
    console.log("clicked");
    navigation.navigate("Settings");
  };






  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();





  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 12,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
        >
          <TouchableOpacity onPress={handleClickReturnProfile}>
            <MaterialIcons
              name="arrow-back"
              size={28}
              color={isDarkMode ? "white" : "black"}

            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: isDarkMode ? "white" : "black",
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          {t('Application-Settings')}
        </Text>
      </View>

      <View
        style={{
          marginTop: 12,
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 6,
          width: "100%",
          height: "20%",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: isDarkMode ? "#171717" : "white",
            padding: 6,
            borderRadius: 10,
            width: "98%",
            height: "30%",
          }}
        >
          <View
            style={{
              marginLeft: 12,
              flexDirection: "row",
            }}
          >
            {isDarkMode ? (
              <FontAwesome5 name="moon" size={24} color="white" />
            ) : (
              <MaterialCommunityIcons
                name="white-balance-sunny"
                size={24}
                color="yellow"
              />
            )}
            <Text
              style={{
                fontSize: 20,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {isDarkMode ? t('Mode-app-dark') : t('Mode-app-clear')}
            </Text>
          </View>

          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "gray", true: "darkgray" }}
            thumbColor={isDarkMode ? "white" : "black"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 6,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#171717" : "white",
            width: "98%",
            height: "30%",
          }}
        >
          <View
            style={{
              marginLeft: 12,
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={{
                fontSize: 20,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {t('Notifications')}
            </Text>
          </View>

          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </View>



        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
          }}>

            <View style={{
              flexDirection: "row",
              borderColor: isDarkMode ? "#343232" : "lightgray",
              borderBottomWidth: 1,
              alignItems: "center",
            }}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 120,
                  height: 40,
                  borderRadius: 30,
                  marginLeft: 10,
                }}
              >
                <MaterialIcons
                  name="arrow-back-ios"
                  size={28}
                  color={isDarkMode ? "white" : "black"}
                />


                <Text
                  style={{
                    fontSize: 22,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "bold",
                  }}
                >
                  {t('change-language')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                padding: 10,
                width: "100%",
                height: "100%"
              }}
            >


              <FlatList
                data={Object.keys(languageResources)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderColor: isDarkMode ? "#343232" : "lightgray",
                      borderBottomWidth: 2,
                      width: "100%",
                      height: 60,
                      justifyContent: "center",
                      marginTop: "1%"
                    }}
                    onPress={() => {
                      changeLanguage(item);
                      setVisible(false);
                    }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: isDarkMode ? "white" : "black",
                    }}>
                      {languagesList[item].nativeName}
                    </Text>
                  </TouchableOpacity>

                )}
              />

            </View>
          </SafeAreaView>
        </Modal>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 6,
            borderRadius: 10,
            width: "98%",
            height: "30%",
            backgroundColor: isDarkMode ? "#171717" : "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: 12,
            }}
          >
            <MaterialIcons
              name="language"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
            <Text
              style={{
                fontSize: 20,
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              {t('change-language')}
            </Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};

export default ButtonColor;
