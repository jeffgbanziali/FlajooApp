import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Animated, Easing, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../components/Context/AppContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { APP_API_URL } from '../../config';
import axios from 'axios';
import Modal from "react-native-modal";

const AccountVerify = () => {
    const { isDarkMode } = useDarkMode();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const route = useRoute()

    const { user } = route.params
    const [code, setCode] = useState()


    const emailVerify = user.userData.email

    const handleClickReturnProfile = () => {
        navigation.goBack("Signup")
    };

    const handleChangeText = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 6) {
            const spacedText = numericText.split(' ').join(' ');
            setCode(spacedText);
        }
    };


    const [pressComment, setPressComment] = useState(new Animated.Value(0));
    const [pressInComments, setPressInComments] = useState(false);


    const areYouPressComment = () => {
        if (pressInComments) {
            Animated.timing(pressComment, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => setPressInComments(false));
        } else {
            setPressInComments(true);
            Animated.timing(pressComment, {
                toValue: 200,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    };




    const [pressNotVerify, setPressNotVerify] = useState(new Animated.Value(0));
    const [pressInPressNotVerify, setPressInPressNotVerify] = useState(false);


    const areYouNotVerify = () => {
        if (pressInPressNotVerify) {
            Animated.timing(pressNotVerify, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => setPressInPressNotVerify(false));
        } else {
            setPressInPressNotVerify(true);
            Animated.timing(pressNotVerify, {
                toValue: 200,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    };

    const handleGoSignIn = () => {
        areYouPressComment()
        navigation.navigate("Signin");

    }



    const handleSignUp = async () => {
        const dataVerify = {
            email: emailVerify,
            verificationCode: code,
        };

        console.log("Data de vérification:", dataVerify);

        try {
            const url = `${APP_API_URL}/api/user/verify-account`;

            const response = await axios.post(url, dataVerify, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Handle the server response
            if (response.data.success === true) {
                // alert("Compte vérifié avec succès !");
                console.log("Réponse du serveur:", response.data);
                areYouPressComment()
            } else if (response.data.success === false) {
                areYouNotVerify()
                // alert(response.data.message || "Une erreur s'est produite lors de la vérification.");
                console.log("Erreur de vérification:", response.data);
            } else {
                alert(response.data.message || "Une erreur s'est produite lors de la vérification.");
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du compte:", error);
            //alert("Une erreur est survenue. Veuillez réessayer.");
            areYouNotVerify()
        }
    };



    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: isDarkMode ? "#171717" : "#FFFFFF",
            }}>
            <View
                style={{
                    paddingBottom: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
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
                        fontSize: 30,
                        color: isDarkMode ? "white" : "black",
                        fontWeight: "bold",
                        marginLeft: 10,
                    }}>
                    {t('TitleVerify')}
                </Text>
            </View>

            <View
                style={{
                    alignItems: "center",
                }}>

                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: "green"
                    }}>
                    <Image
                        source={require('../../assets/Logos/1.png')}
                        style={{
                            width: '100%',
                            height: "100%",
                            position: "absolute"
                        }
                        } />
                </View>

                <View
                    style={{
                        width: "90%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: "red"
                    }}>

                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "justify",
                            fontWeight: "500",
                            color: isDarkMode ? "white" : "black",
                        }}
                    >{t("AccountVerify")}</Text>
                </View>


                <View
                    style={{
                        width: "90%",
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: "100%",
                            justifyContent: 'center',
                            // backgroundColor: "red"
                        }}>

                        <Text
                            style={{
                                fontSize: 18,

                                textAlign: "justify",
                                fontWeight: "500",
                                color: isDarkMode ? "white" : "black",
                            }}
                        >{t("InsertCode")}
                        </Text>
                        <View
                            style={{
                                width: 250,
                                height: 60,
                                marginTop: 10,
                                borderRadius: 10,
                                backgroundColor: "red",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TextInput
                                style={{
                                    backgroundColor: '#2C2C2C',
                                    width: "100%",
                                    height: "100%",
                                    fontSize: 16,
                                    color: isDarkMode ? "white" : "black",
                                    borderRadius: 8,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                }}
                                placeholderTextColor={isDarkMode ? "white" : "black"}
                                keyboardType="numeric"
                                placeholder="0 0 0 0 0 0"
                                fontSize={40}
                                onChangeText={handleChangeText}
                                value={code}
                            />

                        </View>
                    </View>
                </View>


                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 2,
                        borderColor: isDarkMode ? "#2D75FF" : "#74A0F4",
                        // backgroundColor: "red"
                    }}>

                    <Text
                        style={{
                            fontSize: 18,

                            textAlign: "justify",
                            fontWeight: "500",
                            color: isDarkMode ? "#2D75FF" : "#74A0F4",
                        }}
                    >{t("RetourCode")}</Text>
                </View>




            </View>


            <View
                style={{
                    width: "100%",
                    height: 120,
                    justifyContent: 'center',
                    alignItems: 'center',

                    position: "absolute",
                    bottom: "5%"
                }}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={{
                        width: 250,
                        height: 50,
                        backgroundColor: "red",
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "justify",
                            fontWeight: "500",
                            color: isDarkMode ? "white" : "white",
                        }}>
                        {t("Verify")}
                    </Text>

                </TouchableOpacity>

            </View>



            <Modal
                isVisible={pressInComments}
                onBackdropPress={areYouPressComment}
                //transparent={true}
                backdropOpacity={0.5}
                animationIn="pulse"
                animationOut="fadeOut"
                useNativeDriverForBackdrop
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <View
                    style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 350,
                        height: 200,
                        borderRadius: 30,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 30,
                            backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                height: 20,
                                alignItems: 'center',
                                justifyContent: "center",
                                flexDirection: "row",
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >{t("Succes")}

                            </Text>
                            <View
                                style={{
                                    paddingLeft: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 30,
                                    height: 30

                                }}>
                                <Feather name="check-circle" size={26} color="green" />

                            </View>
                        </View>
                        <View
                            style={{
                                width: "80%",
                                height: 80,
                                alignItems: 'center',
                                flexDirection: "row",
                            }}>

                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >{t("VerificationSucces")}

                            </Text>



                        </View>
                        <TouchableOpacity
                            onPress={handleGoSignIn}
                            style={{
                                width: 200,
                                height: 40,
                                backgroundColor: "red",
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "white",
                                }}>
                                {t("continue")}
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

            <Modal
                isVisible={pressInPressNotVerify}
                onBackdropPress={areYouNotVerify}
                //transparent={true}
                backdropOpacity={0.5}
                animationIn="pulse"
                animationOut="fadeOut"
                useNativeDriverForBackdrop
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <View
                    style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 350,
                        height: 200,
                        borderRadius: 30,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 30,
                            backgroundColor: isDarkMode ? "#171717" : "#FFFCFC",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: "80%",
                                height: 35,
                                alignItems: 'center',
                                justifyContent: "center",
                                flexDirection: "row",
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >{t("ErrorVerify")}

                            </Text>
                            <View
                                style={{
                                    paddingLeft: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 30,
                                    height: 30

                                }}>
                                <MaterialIcons
                                    name="report-problem"
                                    size={26}
                                    color={isDarkMode ? "red" : "red"} />
                            </View>
                        </View>

                        <View
                            style={{
                                width: "80%",
                                height: 75,
                                alignItems: 'center',
                                flexDirection: "row",
                            }}>

                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "black",
                                }}
                            >{t("NotCodeVerify")}

                            </Text>



                        </View>
                        <TouchableOpacity
                            onPress={areYouNotVerify}
                            style={{
                                width: 200,
                                height: 40,
                                backgroundColor: "red",
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: "justify",
                                    fontWeight: "500",
                                    color: isDarkMode ? "white" : "white",
                                }}>
                                {t("continue")}
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

        </SafeAreaView >
    );
};


export default AccountVerify;
