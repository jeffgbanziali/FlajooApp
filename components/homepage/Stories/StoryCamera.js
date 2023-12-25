import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { useCameraPermission } from "react-native-vision-camera"

const StoryCamera = () => {


    const navigation = useNavigation();
    const handleClickReturnStoryCreate = () => {
        console.log("clicked")
        navigation.navigate('StoryCreate');
    }

    const { hasPermission, requestPermission } = useCameraPermission()

    console.log("go to jeffCam", hasPermission)






    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black"

            }}>
            <Text style={{
                color: "white"
            }}>
                Jeff
            </Text>


        </View>
    );
};



export default StoryCamera;
