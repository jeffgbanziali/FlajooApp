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

                    <Text style={styles.header}>Politique de Confidentialité</Text>
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
                    <Text style={styles.subHeader}>1. Introduction</Text>
                    <Text style={styles.text}>
                        Bienvenue sur Flajoo. Nous nous engageons à protéger et à respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, et partageons vos informations lorsque vous utilisez notre application.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>2. Informations que Nous Collectons</Text>
                    <Text style={styles.text}>
                        Nous collectons différents types d'informations en fonction de la manière dont vous interagissez avec notre application :
                        {"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Informations que vous nous fournissez directement :</Text>
                        {'\n'}
                        {" "} - Informations de compte : Lorsque vous créez un compte, nous recueillons des informations telles que votre nom, adresse e-mail, numéro de téléphone, date de naissance, et photo de profil.{'\n'}
                        {" "} - Contenu partagé : Toutes les publications, messages, commentaires, et autres contenus que vous partagez sur Flajoo.{"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Informations que nous collectons automatiquement :</Text>{'\n'}
                        {" "} - Données d'utilisation : Informations sur vos interactions avec l'application, y compris les pages que vous visitez, les fonctions que vous utilisez, et les heures de connexion.{'\n'}
                        {" "}  - Données de localisation : Avec votre consentement, nous pouvons collecter des informations sur votre localisation.
                        {"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Informations provenant de tiers :</Text>{'\n'}
                        {" "} - Connexion via réseaux sociaux : Si vous choisissez de vous connecter via des services tiers (par exemple, Facebook, Google), nous pouvons recevoir des informations de ces services en fonction de leurs politiques de confidentialité.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>3. Utilisation des Informations</Text>
                    <Text style={styles.text}>
                        Nous utilisons les informations collectées pour :{"\n"}
                        {" "} - Fournir, personnaliser, et améliorer notre service.{"\n"}
                        {" "} - Faciliter les communications entre utilisateurs.{"\n"}
                        {" "} - Analyser l'utilisation et les tendances afin d'améliorer l'expérience utilisateur.{"\n"}
                        {" "} - Assurer la sécurité et l'intégrité de notre application.{"\n"}
                        {" "} - Vous envoyer des notifications et des mises à jour importantes concernant l'application.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>4. Partage des Informations</Text>
                    <Text style={styles.text}>
                        Nous ne partageons vos informations personnelles avec des tiers que dans les circonstances suivantes :{"\n"}
                        {" "} - Avec votre consentement : Lorsque vous avez donné votre accord pour un partage spécifique.{"\n"}
                        {" "} - Fournisseurs de services : Nous pouvons partager vos informations avec des fournisseurs tiers qui nous aident à fournir et à améliorer notre service.{"\n"}
                        {" "} - Obligations légales : Lorsque nous sommes tenus de le faire par la loi ou pour répondre à des procédures judiciaires.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>5. Vos Droits</Text>
                    <Text style={styles.text}>
                        Selon votre localisation, vous pouvez avoir certains droits concernant vos informations personnelles, y compris :{"\n"}

                        {" "} - Le droit d'accéder à vos informations et de demander leur rectification ou suppression.{"\n"}
                        {" "} - Le droit de vous opposer au traitement de vos données.{"\n"}
                        {" "} - Le droit à la portabilité des données.{"\n"}
                        {" "} - Le droit de retirer votre consentement à tout moment.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>6. Sécurité des Informations</Text>
                    <Text style={styles.text}>
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, utilisation abusive, perte, ou destruction.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>7. Conservation des Données</Text>
                    <Text style={styles.text}>
                        Nous conservons vos informations aussi longtemps que nécessaire pour vous fournir notre service et pour d'autres objectifs légitimes tels que le respect de nos obligations légales, la résolution des litiges, et l'application de nos accords.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>8. Modifications de cette Politique</Text>
                    <Text style={styles.text}>
                        Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de toute modification en publiant la nouvelle politique sur notre application et en vous envoyant une notification.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>9. Contact</Text>
                    <Text style={styles.text}>
                        Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l'adresse suivante : <Text
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
