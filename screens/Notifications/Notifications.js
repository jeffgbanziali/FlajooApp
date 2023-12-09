import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

const Notifications = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red"
            }}
        >
            <Text>  Welcome to my app </Text>

        </SafeAreaView>
    )
}

export default Notifications