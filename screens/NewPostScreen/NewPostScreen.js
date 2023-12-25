import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Dimensions, Image, SafeAreaView, Modal, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, getPosts } from '../../actions/post.actions';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { uploadImageToFirebase } from '../../Data/FireStore';
import { collection, addDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../Data/FireStore';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import { FlatList } from 'react-native';



const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const NewPostScreen = () => {
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedMediaArray, setSelectedMediaArray] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [addText, setAddText] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(false);
    const [loadPost, setLoadPost] = useState(true);
    const { isDarkMode } = useDarkMode();

    const { t } = useTranslation();

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);
    const handleClickReturnHome = () => {
        navigation.navigate('TabNavigation');
    };
    const handleTakePicture = () => {
        navigation.navigate('Photo');
    };




    const processMedia = async (selectedMedia) => {
        let mediaType = null;

        if (selectedMedia.type.includes('image')) {
            mediaType = 'image';
        } else if (selectedMedia.type.includes('video')) {
            mediaType = 'video';
        }

        if (mediaType) {
            const mediaName = `${mediaType}-${Date.now()}.${selectedMedia.uri.split('.').pop()}`;
            const mediaUrl = await uploadImageToFirebase(selectedMedia.uri, mediaName, mediaType);
            return {
                mediaUrl,
                mediaType,
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
        try {
            let mediaArray = [];

            if (selectedMediaArray.length > 0) {
                mediaArray = await Promise.all(selectedMediaArray.map(processMedia));
                mediaArray = mediaArray.filter(Boolean); // Filtre les valeurs null
            }

            const postData = {
                posterId: userData._id,
                message: postText,
                media: mediaArray,
            };

            if ((postText && mediaArray.length > 0) || (!postText && mediaArray.length > 0) || (postText && !mediaArray.length)) {
                dispatch(addPosts(postData));

                const docRef = await addDoc(collection(firestore, 'posts'), postData);
                const docSnapshot = await getDoc(docRef);

                console.log('Post créé avec succès! Document ID:', docRef.id);
                console.log('Document data:', docSnapshot.data());
                Alert.alert('Succès', 'Votre post a été publié avec succès !');
                setPostText('');
                setSelectedImage(null);
                setLoadPost(true);
                navigation.goBack('TabNavigation');
            } else {
                Alert.alert('Erreur', 'Veuillez fournir du texte, du média, ou les deux pour publier une histoire.');
            }
        } catch (error) {
            handlePostSubmitError(error);
        }
    };




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

    console.log('Image sélectionnée :', selectedMediaArray);



    const handlePress = () => {
        setAddText(!addText);
    };

    const closeImageModal = () => {
        setShowImage(false);
    };

    return (



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
                        padding: 6
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
                                marginLeft: "3.5%"
                            }}>
                            <View>
                                <AntDesign
                                    name="arrowleft"
                                    size={25}
                                    color={isDarkMode ? "#F5F5F5" : "black"}
                                    style={{
                                        alignSelf: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        resizeMode: "contain"
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
                                height: 40,
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
                <View style={{
                    flex: 1,
                    width: "100%"
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginLeft: "3.5%"
                    }}>
                        <View style={{
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

                    <SafeAreaView>
                        <View
                            style={{
                                width: "100%",
                                height: "5%",
                                justifyContent: "center",
                                //backgroundColor: "blue",
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

                        <FlatList
                            horizontal
                            data={selectedMediaArray}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        width: windowWidth,
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        //backgroundColor: "red"
                                    }}
                                >
                                    {(item.type === 'image/jpg' || item.type === 'image/png') && (
                                        <Image
                                            source={{ uri: item.uri }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                resizeMode: "contain"
                                            }}
                                        />
                                    )}
                                    {(item.type === 'video/mp4' || item.type === "video/mp3") && (
                                        <Video
                                            source={{ uri: item.uri }}
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
                                </View>
                            )}
                        />


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
                                    {t('Text')}
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
                                    {t('Song')}
                                </Text>
                                <Ionicons
                                    name="musical-notes"
                                    size={30}
                                    color={isDarkMode ? "#F5F5F5" : "#F5F5F5"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
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
                                    {t('Effects')}
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
                                    placeholder={t('TextInputStory')}
                                    placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                                    fontSize={20}
                                    color={isDarkMode ? "#F5F5F5" : "white"} />
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
                                onPress={handlePostSubmit}
                                style={{
                                    width: 100,
                                    height: 40,
                                    backgroundColor: isDarkMode ? "#E52C2C" : "#2B60E8",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 15,
                                    flexDirection: "row",
                                    zIndex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: "white"
                                    }}>
                                    {t('AddPost')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
};

export default NewPostScreen;
