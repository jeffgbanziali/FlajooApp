import React from 'react';
import { ScrollView, Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Logout from "../Profile/Logout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Feather from 'react-native-vector-icons/Feather';
//import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6Brands';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../../components/Context/AppContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const UseTerms = () => {


    const { isDarkMode } = useDarkMode();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleClickReturnProfile = () => {
        console.log("clicked home");
        navigation.goBack("Profile");
    };


    const styles = getStyles(isDarkMode);

    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',


            }}>
            <TouchableOpacity
                style={{
                    left: 2,
                    top: 50,
                    position: "absolute",
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    zIndex: 3

                }}
                onPress={() => handleClickReturnProfile()}>
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
            <ScrollView style={styles.container}>


                <View style={styles.section}>

                    <Text style={styles.header}>{t("UserTems")}</Text>
                    <View
                        style={{
                            width: "100%",
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
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

                    <View style={styles.section}>
                        <Text style={styles.text}>
                            {t('Updating')}: Le 23 Mai 2025
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {t('IntroTerms')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title1')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle1')}
                        {"\n"}
                    </Text>

                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title2')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle2')} {"\n"}

                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("Title3")}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle3')} {"\n"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("Title4")}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle4')} {"\n"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("Title5")}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle5')}
                    </Text>
                </View>


                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("Title6")}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle6')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title7')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle7')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title8')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle8')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title9')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle9')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('Title10')}</Text>
                    <Text style={styles.text}>
                        {t('OneMoreTitle10')}
                        <Text
                            style={{
                                color: "#004AAD"
                            }}>gbazialij@gmail.com.</Text>
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>                        {t('ThankYourForUSe')}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};



const getStyles = (isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        marginBottom: 20,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: isDarkMode ? "#004AAD" : "#004AAD",

    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: isDarkMode ? "#004AAD" : "#004AAD"
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 2,
        color: isDarkMode ? "white" : "black",
    },
    bold: {
        fontWeight: 'bold',

    },
});

export default UseTerms;
