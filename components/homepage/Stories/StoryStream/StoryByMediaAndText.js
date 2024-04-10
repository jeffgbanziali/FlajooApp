import { View, Text, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useDarkMode } from '../../../Context/AppContext';

const StoryByMediaAndText = ({ story, progressAnimation, start }) => {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            {story?.media &&
                story?.text && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            position: "absolute",
                            width: "100%",
                            height: "92%",
                        }}
                    >
                        {story.media_type === "image" && (
                            <Image
                                source={{
                                    uri: story.media.url
                                }}
                                resizeMode="contain"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 10,
                                    opacity: 0.9,
                                }}
                                onLoadEnd={() => {
                                    progressAnimation.setValue(0);
                                    start()
                                }}
                            />
                        )}
                        {story.media_type === 'video' && (
                            <Video
                                source={{ uri: story.media.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="contain"
                                shouldPlay
                                isLooping
                                onLoad={() => {
                                    progressAnimation.setValue(0);
                                    start()
                                }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 10,
                                }}
                            />
                        )}
                        <LinearGradient
                            colors={["transparent", isDarkMode ? "black" : "black"]}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 200,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "row",
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                                /// backgroundColor: "green",
                                bottom: 0,
                                width: "100%",
                                height: "10%",
                                flexDirection: "column"
                            }}
                        >
                            <View style={{
                                width: "90%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                //backgroundColor: "red",
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 18,
                                        textAlign: "justify"
                                    }}
                                >
                                    {story.text}
                                </Text>
                            </View>

                        </View>
                    </View>
                )}
        </>
    )
}

export default StoryByMediaAndText