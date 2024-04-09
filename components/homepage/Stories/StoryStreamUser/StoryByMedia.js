import { View, Text, Image } from 'react-native'
import Video from 'react-native-video';

const StoryByMedia = ({ story, progressAnimation, start }) => {
    return (
        <>
            {story.media &&
                !story.text && (

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            position: "absolute",
                            borderRadius: 20,
                            width: "100%",
                            height: "100%",
                            //backgroundColor: "black"
                        }}
                    >

                        {story.media_type === "image" && (
                            <Image
                                source={{ uri: story.media.url }}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 20,
                                }}
                                resizeMode="contain"
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
                                resizeMode="cover"
                                onLoad={() => {
                                    progressAnimation.setValue(0);
                                    start()
                                }}
                                onError={(error) => console.error("Erreur de chargement de la vidéo:", error)}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: 20,
                                }}
                            />

                        )}
                    </View>
                )}
        </>
    )
}

export default StoryByMedia