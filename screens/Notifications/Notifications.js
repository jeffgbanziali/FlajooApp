import { View, Text, SafeAreaView, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import i18next, { languageResources } from "../../Translations/Services/i18next"
import languagesList from "../../Translations/Services/LanguagesList.json"
import { useTranslation } from 'react-i18next'

const Notifications = () => {

    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();

    const changeLng = lng => {
        i18next.changeLanguage(lng);
        setVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.text}>{t('welcome')}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>{t('change-language')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191266',
    },
    button: {
        backgroundColor: '#6258e8',
        padding: 10,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    text: {
        marginBottom: 100,
        fontSize: 18,
        color: 'white',
    },
});

export default Notifications