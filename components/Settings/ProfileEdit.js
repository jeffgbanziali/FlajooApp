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
import { useDarkMode } from "../Context/AppContext";
import { useTranslation } from 'react-i18next'
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';









const ProfileEdit = () => {
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





  const handleUpdateBio = () => {
    console.log("clicked");
    navigation.navigate("BioUpdate");
  };



  useEffect(() => {
    if (loadUsers) {
      dispatch(getUser(userData._id));
      setLoadUSers(false);
    }
  }, [loadUsers, dispatch]);





  const handleClickReturnProfile = () => {
    console.log("clicked home");
    navigation.goBack("Settings");
    setLoadUSers(true);

  };





  const saveMediaLocally = async (uri, fileName, mediaType) => {
    return new Promise((resolve, reject) => {
      RNFS.copyFile(uri, `${RNFS.DocumentDirectoryPath}/${fileName}`)
        .then(() => {
          console.log(`${mediaType} sauvegardé avec succès !`);
          resolve(`${RNFS.DocumentDirectoryPath}/${fileName}`);
        })
        .catch((error) => {
          console.error(`Erreur lors de la sauvegarde du ${mediaType}.`, error);
          reject(error);
        });
    });
  };




  const handleUpdateProfile = async () => {
    try {
      let imageUrl = null;

      if (selectedImage) {
        const imageName = `profile-${Date.now()}.${selectedImage.path.split('.').pop()}`;
        imageUrl = await uploadProfileToFirebase(selectedImage.path, imageName);
      }
      const updatedProfileData = {
        picture: imageUrl,
      };

      if (updatedProfileData) {
        dispatch(updateProfile(updatedProfileData, userData._id));
        const docRef = await addDoc(collection(firestore, 'profile'), updatedProfileData);
        const docSnapshot = await getDoc(docRef);
        console.log('Profile créée avec succès! Document ID:', docRef.id);
        console.log('Document data:', docSnapshot.data());
        navigation.goBack();
        setLoadUSers(true);
      } else {
        Alert.alert('Error', 'Please select an image to update your profile picture.');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      let errorMessage = 'An error occurred while updating profile picture.';
      Alert.alert('Error', errorMessage);
    }
  };



  const closeImageModal = () => {
    setShowImage(false);
  };



  const handleSelectImage = async () => {
    try {
      console.log('Ouverture de la bibliothèque de médias...');
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });

      if (result.path) {
        setSelectedImage(result);
        setShowImage(true);
        console.log('Image sélectionnée :', result);
      } else {
        console.log('Sélection annulée');
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du média :', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection du média.');
    }
  };



  const toggleProfile = () => {
    if (showTools) {
      Animated.timing(toolsHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setShowTools(false));
    } else {
      setShowTools(true);
      Animated.timing(toolsHeight, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };




  return (

    <>

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? '#0D0C0C' : '#F3F2F2',
        }}
      >
        <View
          style={{
            paddingBottom: 4,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "row",
            borderBottomColor: "gray",
            borderBottomWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
                name="arrow-back-ios"
                size={28}
                color={isDarkMode ? "white" : "black"}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              color: isDarkMode ? "white" : "black",
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {t('ProfileEdit')}
          </Text>
        </View>


        <ScrollView
          vertical
          howsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 250,
              flexDirection: "column",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {t('Profile-picture')}
              </Text>
              <TouchableOpacity
                onPress={handleSelectImage}>
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,
                  }}
                >
                  {t('Update')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
                padding: 4,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={handleSelectImage}>
                <Image
                  source={{
                    uri: userData?.picture
                      ? userData.picture
                      : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                  }}
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 120,
              flexDirection: "column",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "600",
                  marginLeft: 10,
                }}
              >
                Bio
              </Text>
              <TouchableOpacity onPress={handleUpdateBio}>
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,
                  }}
                >
                  To Add
                </Text>
              </TouchableOpacity>
            </View>
            <Pressable onPress={handleUpdateBio}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "85%",
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,
                  }}
                >
                  {t('describle')}
                </Text>
              </View>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 160,
              flexDirection: "column",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "600",
                  marginLeft: 10,
                }}
              >
                {t('Contact-details')}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,

                  }}
                >
                  {t('Update')}
                </Text>
              </TouchableOpacity>
            </View>

            
            <TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                  padding: 4,
                }}
              >

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginLeft: 10,
                  }}
                >
                  <MaterialIcons
                    name="local-phone"
                    size={30}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "600",
                      marginLeft: 10,
                    }}
                  >
                    {userData.phoneNumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      fontWeight: "normal",
                      marginLeft: 10,
                    }}
                  >
                    Mobile
                  </Text>
                </View>

              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 60,
                  padding: 4,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginLeft: 10,
                  }}
                >
                  <MaterialIcons
                    name="email"
                    size={30}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "400",
                      marginLeft: 10,
                    }}
                  >
                    {userData.email}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>


          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 200,
              flexDirection: "column",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "600",
                  marginLeft: 10,
                }}
              >
                {t('Genarals-infos')}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,
                  }}
                >
                  {t('Update')}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <FontAwesome
                    name="user"
                    size={28}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "600",
                      marginLeft: 10,
                    }}
                  >
                    {t('Gender-ma')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      fontWeight: "normal",
                      marginLeft: 10,
                    }}
                  >
                    {userData.gender}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>


            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <FontAwesome
                    name="birthday-cake"
                    size={24}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "600",
                      marginLeft: 10,
                    }}
                  >
                    11 Juillet 2001
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      fontWeight: "normal",
                      marginLeft: 10,
                    }}
                  >
                    {t('Day-birth')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
              width: "100%",
              height: 200,
              flexDirection: "column",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "600",
                  marginLeft: 10,
                }}
              >
                Locations
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? "white" : "black",
                    fontWeight: "normal",
                    marginRight: 10,
                  }}
                >
                  {t('Update')}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <MaterialIcons
                    name="location-on"
                    size={30}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "600",
                      marginLeft: 10,
                    }}
                  >
                    Paris
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      fontWeight: "normal",
                      marginLeft: 10,
                      marginTop: 2,
                    }}
                  >
                    {t('City')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                  }}
                >
                  <MaterialIcons
                    name="location-on"
                    size={30}
                    color={isDarkMode ? "white" : "black"} />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isDarkMode ? "white" : "black",
                      fontWeight: "600",
                      marginLeft: 10,
                    }}
                  >
                    Longjumeau
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "gray",
                      fontWeight: "normal",
                      marginLeft: 10,
                      marginTop: 2,
                    }}
                  >
                    {t('City')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </SafeAreaView>


      <Modal
        visible={showImage}
        transparent={true}
        animationType="slide"
        onRequestClose={closeImageModal}
      >
        <View style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black"
        }}>

          <View
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: 400
            }}
          >
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.path }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 400
                }}
              />
            )}
          </View>
          <View
            style={{
              width: "100%",
              height: "10%",
              bottom: "18%",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 14,
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={{
                width: "40%",
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
              <Text
                style={{
                  fontSize: 18,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "500"
                }}
              >
                {t('Upload ')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: "60%",
                backgroundColor: "#FF0F0F",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                borderRadius: 100,
                marginTop: "5%",
                flexDirection: "row",
                zIndex: 1,
              }}
              onPress={closeImageModal}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: isDarkMode ? "white" : "black",
                  fontWeight: "500"
                }}
              >
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </>

  );
};

export default ProfileEdit;
