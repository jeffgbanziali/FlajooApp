import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming, interpolateColor } from 'react-native-reanimated';
import { useDarkMode } from '../../../Context/AppContext';

const PlaceholderComponent = () => {
    const { isDarkMode } = useDarkMode();
    const animation = useSharedValue(0);

    useEffect(() => {
        animation.value = withRepeat(
            withTiming(1, {
                duration: 1500,
                easing: Easing.linear,
            }),
            -1,
            true
        );
    }, [animation]);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animation.value,
            [0, 1],
            [isDarkMode ? '#333' : '#ddd', isDarkMode ? '#444' : '#eee']
        );
        return { backgroundColor };
    });

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray" }]}>
            <View style={styles.placeholder}>
                <Animated.View style={[styles.avatar, animatedStyle]} />
                <View style={styles.textContainer}>
                    <Animated.View style={[styles.textLine, animatedStyle]} />
                    <Animated.View style={[styles.textLineShort, animatedStyle]} />
                </View>
            </View>
            <Animated.View style={[styles.textBlock, animatedStyle]} />
            <Animated.View style={[styles.largeImage, animatedStyle]} />
            <View style={styles.footer}>
                <Animated.View style={[styles.footerIcon, animatedStyle]} />
                <Animated.View style={[styles.footerIcon, animatedStyle]} />
                <Animated.View style={[styles.footerIcon, animatedStyle]} />
                <Animated.View style={[styles.footerIcon, animatedStyle]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        width: '100%',
    },
    placeholder: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        width: '100%',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#444",
    },
    textContainer: {
        marginLeft: 10,
    },
    textLine: {
        width: 200,
        height: 10,
        backgroundColor: "#444",
        borderRadius: 20,
        marginBottom: 5,
    },
    textLineShort: {
        width: 150,
        borderRadius: 20,
        height: 10,
        backgroundColor: "#444",
    },
    textBlock: {
        width: '100%',
        height: 10,
        borderRadius: 15,
        backgroundColor: "#444",
        marginVertical: 10,
    },
    largeImage: {
        width: '100%',
        height: 400,
        backgroundColor: "#444",
        borderRadius: 10,
        marginVertical: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    footerIcon: {
        width: 80,
        height: 15,
        backgroundColor: "#444",
        borderRadius: 10,
    },
});

export default PlaceholderComponent;
