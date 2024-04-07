import { View, Text, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

const StoryByText = ({ story, progressAnimation, start }) => {

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                width: "100%",
                height: "100%",
            }}
        >
            {!story?.media && (

                <View
                    onLayout={() => {
                        progressAnimation.setValue(0);
                        start();
                    }}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "#1E0F1C",
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        width: "92%",
                        height: "80%",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 30,
                        }}
                    >
                        {story?.text}
                    </Text>
                </View>
            )}

        </View>
    )
}

export default StoryByText