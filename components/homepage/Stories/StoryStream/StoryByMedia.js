import { View, Text, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

const StoryByMedia = ({ story, progressAnimation, start }) => {

    return (
        <>
            {story?.media &&
                !story?.text && (

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
                                source={{ uri: story.media }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 10,
                                    resizeMode: "contain",
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
                                source={{ uri: story.media }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                onLoad={() => {
                                    progressAnimation.setValue(0);
                                    start()
                                }}
                                onError={(error) => console.error("Erreur de chargement de la vidéo:", error)}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 10,
                                }}
                            />

                        )}
                    </View>
                )}
        </>
    )
}

export default StoryByMedia