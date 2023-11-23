import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, Animated, Easing, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from "../../Context/AppContext"
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, addDoc, getDoc, } from 'firebase/firestore';
import { firestore, uploadStoryToFirebase } from '../../../Data/FireStore';
import { Modal } from 'react-native';
import { addStory, getStories } from '../../../actions/story.action';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
    const [text, setText] = useState("");
    const [police, setPolice] = useState(['normal', 'Arial', 'serif', ' Times New Roman', ' monospace', 'Courier New']);
    const [indicePolice, setIndicePolice] = useState(0);
    const policeActuelle = police[indicePolice];
    const { isDarkMode } = useDarkMode();
    const [loadStories, setLoadStories] = useState(true);
    const [addText, setAddText] = useState(false);
    const [addEffect, setAddEffect] = useState(false);
    const [selectedEffect, setSelectedEffect] = useState(null);
    const [commentsHeight, setCommentsHeight] = useState(new Animated.Value(0));

    const surfaceRef = useRef(null);

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


    const handleStorySubmit = async () => {
        try {
            let mediaUrl = null;
            let mediaType = null;

            if (selectedImage) {
                const mediaName = `image-${Date.now()}.${selectedImage.uri.split('.').pop()}`;
                mediaUrl = await saveMediaLocally(selectedImage.uri, mediaName, 'image');
                mediaType = 'image';
            } else if (selectedVideo) {
                const mediaName = `video-${Date.now()}.${selectedVideo.uri.split('.').pop()}`;
                mediaUrl = await saveMediaLocally(selectedVideo.uri, mediaName, 'video');
                mediaType = 'video';
            }

            const storyData = {
                posterId: userData._id,
                text: postText,
                media: {
                    type: mediaType,
                    url: mediaUrl,
                },
            };

            // Condition pour la soumission
            if ((postText && !mediaType) || (!postText && mediaType) || (postText && mediaType)) {
                // Sauvegarde localement avant l'envoi au serveur
                saveStoryLocally(storyData);

                // Envoyer la story au serveur ou à d'autres utilisateurs
                dispatch(addStory(storyData));
                const docRef = await addDoc(collection(firestore, 'stories'), storyData);
                const docSnapshot = await getDoc(docRef);

                console.log('Story créée avec succès! Document ID:', docRef.id);
                console.log('Document data:', docSnapshot.data());

                Alert.alert('Succès', 'Votre story a été publiée avec succès !');
                setPostText('');
                setSelectedImage(null);
                setSelectedVideo(null);
                setLoadStories(true);
                navigation.goBack('TabNavigation');
            } else {
                Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour publier une histoire.');
            }
        } catch (error) {
            console.error('Erreur lors de la création de la story :', error);
            let errorMessage = 'Une erreur s\'est produite lors de la création de la story.';
            Alert.alert('Erreur', errorMessage);
        }
    };

    const saveMediaLocally = async (uri, fileName, mediaType) => {
        return new Promise((resolve, reject) => {
            // Utiliser RNFS pour sauvegarder localement
            RNFS.copyFile(uri, `${RNFS.DocumentDirectoryPath}/${fileName}`)
                .then(() => {
                    console.log(`${mediaType} sauvegardé avec succès localement !`);
                    resolve(`${RNFS.DocumentDirectoryPath}/${fileName}`);
                })
                .catch((error) => {
                    console.error(`Erreur lors de la sauvegarde locale du ${mediaType}.`, error);
                    reject(error);
                });
        });
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


    { /* useEffect(() => {
        const fetchMedia = async () => {
            try {
                // Demander l'autorisation d'accéder à la bibliothèque multimédia
                const { status } = await MediaLibrary.requestPermissionsAsync();

                if (status !== 'granted') {
                    // Si l'autorisation n'est pas accordée, afficher une alerte ou prendre d'autres mesures
                    console.error('Permission refusée pour accéder à la bibliothèque multimédia.');
                    return;
                }

                // L'autorisation est accordée, récupérer les médias
                const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: 'all' });
                console.log('Médias récupérés avec succès:', assets);
            } catch (error) {
                console.error('Erreur lors de la récupération des médias :', error);
            }
        };

        // Appeler la fonction pour récupérer les médias
        fetchMedia();
    }, []);*/}



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
            <View
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
                        marginTop: 50,
                        borderBottomWidth: 1,
                        borderColor: isDarkMode ? "#F5F5F5" : "lightgray",
                        padding: 6
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
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
                            Create Your Story
                        </Text>

                    </View>
                    <Image
                        source={{
                            uri: userData.picture
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100
                        }} />

                </View>

                <View style={{
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
                                fontSize: 14,
                                marginTop: 10,
                            }}
                        >
                            Write a text
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
                            Music
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
                            Selfie
                        </Text>

                    </TouchableOpacity>

                </View>
                <View
                    style={{
                        height: "100%",
                        marginTop: 10,
                        flexDirection: "column",
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "6%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                width: "30%",
                                justifyContent: "center",
                                padding: 10,
                                borderRadius: 10,
                                marginLeft: "4%",


                            }} >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '300',
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    marginLeft: "3.5%",
                                    alignSelf: 'center'
                                }}>
                                Pellicule
                            </Text>
                            <View
                                style={{
                                    marginLeft: 4
                                }}
                            >
                                <MaterialIcons
                                    name="keyboard-arrow-down"
                                    size={24}
                                    color="black" />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={selectImage}
                            style={{
                                flexDirection: "row",
                                width: "45%",
                                justifyContent: "center",
                                marginRight: "4%",
                                padding: 8,
                                borderRadius: 20,
                                borderWidth: isDarkMode ? 1 : 2,
                                borderColor: isDarkMode ? "#F5F5F5" : "lightgray",

                            }} >
                            <View
                                style={{
                                    marginLeft: 4,

                                }}
                            >
                                <AntDesign
                                    name="picture"
                                    size={24}
                                    color={isDarkMode ? "#F5F5F5" : "black"}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '300',
                                    color: isDarkMode ? "#F5F5F5" : "black",
                                    marginLeft: "3.5%",
                                    alignSelf: 'center'
                                }}>
                                Multiple choices
                            </Text>


                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <FlatList
                            data={galleryMedia}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleModalImage(item)}
                                    style={{
                                        width: '30%',
                                        aspectRatio: 0.7,
                                        margin: '1%',
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.uri }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            numColumns={3}
                        />

                    </View>
                </View>

            </View>


            <Modal
                visible={showImage}
                transparent={true}
                animationType="slide"
                onRequestClose={closeImageModal}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: isDarkMode ? "black" : "black",
                    width: windowWidth,
                    height: windowHeight
                }}>
                    <View
                        style={{
                            width: "100%",
                            height: 40,
                            marginTop: "12%",
                            justifyContent: "center",
                            position: "absolute",
                            zIndex: 2,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "2%",
                            }}
                            onPress={closeImageModal}
                        >
                            <Entypo name="cross" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                    {selectedImage && !selectedVideo && (

                        <Image
                            source={{ uri: selectedImage.uri }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain"
                            }}
                        />
                    )}

                    {selectedVideo && (

                        <Video
                            source={{ uri: selectedVideo.uri }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay
                            isLooping
                        />

                    )}
                    <View
                        style={{
                            width: "100%",
                            height: "20%",
                            marginTop: "20%",
                            alignItems: "flex-end",
                            position: "absolute",
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handlePress}
                            style={{
                                width: "25%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginRight: "2%",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                    marginRight: 12,
                                    fontWeight: "600",
                                }}
                            >
                                Text
                            </Text>
                            <Ionicons
                                name="text"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: "25%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginRight: "2%",
                                marginTop: "2%",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                    marginRight: 12,
                                    fontWeight: "600",
                                }}
                            >
                                Song
                            </Text>
                            <Ionicons
                                name="musical-notes"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleAddEffect}
                            style={{
                                width: "30%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginRight: "2%",
                                marginTop: "2%",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                    marginRight: 12,
                                    fontWeight: "600",
                                }}
                            >
                                Effects
                            </Text>
                            <Entypo
                                name="adjust"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />
                        </TouchableOpacity>
                    </View>
                    {addText && (
                        <View
                            style={{
                                width: "100%",
                                height: "20%",
                                position: "absolute",
                                justifyContent: "center",
                                padding: 5,
                                bottom: "20%",
                            }}
                        >
                            <TextInput
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    paddingLeft: 12,
                                    fontSize: 10,
                                    fontWeight: "normal",
                                    overflow: "hidden",
                                    color: "white",
                                }}
                                multiline
                                numberOfLines={4}
                                maxLength={40}
                                value={postText}
                                onChangeText={(text) => setPostText(text)}
                                editable
                                placeholder="Leave a short text..."
                                placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                                fontSize="20"
                                color={isDarkMode ? "#F5F5F5" : "white"} />
                        </View>
                    )}
                    {addEffect && (
                        <View
                            style={{
                                width: "100%",
                                height: "20%",
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 5,
                                bottom: "20%",
                            }}
                        >
                            <ImageCustum
                                onSelectEffect={handleSelectEffect}
                                selectedImage={selectedImage}
                                selectedEffect={selectedEffect}
                            />

                        </View>
                    )}
                    <View
                        style={{
                            width: "100%",
                            height: "10%",
                            bottom: "3%",
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingRight: 14,
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleStorySubmit}
                            style={{
                                width: "14%",
                                height: "60%",
                                backgroundColor: "#80BCF3",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                borderRadius: 100,
                                flexDirection: "row",
                                zIndex: 1,
                            }}
                        >
                            <Ionicons
                                name="send"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            <Modal
                visible={showText}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModalText}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: isDarkMode ? "red" : "gray",
                }}>
                    <View
                        style={{
                            width: "100%",
                            height: 40,
                            marginTop: "12%",
                            justifyContent: "center",
                            position: "absolute",
                            zIndex: 2,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "2%",
                            }}
                            onPress={closeModalText}
                        >
                            <Entypo name="cross" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            top: "30%"

                        }}>
                        <TextInput
                            style={{
                                width: "100%",
                                height: "100%",
                                paddingLeft: 12,
                                fontSize: 40,
                                fontFamily: policeActuelle,
                                fontWeight: "normal",
                                overflow: "hidden",
                                color: "white",
                            }}
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            onChangeText={(nouveauText) => setPostText(nouveauText)}
                            value={postText}
                            editable
                            placeholder="Leave a short text..."
                            placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                            fontSize="30"
                            color={isDarkMode ? "#F5F5F5" : "white"} />
                    </View>

                    <View
                        style={{
                            width: "100%",
                            height: "20%",
                            marginTop: "20%",
                            alignItems: "flex-end",
                            position: "absolute",
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            onPress={changerPoliceText}
                            style={{
                                width: "25%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginRight: "2%",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: isDarkMode ? "#F5F5F5" : "#F5F5F5",
                                    marginRight: 12,
                                    fontWeight: "600",
                                }}
                            >
                                Police
                            </Text>
                            <Ionicons
                                name="text"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: "10%",
                            bottom: "5%",
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingRight: 14,
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleStorySubmit}
                            style={{
                                width: "14%",
                                height: "60%",
                                backgroundColor: "#80BCF3",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 100,
                                flexDirection: "row",
                                zIndex: 1,
                            }}
                        >
                            <Ionicons
                                name="send"
                                size={30}
                                color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

        </>


    );
};

export default CreateStory;
