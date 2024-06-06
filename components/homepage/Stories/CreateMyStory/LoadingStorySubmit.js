import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../../Context/AppContext';


const LoadingStorySubmit = ({ progress }) => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const spinValue = useRef(new Animated.Value(0)).current;
    const progressValue = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);


    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        Animated.timing(progressValue, {
            toValue: progress,
            duration: 3000,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start();
    }, [progress]);



    const scaleX = progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });



    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "black" : "white" }]}>
            <View style={{ flexDirection: "row" }}>
                <Animated.View style={[styles.loaderContainer, { transform: [{ rotate: spin }] }]}>
                    <View style={styles.loaderCircle1} />
                    <View style={styles.loaderCircle1} />
                    <View style={styles.loaderCircle1} />
                </Animated.View>
                <Animated.View style={[styles.loaderContainer, { transform: [{ rotate: spin }] }]}>
                    <View style={styles.loaderCircle2} />
                    <View style={styles.loaderCircle2} />
                    <View style={styles.loaderCircle2} />
                </Animated.View>
            </View>
            <Text style={[styles.text, { color: isDarkMode ? "white" : "black" }]}>
                {t("Waiting")}...
            </Text>
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { transform: [{ scaleX }] }]} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    loaderCircle1: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#3498db',
        position: 'absolute',
    },
    loaderCircle2: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#ED3237',
        position: 'absolute',
    },
    text: {
        fontSize: 25,
        fontWeight: "500",
        marginTop: 20
    },
    progressBarContainer: {
        width: '80%',
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
    },
    progressBar: {
        width: '100%',
        height: '100%',
        backgroundColor: '#3498db',
    },
});
export default LoadingStorySubmit