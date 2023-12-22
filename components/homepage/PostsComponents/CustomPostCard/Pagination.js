import { View, Text, Animated, Dimensions } from 'react-native'
import React from 'react'



const { width } = Dimensions.get('screen')
const Pagination = ({ data, scrollX, indexion }) => {
    return (
        <View
            style={{
                position: "absolute",
                width: "100%",
                bottom: "16%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}

        >

            {
                data.map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: 'clamp',
                    });


                    const backgroundColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#ccc', 'red', '#ccc'],
                        extrapolate: 'clamp',
                    });


                    return <Animated.View
                        key={index.toString()}
                        style={[{
                            width: 10,
                            height: 10,
                            borderRadius: 6,
                            backgroundColor: "#ccc",
                            marginHorizontal: 3
                        }, { width: dotWidth, backgroundColor }]} />
                })
            }
        </View>
    )
}

export default Pagination