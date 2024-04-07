import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, Animated, Easing, Dimensions, Platform, Keyboard, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from "../../../Context/AppContext"
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, addDoc, getDoc, } from 'firebase/firestore';
import { uploadStoryToFirebase } from '../../../../Data/FireStore';
import { Modal } from 'react-native';
import { addStory, getStories } from '../../../../actions/story.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyGallery from "./MyGallery"
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import ShowImage from './ShowImage';
import ShowText from './ShowText';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const CreateStory = () => {
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [showText, setShowText] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const [galleryMedia, setGalleryMedia] = useState([]);
    const navigation = useNavigation();
    const [police, setPolice] = useState(['normal', 'Arial', 'serif', ' Times New Roman', ' monospace', 'Courier New']);
    const [indicePolice, setIndicePolice] = useState(0);
    const policeActuelle = police[indicePolice];
    const { isDarkMode } = useDarkMode();
    const [loadStories, setLoadStories] = useState(true);
    const [addText, setAddText] = useState(false);
    const [addEffect, setAddEffect] = useState(false);
    const [selectedEffect, setSelectedEffect] = useState(null);

    const { t } = useTranslation();



    useEffect(() => {
        if (loadStories) {
            dispatch(getStories());
            setLoadStories(false);
        }
    }, [loadStories, dispatch]);


    const handleClickReturnHome = () => {
        navigation.navigate('TabNavigation');
        setLoadStories(true);

    };
    const handleTakePicture = () => {
        navigation.navigate('Photo');
    };


    /*************************** système de création d'une story ********************************************/

    // Fonction pour gérer l'envoi de l'image
    const handleImageSubmit = async () => {
        const mediaName = `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`;
        const mediaUrl = await uploadStoryToFirebase(selectedImage.uri, mediaName, 'image');
        return { mediaType: 'image', mediaUrl };
    };

    // Fonction pour gérer l'envoi de la vidéo
    const handleVideoSubmit = async () => {
        const mediaName = `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`;
        const mediaUrl = await uploadStoryToFirebase(selectedVideo.uri, mediaName, 'video');
        return { mediaType: 'video', mediaUrl };
    };

    // Fonction pour gérer la soumission de l'histoire
    const submitStory = async (mediaType, mediaUrl) => {
        const storyData = {
            posterId: userData._id,
            text: postText,
            media: {
                type: mediaType,
                url: mediaUrl,
            },
        };

        // Sauvegarde localement avant l'envoi au serveur
        saveStoryLocally(storyData);

        // Envoyer la story au serveur ou à d'autres utilisateurs
        dispatch(addStory(storyData));
        Alert.alert('Succès', 'Votre story a été publiée avec succès !');
        setPostText('');
        setSelectedImage(null);
        setSelectedVideo(null);
        setLoadStories(true);
        navigation.goBack('TabNavigation');
    };

    // Fonction principale pour gérer la soumission de l'histoire
    
    const handleStorySubmit = async () => {
        try {
            let mediaType = null;
            let mediaUrl = null;

            if (selectedImage) {
                ({ mediaType, mediaUrl } = await handleImageSubmit());
            } else if (selectedVideo) {
                ({ mediaType, mediaUrl } = await handleVideoSubmit());
            }

            if ((postText && !mediaType) || (!postText && mediaType) || (postText && mediaType)) {
                submitStory(mediaType, mediaUrl);
            } else {
                Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour publier une histoire.');
            }
        } catch (error) {
            console.error('Erreur lors de la création de la story :', error);
            let errorMessage = 'Une erreur s\'est produite lors de la création de la story.';
            Alert.alert('Erreur', errorMessage);
        }
    };



    const saveStoryLocally = async (story) => {
        try {
            // Récupérer les stories existantes
            const existingStoriesStr = await AsyncStorage.getItem('localStories');
            const existingStories = existingStoriesStr ? JSON.parse(existingStoriesStr) : [];

            // Ajouter la nouvelle story à la liste
            existingStories.push(story);

            // Sauvegarder la liste mise à jour localement
            await AsyncStorage.setItem('localStories', JSON.stringify(existingStories));

            console.log('Story sauvegardée localement avec succès !');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde locale de la story :', error);
            throw error;
        }
    };


    const handleModalImage = async (item) => {
        try {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'La permission d\'accès à la bibliothèque de médias est requise.');
            } else {
                if (item.mediaType === 'video') {
                    // Si c'est une vidéo, affichez la vidéo
                    setSelectedVideo(item);
                    setSelectedImage(null); // Assurez-vous de réinitialiser l'image sélectionnée
                } else {
                    // Sinon, c'est une image, affichez l'image
                    setSelectedImage(item);
                    setSelectedVideo(null);
                    // Assurez-vous de réinitialiser la vidéo sélectionnée
                }

                setShowImage(true);
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de l\'élément multimédia :', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection de l\'élément multimédia.');
        }
    };



    const selectImage = async () => {
        try {
            console.log('Ouverture de la bibliothèque de médias...');
            const result = await launchImageLibrary({
                mediaType: 'mixed',
                allowsEditing: false,
                quality: 1,
            });

            if (!result.didCancel) {
                if (result.assets && result.assets.length > 0) {
                    const selectedAsset = result.assets[0];

                    if (selectedAsset.uri.endsWith('.mp4')) {
                        setSelectedVideo(selectedAsset);
                        setSelectedImage(null);
                        setShowImage(true);
                        console.log('Vidéo sélectionnée :', selectedAsset);
                    } else {
                        setSelectedImage(selectedAsset);
                        setSelectedVideo(null);
                        setShowImage(true);
                        console.log('Image sélectionnée :', selectedAsset);
                    }
                } else {
                    console.log('Aucun média sélectionné');
                }
            } else {
                console.log('Sélection annulée');
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du média :', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection du média.');
        }
    };

    /*************************** système de création d'une story ********************************************/


    const closeImageModal = () => {
        setShowImage(false);
    };


    const handleText = () => {
        setShowText(!showText);
    };

    const closeModalText = () => {
        setShowText(false);
    };

    const goCamera = () => {
        console.log('camera');
        navigation.navigate("StoryCamera")
    }




    const changerPoliceText = () => {
        setIndicePolice((indice) => (indice + 1) % police.length);
    };

    const handlePress = () => {
        setAddText(!addText);
    };
    const handleAddEffect = () => {
        setAddEffect(!addEffect);
    };


    const handleSelectEffect = (effect) => {
        setSelectedEffect(effect);
    };

    return (

        <>
            <SafeAreaView
                keyboardShouldPersistTaps="always"
                style={{
                    flex: 1,
                    backgroundColor: isDarkMode ? "#171717" : "white",
                    position: "relative",

                }}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        paddingRight: 6,
                        borderColor: isDarkMode ? "#F5F5F5" : "lightgray",
                        //backgroundColor: 'red'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={handleClickReturnHome}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 30,
                                marginLeft: "3.5%"
                            }}>
                            <View>
                                <AntDesign
                                    name="arrowleft"
                                    size={25}
                                    color={isDarkMode ? "#F5F5F5" : "black"}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: isDarkMode ? "#F5F5F5" : "black",
                                marginLeft: "3.5%",
                                alignSelf: 'center'
                            }}>
                            {t('CreateStory')}
                        </Text>

                    </View>


                    <View
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 100,
                        }}
                    >
                        <Image
                            source={{
                                uri: userData.picture
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                            }} />
                    </View>


                </View>

                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 10
                    }}>

                    <TouchableOpacity
                        onPress={handleText}
                        style={{
                            width: 100,
                            height: 140,
                            backgroundColor: "#8A8A94",
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "blue",
                                borderRadius: 100,
                            }}
                        >
                            <MaterialCommunityIcons name="format-letter-case" size={24} color="white" />
                        </View>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "white",
                                fontSize: 12,
                                marginTop: 10,
                            }}
                        >
                            {t("WriteText")}
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 140,
                            backgroundColor: "#7D5C96",
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "green",
                                borderRadius: 100,
                            }}>
                            <Feather name="music" size={24} color="white" />
                        </View>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "white",
                                fontSize: 16,
                                marginTop: 10,

                            }}
                        >
                            {t(' Music')}
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={goCamera}
                        style={{
                            width: 100,
                            height: 140,
                            backgroundColor: "#8C1616",
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "yellow",
                                borderRadius: 100,
                            }}
                        >
                            <Feather name="smile" size={24} color="black" />
                        </View>
                        <Text
                            style={{
                                color: isDarkMode ? "#F5F5F5" : "white",
                                marginTop: 10,

                                fontSize: 16
                            }}
                        >
                            {t('Selfie')}
                        </Text>

                    </TouchableOpacity>

                </View>


                <MyGallery
                    isDarkMode={isDarkMode}
                    galleryMedia={galleryMedia}
                    selectImage={selectImage} />

            </SafeAreaView>




            <Modal
                visible={showImage}
                transparent={true}
                animationType="slide"
                onRequestClose={closeImageModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{
                        flex: 1,
                        backgroundColor: isDarkMode ? "black" : "black",
                        width: windowWidth,
                        height: windowHeight
                    }}>




                    <ShowImage
                        selectedImage={selectedImage}
                        selectedVideo={selectedVideo}
                        addText={addText}
                        postText={postText}
                        handleAddEffect={handleAddEffect}
                        setPostText={setPostText}
                        handlePress={handlePress}
                        handleStorySubmit={handleStorySubmit}
                        isDarkMode={isDarkMode}
                        closeImageModal={closeImageModal}
                    />
                </KeyboardAvoidingView>


            </Modal>

            <Modal
                visible={showText}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModalText}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{
                        flex: 1,
                        backgroundColor: isDarkMode ? "black" : "gray",
                        height: "100%"
                    }}>


                    <ShowText
                        selectedImage={selectedImage}
                        selectedVideo={selectedVideo}
                        addText={addText}
                        postText={postText}
                        policeActuelle={policeActuelle}
                        handleAddEffect={handleAddEffect}
                        setPostText={setPostText}
                        handlePress={handlePress}
                        handleStorySubmit={handleStorySubmit}
                        isDarkMode={isDarkMode}
                        closeModalText={closeModalText} />


                </KeyboardAvoidingView>

            </Modal>

        </>


    );
};

export default CreateStory;
