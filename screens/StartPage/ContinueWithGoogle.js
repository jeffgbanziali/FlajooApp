import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UidContext, useDarkMode } from '../../components/Context/AppContext';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { APP_API_URL } from "@env";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ContinueWithGoogle = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const { uid, setUid } = useContext(UidContext)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);


  GoogleSignin.configure({
    webClientId: '210714148369-c875qjkjf1mjh2d6ptsop1sitndur99r.apps.googleusercontent.com',
    iosClientId: '210714148369-n4svjl21159pba8a987ibu96p8b5rluv.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  });

  const goGoogle = async () => {
    setIsLoadingSignIn(true);

    try {
      await GoogleSignin.hasPlayServices();
      const googInfos = await GoogleSignin.signIn();
      setUserInfo(googInfos);
      console.log(googInfos); // Assurez-vous que les informations de l'utilisateur sont correctement récupérées
      await backendRequest(googInfos)//// Afficher les informations de l'utilisateur dans la console
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // L'utilisateur a annulé la connexion
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // L'opération est déjà en cours (par exemple, une connexion en cours)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Services Google Play non disponibles ou obsolètes
      } else {
        // Une autre erreur s'est produite
      }
    }
    finally {
      setTimeout(() => {
        setIsLoadingSignIn(false);
      }, 500);
    }
  };

  const backendRequest = async (userInfo) => {
    const url = `${APP_API_URL}/api/user/auth/google`;

    const idToken = userInfo.idToken; // Assuming idToken is available in userInfo
    const data = {
      email: userInfo.user.email,
      firstName: userInfo.user.givenName,
      lastName: userInfo.user.familyName,
      pseudo: userInfo.user.name,
    };

    console.log('mes bébé vous êtes où?', userInfo);
    try {
      const response = await axios.post(url, { idToken, ...data }, { // Send only idToken
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
          'Server-Auth-Code': userInfo.serverAuthCode,
        },


      });

      if (response.status === 201) {
        alert("User created successfully");
        console.log("La reponse", response);
        navigation.navigate("VerifyStartPage", { user: response.data });
      } else if (response.status === 200) {
        const user = response.data;
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          console.log("Token saved");
          setUid(user);
          console.log("Mon id est bien suavegader", response.data);
          console.log(user);
        }
        console.log("User authenticated successfully");
        console.log("La reponse", response);
      }

    } catch (error) {
      console.error('Erreur lors de la requête au serveur:', error);
      throw error;
    }
  }


  return (

    <TouchableOpacity
      onPress={goGoogle}
      style={{
        alignItems: "center",
        width: windowWidth * 0.8,
        height: windowHeight * 0.062,
        backgroundColor: isDarkMode ? "#171717" : "white",
        flexDirection: "row",
        borderRadius: 30,
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: isDarkMode ? "#343232" : "lightgray",
      }}
    >
      {
        isLoadingSignIn ?
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }} >
            <ActivityIndicator
              textAlign="center"
              size={"large"}
              color={isDarkMode ? "white" : "black"} />
          </View>
          :
          <>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }} >


              <Image
                source={{ uri: "https://logos-marques.com/wp-content/uploads/2021/03/Nouveau-logo-Google.png" }}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />


            </View>
            <Text
              style={{
                color: isDarkMode ? "#F5F5F5" : "black",
                marginLeft: "2%",
                fontSize: 20,
              }}
            >
              {t('Google')}
            </Text>
          </>
      }
    </TouchableOpacity >
  );
};


export default ContinueWithGoogle;
