import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDarkMode } from "../Context/AppContext";

const Header = () => {
  const userData = useSelector((state) => state.userReducer);
  const { isDarkMode } = useDarkMode();


  const navigation = useNavigation(false);
  const handleClickProfile = () => {
    console.log("clicked");
    navigation.navigate("Profile");
  };
  const handleClickMessage = () => {
    console.log("clicked");
    navigation.navigate("Messages");
  };
  const handleClickNotifications = () => {
    console.log("clicked");
    navigation.navigate("Notifications");
  };
  return (
    <View style={{
      backgroundColor: isDarkMode ? "#171717" : "white",
      borderBottomWidth: 2,
      borderColor: isDarkMode ? "#343232" : "lightgray",

    }}>
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 10,
            //backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/*isDarkMode ? (
            <Image
              style={{
                width: 110,
                height: 110,
                resizeMode: "contain",
              }}
              source={require("../../assets/Logos/my_flajoo.png")}
            />
          ) : (
            <Image
              style={{
                width: 100,
                height: 40,
                resizeMode: "contain",
              }}
              source={require("../../assets/Logos/my_flajoo2.jpeg")}
            />
          )*/}

          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            flajoooooo
          </Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              width: 50,
              height: 50,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickNotifications}>
              <Feather
                name="bell"
                size={25}
                color={isDarkMode ? "white" : "black"}

              />
            </TouchableOpacity>
          </View>


          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              width: 50,
              height: 50,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickMessage}>
              <View
                style={{
                  backgroundColor: "red",
                  position: "absolute",
                  left: 10,
                  width: 20,
                  height: 20,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  marginLeft: 6,
                  marginTop: -8,
                  zIndex: 100,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  2
                </Text>
              </View>
              <AntDesign
                name="message1"
                size={25}
                color={isDarkMode ? "white" : "black"}

              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 30,
              marginTop: "1.5%",
              marginLeft: 10,
              width: 30,
              height: 30,
              zIndex: 100,
            }}
          >
            <TouchableOpacity onPress={handleClickProfile}>
              <Image
                source={{
                  uri: userData.picture
                    ? userData.picture
                    : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
};

export default Header;
