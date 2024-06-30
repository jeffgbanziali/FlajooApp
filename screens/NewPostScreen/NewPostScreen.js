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
import ButtonChoice from './ButtonChoice';
import LoadingPostSubmit from './loadingPostSubmit';
import CustomAlert from './CustomAlert';



const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const NewPostScreen = () => {
    const [postText, setPostText] = useState('');
    const [selectedMediaArray, setSelectedMediaArray] = useState([]);
    const [showImage, setShowImage] = useState(false)
    const [addText, setAddText] = useState(false);
    const [loadingSubmitPost, setLoadingSubmitPost] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [loadPost, setLoadPost] = useState(true);
    const { isDarkMode } = useDarkMode();

    const { t } = useTranslation();

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(userData._id));
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);


    const handleClickReturnHome = () => {
        navigation.navigate('TabNavigation');
    };
    const handleTakePicture = () => {
        navigation.navigate('Photo');
    };


    /*************************** système de création d'un post ********************************************/

    const processMedia = async (selectedMedia) => {
        let mediaType = null;
        let mediaUrl = null;
        let duration = null;
        let fileName = null;
        let fileSize = null;
        let height = null;
        let width = null;

        if (selectedMedia.type.includes('image')) {
            mediaType = 'image';
        } else if (selectedMedia.type.includes('video')) {
            mediaType = 'video';
            duration = selectedMedia.duration || null; // Assume duration is provided in the selectedMedia object for videos
        }

        if (mediaType) {
            fileName = `${mediaType}-${Date.now()}.${selectedMedia.uri.split('.').pop()}`;
            fileSize = selectedMedia.fileSize || null; // Assume fileSize is provided in the selectedMedia object
            height = selectedMedia.height || null; // Assume height is provided in the selectedMedia object
            width = selectedMedia.width || null; // Assume width is provided in the selectedMedia object

            mediaUrl = await uploadImageToFirebase(selectedMedia.uri, fileName, mediaType);
            return {
                mediaUrl,
                mediaType,
                duration,
                fileName,
                fileSize,
                height,
                width
            };
        }

        return null;
    };



    const handlePostSubmitError = (error) => {
        console.error('Erreur lors de la création du post :', error);

        let errorMessage = 'Une erreur s\'est produite lors de la création du post.';

        if (error.response && error.response.data && error.response.data.errors) {
            errorMessage = Object.values(error.response.data.errors).join('\n');
        }

        Alert.alert('Erreur', errorMessage);
    };

    const handlePostSubmit = async () => {
        setLoadingSubmitPost(true);
        setProgress(0);

        try {
            let mediaArray = [];

            if (selectedMediaArray.length > 0) {
                for (let index = 0; index < selectedMediaArray.length; index++) {
                    const processedMedia = await processMedia(selectedMediaArray[index]);
                    mediaArray.push(processedMedia);
                    setProgress((index + 1) / selectedMediaArray.length * 0.5); // Progression jusqu'à 50% pour le traitement des médias
                }
                mediaArray = mediaArray.filter(Boolean);
            }

            const postData = {
                posterId: userData._id,
                message: postText,
                media: mediaArray,
            };

            console.log("Ma data", postData)


            if ((postText && mediaArray.length > 0) || (!postText && mediaArray.length > 0) || (postText && !mediaArray.length)) {
                setProgress(0.6); // Progression à 60% avant l'envoi des données du post

                // Simuler la progression avec un intervalle
                let progressInterval = setInterval(() => {
                    setProgress((prevProgress) => {
                        if (prevProgress >= 0.95) { // Limite la progression à 95% avant la soumission réelle
                            clearInterval(progressInterval);
                            return prevProgress;
                        }
                        return prevProgress + 0.01; // Incrémente la progression
                    });
                }, 3000); // Intervalle de 100ms pour une progression fluide

                // Attendre que la soumission soit terminée


                setProgress(1);


                dispatch(addPosts(postData))
                dispatch(getPosts(userData._id));
                setPostText('');
                setSelectedMediaArray([]);
                setLoadPost(true);
                closeImageModal();
                // navigation.goBack('TabNavigation');
            } else {
                Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour publier une histoire.');
            }
        } catch (error) {
            handlePostSubmitError(error);
            setLoadingSubmitPost(false);
        } finally {
            setTimeout(() => {
                setLoadingSubmitPost(false);
                setShowAlert(true);

            }, 3000);
        }
    };


    console.log("Voici l'état de ma progression", progress)



    const selectImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'mixed',
                allowsEditing: false,
                quality: 1,
                selectionLimit: 5,  // Autorise la sélection de jusqu'à 5 médias
            });

            if (!result.didCancel) {
                if (result.assets && result.assets.length > 0) {
                    // Met à jour l'état selectedMediaArray avec les médias sélectionnés
                    setSelectedMediaArray(result.assets);
                    // Affiche les miniatures des images sélectionnées dans ton interface utilisateur
                    setShowImage(true);
                    console.log('Voici mon image', result.assets);


                } else {
                    console.log('Aucun média sélectionné');
                }
            } else {
                console.log('Sélection annulée');
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de l\'image :', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection de l\'image.');
        }
    };

    /*************************** système de création d'un post ********************************************/




    const handlePress = () => {
        setAddText(!addText);
    };

    const closeImageModal = () => {
        setShowImage(false);
    };

    return (



        <>
            {
                loadingSubmitPost ? (
                    <LoadingPostSubmit progress={progress} />
                ) : (
                    <>
                        <SafeAreaView
                            keyboardShouldPersistTaps="always"
                            style={{
                                flex: 1, backgroundColor: isDarkMode ? "#171717" : "white",
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 2,
                                    borderColor: isDarkMode ? "#343232" : "lightgray",
                                    //backgroundColor: "red",
                                }}>
                                <View
                                    style={{
                                        flexDirection:
                                            'row', alignItems:
                                            'center'
                                    }}>
                                    <TouchableOpacity
                                        onPress={handleClickReturnHome}
                                        style={{
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            width: 40,
                                            height: 40,
                                            borderRadius: 30,
                                        }}>
                                        <View>
                                            <AntDesign
                                                name="arrowleft"
                                                size={25}
                                                color={isDarkMode ? "#F5F5F5" : "black"}
                                                style={{
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                }} />
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
                                        {t('CreatePost')}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={handlePostSubmit}>
                                    <View
                                        style={{
                                            marginRight: "3.5%",
                                            width: 100,
                                            height: 36,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            backgroundColor: isDarkMode ? "#E52C2C" : "#2B60E8",
                                            alignItems: 'center',
                                            borderRadius: 10
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                color: "white"
                                            }}>
                                            {t('AddPost')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    width: "100%"
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        marginLeft: "3.5%"
                                    }}>
                                    <View
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 100
                                        }}>
                                        <Image
                                            source={{
                                                uri: userData.picture
                                            }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 100
                                            }} />
                                    </View>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: isDarkMode ? "#F5F5F5" : "black",
                                        marginLeft: "3.5%"
                                    }}>
                                        {userData.pseudo}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        marginTop: 20,
                                        flex: 1,
                                        backgroundColor: isDarkMode ? "#171717" : "white",
                                    }}>
                                    <View style={{
                                        width: "100%",
                                        height: "20%",
                                        borderBottomWidth: 1,
                                        borderColor: isDarkMode ? "#343232" : "lightgray",
                                    }}>
                                        <TextInput
                                            multiline
                                            placeholderTextColor={isDarkMode ? "#F5F5F5" : "black"}
                                            placeholder={t('PostPlaceholder')}
                                            value={postText}
                                            onChangeText={text => setPostText(text)}
                                            style={{
                                                height: 100,
                                                width: "100%",
                                                borderRadius: 10,
                                                marginLeft: "3.5%",
                                                fontSize: 25,
                                                color: isDarkMode ? "#F5F5F5" : "black",
                                            }} />
                                    </View>

                                    <ButtonChoice selectImage={selectImage} />
                                </View>
                            </View>
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
                                    alignItems: "center",
                                    backgroundColor: isDarkMode ? "black" : "black",
                                    width: windowWidth,
                                    height: windowHeight
                                }}>

                                <ModalViewPost
                                    closeImageModal={closeImageModal}
                                    handlePostSubmit={handlePostSubmit}
                                    addText={addText}
                                    windowWidth={windowWidth}
                                    selectedMediaArray={selectedMediaArray}
                                    handlePress={handlePress}

                                />

                            </KeyboardAvoidingView>
                        </Modal>
                        <CustomAlert
                            visible={showAlert}
                            onClose={() => setShowAlert(false)}

                        />
                    </>
                )
            }

        </>
    );
};

export default NewPostScreen;
