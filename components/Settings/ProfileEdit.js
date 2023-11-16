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
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal } from "react-native";
import { getUser, updateProfile } from "../../actions/user.action";
import { firestore, uploadProfileToFirebase } from "../../Data/FireStore";
import { addDoc, collection, getDoc } from "firebase/firestore";

const ProfileEdit = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [loadUsers, setLoadUSers] = useState(true);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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
    navigation.navigate("Settings");
    setLoadUSers(true);

  };

  const handleSelectImage = async () => {
    try {
      console.log('Ouverture de la bibliothèque de médias...');
      const result = await launchImageLibrary({
        mediaType: 'photo',
        allowsEditing: false,
        quality: 1,
      });

      if (!result.didCancel) {
        if (result.assets && result.assets.length > 0) {
          const selectedAsset = result.assets[0];
          setSelectedImage(selectedAsset);
          setShowImage(true);
          console.log('Image sélectionnée :', selectedAsset);
        }

      } else {
        console.log('Sélection annulée');
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du média :', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sélection du média.');
    }
  };




  const handleUpdateProfile = async () => {
    try {
      let imageUrl = null;

      if (selectedImage) {
        const imageName = `profile-${Date.now()}.${selectedImage.uri.split('.').pop()}`;
        imageUrl = await uploadProfileToFirebase(selectedImage.uri, imageName);
      }

      const updatedProfileData = {
        picture: imageUrl,
      };

      if (updatedProfileData) {
        dispatch(updateProfile(updatedProfileData, userData._id));
        const docRef = await addDoc(collection(firestore, 'profile'), updatedProfileData);
        const docSnapshot = await getDoc(docRef);
        console.log('Profule créée avec succès! Document ID:', docRef.id);
        console.log('Document data:', docSnapshot.data());
        // Effectue d'autres actions si nécessaires
        alert('Profile picture updated successfully');
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




  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <SafeAreaView>
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
                <MaterialIcons name="arrow-back-ios" size={28} color="white" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                fontWeight: "bold",
                marginRight: 10,
              }}
            >
              ProfileEdit
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
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Profil picture
                </Text>
                <TouchableOpacity
                  onPress={handleSelectImage}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "normal",
                      marginRight: 10,
                    }}
                  >
                    Udapte
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
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Bio
                </Text>
                <TouchableOpacity onPress={handleUpdateBio}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
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
                      fontSize: 30,
                      color: "#fff",
                      fontWeight: "normal",
                      marginRight: 10,
                    }}
                  >
                    Describe yourselft...
                  </Text>
                </View>
              </Pressable>
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
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Contact details
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "normal",
                      marginRight: 10,
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: "80%",
                    padding: 4,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#3D3939",
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}
                  >
                    <MaterialIcons name="local-phone" size={30} color="black" />
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
                        color: "#fff",
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
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Générals informations
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "normal",
                      marginRight: 10,
                    }}
                  >
                    Update
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
                      backgroundColor: "#3D3939",
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}
                  >
                    <FontAwesome name="user" size={28} color="black" />
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
                        color: "#fff",
                        fontWeight: "600",
                        marginLeft: 10,
                      }}
                    >
                      Homme
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "gray",
                        fontWeight: "normal",
                        marginLeft: 10,
                      }}
                    >
                      Genre
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
                      backgroundColor: "#3D3939",
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}
                  >
                    <FontAwesome name="birthday-cake" size={24} color="black" />
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
                        color: "#fff",
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
                      Date de naissance
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
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  Locations
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "normal",
                      marginRight: 10,
                    }}
                  >
                    Update
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
                      backgroundColor: "#3D3939",
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}
                  >
                    <MaterialIcons name="location-on" size={30} color="black" />
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
                        color: "#fff",
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
                      Current City
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
                      backgroundColor: "#3D3939",
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                    }}
                  >
                    <MaterialIcons name="location-on" size={30} color="black" />
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
                        color: "#fff",
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
                      Hometown
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>

      </KeyboardAvoidingView>

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
          backgroundColor: "black"
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
          <View
            style={{
              width: "100%",
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImage && (
              <Image
                source={{ uri: selectedImage.uri }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
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
                  color: "white",
                  fontWeight: "500"
                }}
              >
                Upload picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </>

  );
};

export default ProfileEdit;
