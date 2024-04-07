import React, { useContext, useEffect, useRef, useState, } from "react";
import {
  View,
  Text,
  Animated,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { formatPostDate, isEmpty } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import LikeStoriesButton from "../LikeStoriesButton";
import { LinearGradient } from "react-native-linear-gradient";
import Video from 'react-native-video';
import AddStoryComment from "./AddStoryComment";
import { getStories } from "../../../../actions/story.action";
import { useTranslation } from "react-i18next";
import StoryByMediaAndText from "./StoryByMediaAndText";
import StoryByMedia from "./StoryByMedia";
import StoryByText from "./StoryByText";







const { width } = Dimensions.get("window")

const StoriesStream = () => {
  const navigation = useNavigation(false);
  const { isDarkMode } = useDarkMode();
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [partVisible, setPartVisible] = useState(true);
  const { i18n, t } = useTranslation()
  const [loadStories, setLoadStories] = useState(true);
  const storiesData = useSelector((state) => state.storyReducer);


  console.log("le container que j'ai choisi", storiesData)


  const usersData = useSelector((state) => state.usersReducer);
  console.log(id);
  const [selectedStory, setSelectedStory] = useState(storiesData.find((story) => story.container.stories.some((s) => s._id === id)));
  storiesData.find((story) => story.container.stories.some((s) => s._id === id));

  const user = usersData.find((user) => user._id === selectedStory.container.posterId);
  console.log(user);

  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    selectedStory.container.stories.findIndex((story) => story._id === id)
  );

  const [currentContainerIndex, setCurrentContainerIndex] = useState(
    storiesData.findIndex((story) => story === selectedStory)
  );

  useEffect(() => {
    if (loadStories) {
      dispatch(getStories());
      setLoadStories(false);
    }
  }, [loadStories, dispatch]);


  const goToHome = () => {
    console.log("clicked");
    setLoadStories(true);
    navigation.navigate("TabNavigation",);
  };

  const goProfil = (id) => {
    navigation.navigate("ProfilFriends", { id });
  };

  const goToNextStory = () => {
    try {
      if (selectedStory && selectedStory.container && selectedStory.container.stories) {
        const totalStories = selectedStory.container.stories.length;

        if (currentStoryIndex < totalStories - 1) {
          // Passer à l'histoire suivante dans le même conteneur
          const nextStoryIndex = currentStoryIndex + 1;
          const nextStory = selectedStory.container.stories[nextStoryIndex];

          console.log('Next Story:', nextStory);

          setCurrentStoryIndex(nextStoryIndex);
          resetAnimation();
        } else {
          console.log('No next container. Navigating to TabNavigation.');
          goToNextContainer();
        }
      } else {
        console.error('Invalid story or container.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToNextContainer = () => {
    try {
      if (selectedStory) {
        const totalContainers = storiesData.length;

        if (currentContainerIndex < totalContainers - 1) {
          // Passer au conteneur suivant
          const nextContainerIndex = currentContainerIndex + 1;
          const nextContainer = storiesData[nextContainerIndex];

          // Mettre à jour l'histoire sélectionnée et l'index du conteneur
          setSelectedStory(nextContainer);
          setCurrentContainerIndex(nextContainerIndex);

          // Réinitialiser l'index de l'histoire
          setCurrentStoryIndex(0);
          // Réinitialiser l'animation si nécessaire
          resetAnimation();

        } else {
          console.log('Navigating to TabNavigation.');
          navigation.navigate("TabNavigation");
        }
      } else {
        console.error('Invalid selected story.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const createdAt = selectedStory.container.stories[currentStoryIndex]?.createdAt;




  const handleNextStoryButtonPress = () => {
    goToNextStory();

  };
  const handlePrevStoryButtonPress = () => {
    goToPrevStory();
  };


  const progressAnimation = useRef(new Animated.Value(0)).current;


  const start = () => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 50000000000000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory();

      }
    });
  };

  const resetAnimation = () => {
    progressAnimation.setValue(0);
  };



  useEffect(() => {
    resetAnimation();
    start();

  });

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


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black"
      }}
    >


      <View
        style={{
          flex: 1,
          height: "100%",
          width: width,
          position: "relative",
          alignItems: "center",
          backgroundColor: "black"
        }}
      >

        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Pressable
          onPress={handlePrevStoryButtonPress}
          style={{
            flex: 1,
            height: "65%",
            marginTop: "30%",
            width: "30%",
            position: "absolute",
            left: 0,
            overflow: "hidden",
            zIndex: 2
          }}
        >
        </Pressable>

        <Pressable
          style={{
            flex: 1,
            height: "65%",
            marginTop: "30%",
            width: "30%",
            position: "absolute",
            right: 0,
            overflow: "hidden",
            zIndex: 2
          }}
          onPress={handleNextStoryButtonPress}>
        </Pressable>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            height: "2%",
            alignItems: "center",
            justifyContent: "space-evenly ",
            alignItems: "center",
            position: "absolute",
            marginTop: "3%",
            zIndex: 2
          }}
        >
          <TouchableOpacity onPress={goToHome}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              //backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="close" size={35} color="white" />

          </TouchableOpacity>

          <View
            style={{
              width: '86%',
              justifyContent: "space-evenly ",
              alignItems: "center",
              flexDirection: "row",

            }}
          >
            {selectedStory.container.stories.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 3,
                  marginLeft: "1%",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  flexDirection: "row",
                  borderRadius: 20,

                }}
              >
                <Animated.View
                  style={{
                    height: 3,
                    borderRadius: 20,
                    flex: currentStoryIndex === index ? progressAnimation : selectedStory.container.stories[index].finish,
                    backgroundColor: "white",
                  }}
                ></Animated.View>
              </View>
            ))}

          </View>


        </View>


        <View
          style={{
            flex: 1,
            flexDirection: "row",
            position: "absolute",
            width: "100%",
            justifyContent: "space-between",
            //backgroundColor: "blue",
            alignItems: "center",
            height: 30,
            paddingLeft: "5%",
            top: "4%",
            zIndex: 1

          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "white",
              paddingLeft: "12%"
            }}
          >
            {!isEmpty(usersData[0]) &&
              usersData.map((user) => {
                if (user._id === selectedStory.container.posterId) return user.pseudo;
                else return null;
              })}
          </Text>



          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "4%"
            }}
          >
            <View
              style={{
                height: 30,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
              }}
            >
              <FontAwesome5 name="clock" size={14} color="white" />
              <Text
                style={{
                  marginLeft: 6,
                  color: "white",
                  fontSize: 12
                }}
              >
                {formatPostDate(createdAt, t)}
              </Text>
            </View>




            <TouchableOpacity onPress={() => goProfil(user._id)}>
              <View
                style={{
                  marginLeft: 10,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri:
                      !isEmpty(usersData) &&
                      usersData
                        .map((user) => {
                          if (user._id === selectedStory.container.posterId)
                            return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                          else return null;
                        })
                        .join(""),
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 30,
                  }}
                />
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <StoryByMediaAndText
          story={selectedStory.container.stories[currentStoryIndex]}
          progressAnimation={progressAnimation}
          start={start} />

        <StoryByMedia
          story={selectedStory.container.stories[currentStoryIndex]}
          progressAnimation={progressAnimation}
          start={start} />

        <StoryByText
          story={selectedStory.container.stories[currentStoryIndex]}
          progressAnimation={progressAnimation}
          start={start}
        />


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            height: 480,
            flexDirection: "row",
            position: "absolute",
            //backgroundColor: "red",
            bottom: 0,
            alignItems: "flex-end",

          }}
        >

          <View
            style={{
              //backgroundColor: "green",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <AddStoryComment story={selectedStory.container.stories[currentStoryIndex]} />
            <View
              style={{
                width: 50,
                height: 50,
                marginLeft: 2,
                marginRight: 4,
                //backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3

              }}
            >
              <LikeStoriesButton
                story={selectedStory.container?.stories[currentStoryIndex]}
              />
            </View>
          </View>

        </KeyboardAvoidingView>
      </View>

    </SafeAreaView>
  );
};

export default StoriesStream;
