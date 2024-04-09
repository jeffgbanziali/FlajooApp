import { View, Text, Image } from 'react-native'
import Video from 'react-native-video';
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useDarkMode } from '../../../Context/AppContext';

const StoryByMediaAndText = ({ story, progressAnimation, start }) => {

    const { isDarkMode } = useDarkMode();



    return (
        <>

            {story.media &&
                story.text && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            position: "absolute",
                            borderRadius: 20,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black"
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
                                    borderRadius: 20,
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
                                shouldPlay
                                isLooping
                                resizeMode="contain"
                                onLoad={() => {
                                    progressAnimation.setValue(0);
                                    start()
                                }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 20,
                                }}
                            />
                        )}

                        <LinearGradient
                            colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 200, // Ajuste la hauteur du dégradé selon tes besoins
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
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
                                //backgroundColor: "green",
                                bottom: 62,
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
                            <View
                                style={{
                                    width: "90%",
                                    borderBottomWidth: 3,
                                    borderRadius: 10,
                                    borderColor: 'gray',
                                }}>

                            </View>

                        </View>
                    </View>
                )}

        </>
    )
}

export default StoryByMediaAndText