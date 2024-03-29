import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FriendsFollow from "./FriendsFollow";
import { useDarkMode } from "../Context/AppContext";

const ProfileFriendsTools = ({ users }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <View
      style={{
        position: "relative",
        width: 371,
        height: 70,
        backgroundColor: isDarkMode ? "#171717" : "white",
        borderRadius: 30,
        marginTop: -30,
        display: "flex",
        borderWidth: 1,
        borderColor: "#EFEAEA",
        
        borderStyle: "solid",
        zIndex: 1,
        justifyContent:"center",
        alignSelf: "center",
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
      <FriendsFollow users={users} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileFriendsTools;
