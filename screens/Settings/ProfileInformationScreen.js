import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Animated,
    Easing,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { getUser, updateProfile } from "../../actions/user.action";
import { firestore, uploadProfileToFirebase } from "../../Data/FireStore";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { useTranslation } from 'react-i18next'
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { useDarkMode } from "../../components/Context/AppContext";
import UserTools from "../../components/Settings/ProfilUserInformation/UserTools";
import Studies from "../../components/Settings/ProfilUserInformation/Studies";
import Experiences from "../../components/Settings/ProfilUserInformation/Experiences";


const ProfileInformationScreen = () => {

    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [loadUsers, setLoadUSers] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const [showTools, setShowTools] = useState(false);
    const [toolsHeight, setToolsHeight] = useState(new Animated.Value(0));
    const { t } = useTranslation();


    const handleClickReturnProfile = () => {
        console.log("clicked home");
        navigation.goBack("Profile");
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
                backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',


            }}>

            <View
                style={{
                    paddingBottom: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    /*borderBottomColor: "gray",
                    borderBottomWidth: 1,*/
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity onPress={() => handleClickReturnProfile()}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 25,
                        color: isDarkMode ? "white" : "black",
                        fontWeight: "bold",
                        marginLeft: 10,
                    }}>
                    {t('UserInformation')}
                </Text>
            </View>
            <ScrollView>
                <UserTools />
                <Studies />
                <Experiences/>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ProfileInformationScreen