import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { View, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import StoriesViewUser from './StoriesViewUser';
import { useDarkMode } from '../../../Context/AppContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 300;

const BottomSheetStories = forwardRef(({ children, story, stopAnimation, startAnimation }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const { isDarkMode } = useDarkMode();

    const scrollTo = useCallback((destination) => {
        'worklet';
        active.value = destination !== 0;
        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
        return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const context = useSharedValue({ y: 0 });



    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
            // Arrête l'animation lorsque le geste commence
            stopAnimation();
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        })
        .onEnd(() => {
            if (translateY.value > -SCREEN_HEIGHT / 3) {
                scrollTo(0);
                startAnimation();

            } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                scrollTo(MAX_TRANSLATE_Y);
            }

        });

    const reBottomSheet = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [25, 5],
            Extrapolate.CLAMP
        );

        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[reBottomSheet]}>
                <View style={{
                    height: SCREEN_HEIGHT,
                    width: '100%',
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    top: SCREEN_HEIGHT,
                    borderRadius: 25,
                    alignItems: "center",
                    bottom: 0,
                }}>
                    <View
                        style={{
                            width: 30,
                            height: 6,
                            alignSelf: 'center',
                            backgroundColor: 'gray',
                            marginTop: 10,
                            borderRadius: 5
                        }} />

                    {children}
                    <StoriesViewUser story={story} />
                </View>
            </Animated.View>
        </GestureDetector>
    );
});

export default BottomSheetStories;