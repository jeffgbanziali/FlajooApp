import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDarkMode } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';

const NoConnection = () => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: -10,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 10,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim, bounceAnim]);


    const handleReload = () => {
        RNRestart.Restart();
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/Logos/1.png')}
                    style={styles.image}
                />
            </View>

            <Text style={[styles.message, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                {t("Veuillez vous connecter au réseau")}
            </Text>

            <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
                <Feather name="wifi-off" size={90} color={isDarkMode ? "white" : "black"} />
            </Animated.View>

            <TouchableOpacity
                onPress={handleReload}
                style={styles.retryButton}>
                <Feather name="refresh-cw" size={24} color="#ffffff" />
                <Text style={styles.retryText}>{t("Réessayer")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    message: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 20,
        marginTop: 40,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 40,
    },
    retryText: {
        fontSize: 18,

        color: '#ffffff',
        marginLeft: 10,
    },
});

export default NoConnection;
