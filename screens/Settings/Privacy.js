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

const Privacy = () => {


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

                    <Text style={styles.header}>{t("privacy_policy")}</Text>
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
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("introduction")}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.introduction')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('information_collected')}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.information_collected')}
                        {"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>{t('Information.Title1')}</Text>
                        {'\n'}
                        {" "} {t('Information.One1')}{'\n'}
                        {" "} {t('Information.Two1')}{"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>{t('Information.Title2')}</Text>{'\n'}
                        {" "} {t('Information.One2')}{'\n'}
                        {" "} {t('Information.Two2')}{"\n"}
                        {"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>{t('Information.Title3')}</Text>{'\n'}
                        {" "} {t('Information.One3')}{'\n'} </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('use_of_information')}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.use_of_information')} {"\n"}
                        {" "} {t('use_information.One')}{"\n"}
                        {" "} {t('use_information.Two')}{"\n"}
                        {" "} {t('use_information.Three')}{"\n"}
                        {" "} {t('use_information.Four')}{"\n"}
                        {" "} {t('use_information.Five')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("sharing_information")}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.sharing_information')} {"\n"}
                        {" "} {t('user_sharing_information.One')}{"\n"}
                        {" "} {t('user_sharing_information.Two')}{"\n"}
                        {" "} {t('user_sharing_information.Three')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("your_rights")}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.your_rights')} {"\n"}

                        {" "} {t('rights.One')}{"\n"}
                        {" "} {t('rights.Two')}{"\n"}
                        {" "} {t('rights.Three')}{"\n"}
                        {" "} {t('rights.Four')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("information_security")}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.information_security')}
                    </Text>
                </View>


                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t("data_retention")}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.data_retention')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('policy_changes')}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.policy_changes')}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>{t('contact_us')}</Text>
                    <Text style={styles.text}>
                        {t('policy_content.contact_us')}
                        <Text
                            style={{
                                color: "#004AAD"
                            }}>gbazialij@gmail.com.</Text>
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

export default Privacy;
