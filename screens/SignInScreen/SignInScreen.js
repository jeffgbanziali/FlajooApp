import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable
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


const SignInScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({});
  const { uid, setUid } = useContext(UidContext)

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
        const user = response.data;
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          console.log("Token saved");
          setUid(user);
          console.log("Mon id est bien suavegader", response.data);
          console.log(user);
        }
        alert("User logged in successfully");
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
      console.log(error);
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
        <View
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
            <Text style={{
              fontSize: 30,
              color: isDarkMode ? "#FFFFFF" : "black",
            }}
            >
              Sign into your account
            </Text>

            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                marginTop: "10%",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
                source={isDarkMode ? require("../../assets/Logos/ios/1212.png") : require("../../assets/Logos/ios/1212.png")}
              />
            </View>
            <View
              style={{
                width: '90%',
                height: '50%',
                borderRadius: 20,
                backgroundColor: isDarkMode ? "#2C2C2C" : "#E6E6E6",
                marginTop: "10%",
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
              <View>
                <Image
                  source={require("../../assets/Logos/my_flajooo.png")}
                  style={{
                    width: 150,
                    height: 90,
                    marginLeft: 10
                  }} />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <View
                  style={{
                    height: 48,
                    borderRadius: 10,
                    borderColor: "#2e2e2d",
                    borderWidth: 1,
                    overflow: "hidden",
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 30,
                    marginRight: 30,
                    paddingLeft: 14,
                    width: 300,
                  }}
                >
                  <TextInput
                    style={{
                      width: '90%',
                      height: 48,
                      fontSize: 16,
                      borderColor: "white"
                    }}
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
                    height: 48,
                    borderRadius: 10,
                    borderColor: "#2e2e2d",
                    borderWidth: 1,
                    overflow: "hidden",
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 30,
                    marginRight: 30,
                    justifyContent: "center",
                    paddingLeft: 14,
                    width: 300,
                    flexDirection: "row"
                  }}
                >
                  <TextInput
                    style={{
                      width: '85%',
                      height: 48,
                      fontSize: 16
                    }}
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
                      height: 48,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >

                    <Pressable
                      onPress={showPassword}
                    >
                      {
                        showPass ?
                          <Ionicons name="eye-off" size={22} color="gray" /> :
                          <Ionicons name="eye" size={22} color="gray" />
                      }
                    </Pressable>

                  </View>
                </View>



                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                  <Text style={styles.buttonTitle}>{t('ButtonSignin')}</Text>
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
              </View>
            </View>
          </SafeAreaView>
        </View >
      )}
    </>
  );
};

const styles = StyleSheet.create({



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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    width: 130,
    height: 48,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
export default SignInScreen;
