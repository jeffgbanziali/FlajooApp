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
  const [errors, setErrors] = useState([]);
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
          setUid(userIdSave);
        }
      } else {
        // Cette partie sera rarement atteinte car les erreurs devraient être capturées dans catch
        alert("Une erreur s'est produite.");
      }
    } catch (error) {
      if (password === "" && email === "") {
        setErrors("Entrez votre adresse e-mail et votre mot de passe !!!");
      } else if (password === "") {
        setErrors("Entrez votre mot de passe !!!");
      } else if (email === "") {
        setErrors("Entrez votre adresse e-mail !!!");
      }
      else if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        setErrors(serverErrors);

      } else {
        alert("Une erreur s'est produite lors de la connexion.");
      }
    }

    finally {
      setTimeout(() => {
        setIsLoadingSignIn(false);
      }, 1000);
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

              <View
                style={{
                  width: '100%',
                  height: 30,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {errors.email ?
                  <Text style={{
                    color: "#ED3237",
                    fontSize: 14,
                    fontWeight: "600",
                  }}>{errors.email}</Text> :
                  <Text style={{
                    color: "#ED3237",
                    fontSize: 14,
                    fontWeight: "600",
                  }}>{errors}</Text>
                }
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

                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{
                    color: isDarkMode ? "gray" : "black",
                    fontSize: 16,
                    fontWeight: "600",
                  }}>
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>

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



    button: {
      backgroundColor: "#ED3237",
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
