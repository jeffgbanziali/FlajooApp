import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../../Context/AppContext';

const CustomAlert = ({ visible, onClose, setLoadStories }) => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const closing = () => {
        onClose()
        setLoadStories(true)
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.alertContainer, { backgroundColor: isDarkMode ? '#171717' : '#E6E6E6' }]}>
                    <Text style={[styles.title, { color: isDarkMode ? 'green' : 'green' }]}>Succès</Text>
                    <Text style={[styles.message, { color: isDarkMode ? 'white' : '#333' }]}>
                        {t('StorySucces')}</Text>
                    <TouchableOpacity onPress={closing} style={styles.button}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    alertContainer: {
        width: 300,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: "red",
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomAlert;
