import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Dimensions, Image, SafeAreaView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, getPosts } from '../../actions/post.actions';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { uploadImageToFirebase } from '../../Data/FireStore';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import { FlatList } from 'react-native';
import ModalViewPost from './ModalViewPost';


const ButtonChoice = ({selectImage}) => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const [isPressed, setIsPressed] = useState(false);
    const { t } = useTranslation();

    const handleTakePicture = () => {
        navigation.navigate('Photo');
    };

    return (
        <View style={{ marginTop: 2 }}>
            <TouchableOpacity onPress={handleTakePicture}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60, width: "100%",
                    alignItems: 'center',
                    backgroundColor: isPressed ? "#F5F5F5" : "#FFFFFF",
                    backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
                    borderBottomWidth: 1,
                    borderColor: isDarkMode ? "#343232" : "lightgray",

                }}>
                    <AntDesign
                        style={{ marginLeft: "1.5%" }}
                        name="camera" size={30} color="blue" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'semibold',
                            color: isDarkMode ? "#F5F5F5" : "black",
                            marginLeft: "1.5%",
                            alignSelf: 'center'
                        }}>
                        {t('TakePic')}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={selectImage}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center', height: 60,
                        width: "100%", alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: isDarkMode ? "#343232" : "lightgray",
                        backgroundColor: isPressed ? "#F5F5F5" : "#FFFFFF",
                        backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',

                    }}>
                    <Ionicons
                        style={{ marginLeft: "1.5%" }}
                        name="image" size={30}
                        color="green" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'semibold',
                            color: isDarkMode ? "#F5F5F5" : "black",
                            marginLeft: "1.5%",
                            alignSelf: 'center'
                        }}>{t('AddPic')}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={selectImage}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 60, width: "100%",
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        backgroundColor: isPressed ? "#F5F5F5" : "#FFFFFF",
                        backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
                        borderColor: isDarkMode ? "#343232" : "lightgray",
                    }}>
                    <FontAwesome
                        style={{ marginLeft: "1.5%" }}
                        name="video-camera"
                        size={30}
                        color="red" />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'semibold',
                        color: isDarkMode ? "#F5F5F5" : "black",
                        marginLeft: "1.5%",
                        alignSelf: 'center'
                    }}>
                        {t('Live')}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonChoice