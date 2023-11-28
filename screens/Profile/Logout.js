import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { APP_API_URL } from "../../config";

const Logout = () => {
  const { uid, setUid } = useContext(UidContext);
  const { isDarkMode } = useDarkMode();
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoadingSignOut(true);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      await axios.get(`${APP_API_URL}/api/user/logout`);
      setUid(null);
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoadingSignOut(false);
      }, 5000);
    }
  };







  return (

    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        width: "35%",
        height: "60%",
        backgroundColor: isDarkMode ? "#D13333" : "#72ACF1",
        borderRadius: 10,
      }}
      onPress={handleLogout}
    >

      {isLoadingSignOut ? (

        <>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              color: isDarkMode ? "white" : "#0A0D10",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginLeft: 8,
              fontSize: 10,
            }}
          >
            Logging out...
          </Text>
        </>

      ) : (
        <>
          <AntDesign name="logout"
            size={24}
            color={isDarkMode ? "blue" : "red"}
          />
          <Text
            style={{
              color: isDarkMode ? "white" : "#0A0D10",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginLeft: 10,
              fontSize: 18,
            }}
          >
            Logout

          </Text>
        </>
      )

      }

    </TouchableOpacity>
  );
};

export default Logout;
