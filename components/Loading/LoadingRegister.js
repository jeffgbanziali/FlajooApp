import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useDarkMode } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';

const LoadingRegister = () => {
    const { isDarkMode } = useDarkMode();

    const { t } = useTranslation();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDarkMode ? "#171717" : "#FFFFFF",
            }}>


            <View
                style={{
                    width: 200,
                    height: 200,
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
                    width: "70%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: "red"
                }}>

                <Text
                    style={{
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "500",
                        color: isDarkMode ? "white" : "black",
                    }}
                >{t("AccountCreateLoading")}</Text>
            </View>

            <View
                style={{
                    width: "100%",
                    height: 50,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: "red"
                }}>

                <ActivityIndicator size={"large"} color={isDarkMode ? "white" : "black"} />
            </View>


            <View
                style={{
                    width: "100%",
                    height: 50,
                    bottom: 40,
                    position: "absolute",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "500",
                        color: isDarkMode ? "white" : "black",
                    }}
                >{t("Powered")}</Text>
            </View>
        </View>
    );
};


export default LoadingRegister;
