import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Platform,
  Dimensions
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { darkRose } from "../../components/Button/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { UidContext, useDarkMode } from "../../components/Context/AppContext";
import Loading from "../../components/Loading/Loading";
import { APP_API_URL } from "../../config";
import { useTranslation } from "react-i18next";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContinueWithGmail from "./ContinueWithGmail";
import FacebookContinue from "./FacebookContinue";
import ContinueWithApple from "./ContinueWithApple";






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const SignInScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const { t, i18n } = useTranslation();
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({});
  const { uid, setUid } = useContext(UidContext)


  const containerWidthSize = windowWidth * 0.88;
  const containerHeightSize = windowHeight * 0.40;

  const inputWidthSize = windowWidth * 0.75;
  const inputHeightSize = windowHeight * 0.056;





  const handleSignIn = async () => {
    setIsLoadingSignIn(true);

    const data = { email, password };

    try {
      const response = await axios.post(
        `${APP_API_URL}/api/user/login`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const userIdSave = response.data.user;
        if (userIdSave) {
          await AsyncStorage.setItem("user", JSON.stringify(userIdSave));
          console.log("Token saved");
          setUid(userIdSave);
          console.log("Mon id est bien suavegader", userIdSave);
          console.log(userIdSave);
        }
        console.log("User authenticated successfully");
        console.log("La reponse", response);
        //alert("User logged in successfully");
      } else {
        if (
          response.data.errors.email !== "" ||
          response.data.errors.password !== ""
        ) {
          setErrors(response.data.errors);
          console.log(response.data.errors);
        }
        alert("An error occurred");
      }
    } catch (error) {
      console.log("Donne moi l'erreur ", error);
    } finally {
      setTimeout(() => {
        setIsLoadingSignIn(false);
      }, 5000);
    }
  };




  const showPassword = () => {
    setShowPass(!showPass);
  }




  return (
    <>
      {isLoadingSignIn ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: isDarkMode ? "#171717" : "white",
          }}
        >
          <SafeAreaView
            style={{
              alignItems: "center",
              height: "100%",
              width: "100%",

            }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "10%",
                width: "100%",

              }}>
              <Text style={{
                fontSize: 30,
                color: isDarkMode ? "#FFFFFF" : "black",
              }}
              >
                Sign into your account
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                height: "25%",
                width: "100%",
                justifyContent: "center",
                //backgroundColor:"red"

              }}>

              <View
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  //backgroundColor:"red"
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                  source={isDarkMode ? require("../../assets/Logos/1.png") : require("../../assets/Logos/1.png")}
                />
              </View>


            </View>

            <View
              style={{
                width: containerWidthSize,
                height: containerHeightSize,
                borderRadius: 20,
                backgroundColor: isDarkMode ? "#2C2C2C" : "#E6E6E6",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isDarkMode ? "white" : "black",
                shadowOffset: {
                  width: 0,
                  height: isDarkMode ? 1 : 2,
                },
                shadowOpacity: isDarkMode ? 0.16 : 0.6,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",

                }}
              >

                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <View
                  style={{
                    width: inputWidthSize,
                    height: inputHeightSize,
                    borderRadius: 10,
                    borderColor: "#2e2e2d",
                    borderWidth: 1,
                    overflow: "hidden",
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 14,
                  }}
                >
                  <TextInput
                    style={{
                      width: '90%',
                      height: "100%",
                      fontSize: 16,
                      borderColor: "white",
                      //backgroundColor:"red"
                    }}
                    keyboardType="default"
                    placeholder={t("Email")}
                    placeholderTextColor="gray"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                  />
                </View>

                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <View
                  style={{
                    width: inputWidthSize,
                    height: inputHeightSize,
                    borderRadius: 10,
                    borderColor: "#2e2e2d",
                    borderWidth: 1,
                    overflow: "hidden",
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: "center",
                    paddingLeft: 14,

                    flexDirection: "row"
                  }}
                >
                  <TextInput
                    style={{
                      width: '85%',
                      height: "100%",
                      fontSize: 16,
                    }}
                    keyboardType="default"
                    placeholderTextColor="gray"
                    secureTextEntry={!showPass}
                    placeholder={t("Password")}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                  />
                  <View
                    style={{
                      width: '15%',
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >

                    <Pressable
                      onPress={showPassword}
                    >
                      {
                        showPass ?
                          <Ionicons name="eye" size={22} color="gray" /> :
                          <Ionicons name="eye-off" size={22} color="gray" />
                      }
                    </Pressable>

                  </View>
                </View>



                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                  <Text style={[styles.buttonTitle, { fontSize: i18n.language === 'fr' ? 14 : 16 }]}
                  >{t('ButtonSignin')}</Text>
                </TouchableOpacity>


                <View style={styles.footerView}>
                  <Text style={{
                    fontSize: 16,
                    color: isDarkMode ? "#FFFFFF" : "black",
                  }}>
                    {t("DontAccount")}{" "}
                    <Text
                      onPress={() => navigation.navigate("Signup")}
                      style={{
                        color: isDarkMode ? "#2D75FF" : "#74A0F4",
                        fontWeight: "300",
                        fontSize: 16,
                      }}
                    >
                      {t('ButtonSignup')}
                    </Text>
                  </Text>
                </View>
                <View style={{
                  width: inputWidthSize,
                  height: inputHeightSize,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}>
                  <ContinueWithGmail />
                  <FacebookContinue />
                  <ContinueWithApple />

                </View>


              </View>


            </View>

          </SafeAreaView>
        </KeyboardAvoidingView >
      )}
    </>
  );
};





const styles = StyleSheet.create(

  {

    error: {
      color: "red",
      fontSize: 12,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
    }
    ,
    button: {
      backgroundColor: "red",
      marginTop: 10,
      width: 120,
      height: 46,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: "white",
      fontWeight: "bold",
    },
    footerView: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20
    },
  });
export default SignInScreen;
