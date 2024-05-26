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
import ExperienceTools from "./ExperienceTools";

const ExperienceFriendsModal = ({ showModal, users }) => {


    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [loadUsers, setLoadUSers] = useState(true);
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const [showTools, setShowTools] = useState(false);
    const [toolsHeight, setToolsHeight] = useState(new Animated.Value(0));
    const { t } = useTranslation();

    const handleClickReturnProfile = () => {
        showModal()
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "black",
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",

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
                    {t('Experiences')}
                </Text>


            </View>
            {
                users.experience.length > 0 ? (
                    <>

                        <FlatList
                            data={users.experience}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <ExperienceTools experience={item} />
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
                                    fontSize: 16,
                                    color: "white",
                                    fontWeight: '500',
                                    fontWeight: '500',
                                }}>
                                Aucune expérience professionnelle enregistrée
                            </Text>
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

export default ExperienceFriendsModal