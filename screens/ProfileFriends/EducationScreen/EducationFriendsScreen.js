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
    FlatList,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next'
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { useDarkMode } from "../../../components/Context/AppContext";
import EducationTools from "./EducationTools";

const EducationScreen = () => {


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
                backgroundColor: isDarkMode ? "#2C2C2C" : "#E6E6E6",


            }}>
            <View
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity onPress={() => handleClickReturnProfile()}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
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
                    }}>
                    {t('Education')}
                </Text>

                <View
                    style={{
                        width: 120,
                        height: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Feather
                            name="plus"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                        <Octicons
                            name="pencil"
                            size={20}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            {
                userData.education.length > 0 ? (
                    <>

                        <FlatList
                            data={userData.education}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <EducationTools education={item} />
                                )
                            }}

                        />

                    </>
                ) :
                    (
                        <View
                            style={{
                                width: "100%",
                                height: 60,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "white",
                                    fontWeight: '500',
                                    fontWeight: '500',
                                }}>
                                Ajouter vos formations
                            </Text>
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

export default EducationScreen