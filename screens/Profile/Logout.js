import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
//import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { APP_API_URL } from "@env";

const Logout = () => {
  const { uid, setUid } = useContext(UidContext);
  const { isDarkMode } = useDarkMode();
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoadingSignOut(true);

      // Suppression du token du stockage local
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("uid");

      // Appel à l'API de déconnexion
      await axios.get(`${APP_API_URL}/api/user/logout`);

      // Réinitialisation de l'identifiant utilisateur
      setUid(null);

      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Réinitialisation de l'état de chargement après un délai
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
        paddingLeft: 6,
        width: 150,
        height: 50,
        backgroundColor: isDarkMode ? "#D13333" : "#72ACF1",
        borderRadius: 20,
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
              fontWeight: "600",
              textTransform: "uppercase",
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            Logout
          </Text>
        </>

      )}

    </TouchableOpacity>
  );
};

export default Logout;
