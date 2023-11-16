import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(RNCamera.Constants.Type.back);
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
    const cameraRef = useRef(null);


    const navigation = useNavigation();
    const handleClickReturnNewPost = () => {
        console.log("clicked")
        navigation.navigate('NewPostScreen');
    }

    useEffect(() => {
        (async () => {
            const { status } = await RNCamera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
        console.warn('error')
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Pas d'accès à la caméra</Text>;
    }

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
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleClickReturnNewPost}
                            style={{
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: 30,
                                marginLeft: "3.5%",
                                marginTop: 50,
                            }}
                        >
                            <View>
                                <AntDesign name="arrowleft" size={25} color="white" style={{
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
                                    {type === RNCamera.Constants.Type.back ? <MaterialIcons name="flip-camera-android" size={24} color="white" /> : <MaterialIcons name="flip-camera-android" size={24} color="white" />}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cameraAction}
                                onPress={toggleFlashMode}
                            >
                                <Text style={styles.cameraActionText}>
                                    {flash === RNCamera.Constants.FlashMode.off ? <MaterialCommunityIcons name="flash" size={24} color="white" /> : <MaterialCommunityIcons name="flash-off" size={24} color="white" />}
                                </Text>
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
                                <AntDesign
                                    style={{
                                    }}
                                    name="camera" size={40} color="white" />
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
        flexDirection: 'row',
        marginTop: 50,

    },
    cameraAction: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 100,
        marginLeft: "1.5%",
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

export default CameraScreen;
