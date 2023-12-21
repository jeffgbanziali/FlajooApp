import { View, StyleSheet, Animated, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LikeButton = () => {
    const liked = useSharedValue(0);

    const outlineStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
                },
            ],
        };
    });
    const fillStyle = useAnimatedStyle(() => {
        return {
          transform: [{ scale: liked.value }],
          opacity: liked.value,
        };
      });

    return (
        <SafeAreaView
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}
        >
            <Pressable onPress={
                () => {
                    console.warn('Pressable Pressed');
                    (liked.value = withSpring(liked.value ? 0 : 1))
                }}>

                <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
                    <MaterialCommunityIcons
                        name={"heart-outline"}
                        size={32}
                        color={"black"}
                    />
                </Animated.View>
                <Animated.View style={fillStyle}>
                    <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
                </Animated.View>
            </Pressable>
        </SafeAreaView>

    );
};
export default LikeButton