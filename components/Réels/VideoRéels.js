import React, { useContext, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView
} from "react-native";
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getVideoReels } from "../../actions/réels.action";
import { isEmpty } from "../Context/Utils";
import { useNavigation } from "@react-navigation/native";
import { UidContext, useDarkMode } from "../Context/AppContext";
import RéelsComment from "./RéelsComments/RéelsComment";
import LikeRéelsButton from "./LikeButton/LikeRéelsButton";
import RéelsAnimation from "./RéelsAnimation";
import { LinearGradient } from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import AddCommentButton from "./RéelsComments/AddButtom/AddCommentButton"
import AddReplyToReply from "./RéelsComments/AddButtom/AddReplyToReply"
import AddReplyComment from "./RéelsComments/AddButtom/AddReplyComment"









const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const VideoRéels = ({ réels, isActive }) => {
  const video = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [lastViewedVideo, setLastViewedVideo] = useState(0);
  const [status, setStatus] = useState({});
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsHeight, setCommentsHeight] = useState(new Animated.Value(0));
  const [loadPosts, setLoadPosts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showToolings, setShowToolings] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedReply, setSelectedReply] = useState(null);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const navigation = useNavigation();
  const { uid } = useContext(UidContext);
  const usersData = useSelector((state) => state.usersReducer);
  const [response, setResponse] = useState(false)
  const [responseToResponse, setResponseToResponse] = useState(false)
  const [partVisible, setPartVisible] = useState(true);




  useEffect(() => {
    if (loadPosts) {
      dispatch(getVideoReels());
      setLoadPosts(false);
    }
  }, [loadPosts, dispatch]);

  useEffect(() => {
    !isEmpty(usersData) && setLoading(false);
  }, [usersData]);

  const goProfil = (id) => {
    if (uid === id) {
      console.log("go to my profil", id);
      navigation.navigate("Profile", { id });
    } else {
      navigation.navigate("ProfilFriends", { id });
      console.log("go to profile friends", id);
    }
  };

  const toggleComments = () => {
    if (showComments) {
      Animated.timing(commentsHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setShowComments(false));
    } else {
      setShowComments(true);
      Animated.timing(commentsHeight, {
        toValue: 200, // Hauteur souhaitée du composant de commentaires
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleVideoLoad = async () => {
    await video.current.playAsync();
    setIsVideoPlaying(true);
  };




  const answer = (comment) => {
    setResponse(!response);
    setResponseToResponse(false);
    setSelectedComment(comment);
  };

  const toReplying = (comment, reply) => {
    setResponseToResponse(!responseToResponse);
    setResponse(false);
    setSelectedComment(comment);
    setSelectedReply(reply);
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Le clavier est ouvert, masquez votre partie
        setPartVisible(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Le clavier est fermé, affichez votre partie
        setPartVisible(true);
      }
    );

    // Nettoyez les écouteurs lorsque le composant est démonté
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
 
  


  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };


  const musicNoteAnimation1 = RéelsAnimation(musicNoteAnimatedValue1, false);
  const musicNoteAnimation2 = RéelsAnimation(musicNoteAnimatedValue2, true);



  const discAnimLoopRef = useRef();
  const musicAnimLoopRef = useRef();






  const triggerAnimation = useCallback(() => {
    discAnimLoopRef.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    discAnimLoopRef.current.start();
    musicAnimLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    );
    musicAnimLoopRef.current.start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);




  useEffect(() => {
    if (isActive) {
      triggerAnimation();
    } else {
      discAnimLoopRef.current?.stop();
      musicAnimLoopRef.current?.stop();
      discAnimatedValue.setValue(0);
      musicNoteAnimatedValue1.setValue(0);
      musicNoteAnimatedValue2.setValue(0);
    }
  }, [
    isActive,
    triggerAnimation,
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
  ]);

  const { t } = useTranslation();


  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <>
      <View
        style={{
          width: windowWidth,
          height: windowHeight - bottomTabHeight,
        }}
      >
        <LinearGradient
          colors={[isDarkMode ? "black" : "#4F4F4F", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            height: 100,
          }}
        />
        <Video
          ref={video}
          source={{ uri: réels.videoPath }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          resizeMode="cover"
          isLooping
          shouldPlay={isVideoPlaying}
          repeat
          paused={true}
          //paused={!isActive}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onLoad={handleVideoLoad}
          onError={(error) => console.error("Erreur de lecture vidéo :", error)}
        />
        <LinearGradient
          colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            width: "100%",
            height: "74%",
            alignItems: "center",
            zIndex: 1,
            justifyContent: "center",
            marginTop: 110,
          }}
        >
          <FontAwesome5
            name={isVideoPlaying ? "pause" : "play"}
            size={60}
            color="white"
          />
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            height: 60,
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 100,
            flexDirection: "row",
            zIndex: 2,
            top: 50,
            position: "absolute",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => goProfil(réels.posterId)}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "100%",
                  flexDirection: "row",
                  marginLeft: 20,
                }}
              >
                <Image
                  source={{
                    uri:
                      !isEmpty(usersData) &&
                      usersData
                        .map((user) => {
                          if (user._id === réels.posterId) return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                          else return null;
                        })
                        .join(""),
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                borderRadius: 100,
                marginLeft: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                {!isEmpty(usersData[0]) &&
                  usersData.map((user) => {
                    if (user._id === réels.posterId) return user.pseudo;
                    else return null;
                  })}
              </Text>
              <Text style={{ color: "white" }}>Bonjour</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              borderRadius: 20,
              marginRight: 20,
              padding: 6,
            }}
          >
            <EvilIcons name="eye" size={24} color="white" />
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 16,
                marginLeft: 6,
              }}
            >
              {réels.viewers.length}
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            width: "100%",
            paddingHorizontal: 8,
            paddingBottom: 16,
            zIndex: 4
          }}
        >
          <View style={{ flex: 4 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {réels.description}
            </Text>
            <Text
              style={{
                color: "white",
                marginVertical: 8,
              }}
            >
              {réels.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="music-circle"
                  size={40}
                  color="black"
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {réels.title}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "pink",
                borderRadius: 100,
              }}
            >
              <Animated.Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/651/651799.png",
                }}
                style={[{
                  position: "absolute",
                  right: 40,
                  bottom: 16,
                  width: 16,
                  height: 16,
                  tintColor: "white",
                }, musicNoteAnimation1]}
              />
              <Animated.Image

                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/651/651799.png",
                }}
                style={[{
                  position: "absolute",
                  right: 40,
                  bottom: 16,
                  width: 16,
                  height: 16,
                  tintColor: "white",
                }, musicNoteAnimation2]}
              />
              <Animated.Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Disque_Vinyl.svg/1200px-Disque_Vinyl.svg.png",
                }}
                style={[{
                  display: "flex",
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "pink",
                  borderRadius: 100,
                }, discAnimation]}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          right: 8,
          bottom: 160,
        }}
      >
        <View
          style={{
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <LikeRéelsButton réels={réels} />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {réels.likers.length}
          </Text>
        </View>

        <View
          style={{
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => toggleComments(réels)}>
            <View
              style={{
                display: "flex",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <AntDesign name="message1" size={35} color="white" />
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {réels.comments.length}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <MaterialCommunityIcons
              name="music-circle"
              size={40}
              color="black"
            />
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            like
          </Text>
        </View>
      </View>



       <Modal
        isVisible={showComments}
        onBackdropPress={toggleComments}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriverForBackdrop
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: isDarkMode ? "#171717" : "white",
            height: "85%",
            height: isKeyboardActive ? "auto" : "85%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <SafeAreaView>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: isDarkMode ? "#343232" : "lightgray",
                height: "6%",
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? "#F5F5F5" : "black",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {réels.comments.length + réels.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)} {t('PostsComment')}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "78%",
                borderTopWidth: 1,
                paddingBottom: 10,
                backgroundColor: isDarkMode ? "#171717" : "white",
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              <RéelsComment réels={réels} toggle={toggleComments} toAnswering={answer} toReplying={toReplying} />

            </View>
            <View
              style={{
                width: "100%",
                height: "16%",
                //backgroundColor: "gray",
                borderTopWidth: 1,
                justifyContent: "center",
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              {response ? (
                <>
                  <AddReplyComment
                    réels={réels}
                    selectedComment={selectedComment}
                    partVisible={partVisible}
                  />

                </>

              ) : responseToResponse ?
                (
                  <>
                    <AddReplyToReply
                      réels={réels}
                      selectedComment={selectedComment}
                      selectedReply={selectedReply}
                      partVisible={partVisible}
                    />
                  </>

                ) : (
                  <>
                    <AddCommentButton
                      réels={réels}
                      partVisible={partVisible}
                    />
                  </>

                )

              }
            </View>

          </SafeAreaView>

        </KeyboardAvoidingView>
      </Modal >
    </>
  );
};

export default VideoRéels;
