import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const StoryCamera = () => {
    const [type, setType] = useState(RNCamera.Constants.Type.back);
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
    const cameraRef = useRef(null);


    const navigation = useNavigation();
    const handleClickReturnStoryCreate = () => {
        console.log("clicked")
        navigation.navigate('StoryCreate');
    }



    const toggleCameraType = () => {
        setType(
            type === RNCamera.Constants.Type.back
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
        );
    };

    const toggleFlashMode = () => {
        setFlash(
            flash === RNCamera.Constants.FlashMode.off
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
        );
    };

    const takePicture = async () => {
        console.warn("eerfer")
    };




    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={type}
                flashMode={flash}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        height: "100%",
                        justifyContent: "space-between"

                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            height: "42%",
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleClickReturnStoryCreate}
                            style={{
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: 30,
                                marginLeft: "4.5%",
                                marginTop: 50,
                            }}
                        >
                            <View>
                                <AntDesign name="arrowleft"
                                    size={25} color="white" style={{
                                        alignSelf: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        resizeMode: "contain"
                                    }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.cameraActions}>
                            <TouchableOpacity
                                style={styles.cameraAction}
                                onPress={toggleCameraType}
                            >
                                <View style={styles.cameraActionText}>
                                    {type === RNCamera.Constants.Type.back ? <MaterialIcons name="flip-camera-android" size={30} color="white" /> : <MaterialIcons name="flip-camera-android" size={30} color="white" />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cameraAction}
                                onPress={toggleFlashMode}
                            >
                                <Text style={styles.cameraActionText}>
                                    {flash === RNCamera.Constants.FlashMode.off ? <MaterialCommunityIcons name="flash" size={30} color="white" /> : <MaterialCommunityIcons name="flash-off" size={30} color="white" />}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cameraAction}

                            >
                                <Entypo name="time-slot" size={30} color="white" />

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cameraAction}

                            >
                                <Entypo
                                    name="adjust"
                                    size={30}
                                    color="#F5F5F5"
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cameraAction}

                            >
                                <Ionicons
                                    name="musical-notes"
                                    size={30} color="#F5F5F5" />

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View

                    >
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                        >
                            <View style={styles.captureButtonText}>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </RNCamera>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    cameraActions: {
        flexDirection: 'column',
        marginTop: 40,
        justifyContent: 'space-around',
        marginRight: "4.5%",


    },
    cameraAction: {
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cameraActionText: {
        color: 'white',
    },
    captureButton: {
        alignSelf: 'center',
        display: 'flex',
        backgroundColor: 'gray',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 100,
        marginBottom: 40,

    },
    captureButtonText: {
        color: 'white',
    },
});

export default StoryCamera;
