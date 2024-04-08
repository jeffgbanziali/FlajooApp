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
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { formatPostDate, isEmpty } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import LikeStoriesButton from "./LikeStoriesButton";
import AddStoryComment from "./AddStoryComment";
import { getStories, viewStory } from "../../../../actions/story.action";
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
  const { uid } = useContext(UidContext);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation()
  const [loadStories, setLoadStories] = useState(true);
  const storiesData = useSelector((state) => state.storyReducer);

  const usersData = useSelector((state) => state.usersReducer);


  const [selectedStory, setSelectedStory] = useState(storiesData.find((story) =>
    story.container.stories.some((s) => s._id === id)));
  storiesData.find((story) => story.container.stories.some((s) => s._id === id));

  const user = usersData.find((user) =>
    user._id === selectedStory.container.posterId);


  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    selectedStory.container.stories.findIndex((story) => story._id === id)
  );



  const [currentContainerIndex, setCurrentContainerIndex] = useState(
    storiesData.findIndex((story) => story === selectedStory)
  );



  const goToPrevStory = () => {
    try {
      if (selectedStory && selectedStory.container && selectedStory.container.stories && selectedStory.container.posterId !== uid) {
        setCurrentStoryIndex((prevIndex) => {
          if (prevIndex > 0) {
            registerView();
            return prevIndex - 1;
          } else {
            console.log('Already at the first story.');
            goToPrevContainer();
            return prevIndex;
          }
        });
        resetAnimation();
      } else {
        console.error('Invalid story or container.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const goToNextStory = () => {
    try {
      if (selectedStory && selectedStory.container && selectedStory.container.stories && selectedStory.container.posterId !== uid) {
        setCurrentStoryIndex((prevIndex) => {
          const totalStories = selectedStory.container.stories.length;
          if (prevIndex < totalStories - 1) {
            registerView();
            return prevIndex + 1;
          } else {
            console.log('No next container. Navigating to TabNavigation.');
            registerView();
            goToNextContainer();
            return prevIndex;
          }
        });
        resetAnimation();
      } else {
        console.error('Invalid story or container.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const goToNextContainer = () => {
    setCurrentContainerIndex((index) => {
      if (index === storiesData.length - 1) {
        navigation.navigate("TabNavigation");
        return 0;
      }

      return index + 1;
    });
  };




  const goToPrevContainer = () => {
    setCurrentContainerIndex((index) => {
      if (index === 0) {
        
        return storiesData.length - 1;
      }
      navigation.navigate("TabNavigation");
      return index - 1;

    });
  };



  /* const goToNextContainer = () => {
     try {
       if (selectedStory && selectedStory.container.posterId !== uid) {
         const totalContainers = storiesData.length &&
           selectedStory.container.posterId !== uid;
 
         if (currentContainerIndex < totalContainers - 1) {
           const nextContainerIndex = currentContainerIndex + 1;
           const nextContainer = storiesData[nextContainerIndex];
 
           setSelectedStory(nextContainer);
           setCurrentContainerIndex(nextContainerIndex);
           registerView();
           setCurrentContainerIndex(0);
           resetAnimation();
         } else {
           console.log('Navigating to TabNavigation.');
           registerView();
           navigation.navigate("TabNavigation");
         }
       } else {
         console.error('Invalid selected story or posterId.');
       }
     } catch (error) {
       console.error('Error:', error);
     }
   };
 
 
 
 
   const goToPrevContainer = () => {
     try {
       if (selectedStory &&
         selectedStory.container.posterId !== uid) {
 
 
         if (currentContainerIndex > 0
           && selectedStory.container.posterId !== uid) {
           const prevContainerIndex = currentContainerIndex - 1;
           const prevContainer = storiesData[prevContainerIndex];
 
           setSelectedStory(prevContainer);
           setCurrentContainerIndex(prevContainerIndex);
           registerView();
           setCurrentContainerIndex(0);
           resetAnimation();
         } else {
           console.log('Already at the first container.');
           navigation.navigate("TabNavigation");
         }
       } else {
         console.error('Invalid selected story or posterId.');
       }
     } catch (error) {
       console.error('Error:', error);
     }
   };*/





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



  const registerView = () => {
    dispatch(
      viewStory(
        storiesData[currentContainerIndex]._id,
        selectedStory.container.stories[currentStoryIndex]._id,
        uid
      ));
  }



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
      duration: 5000,
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

  }, [currentStoryIndex, currentContainerIndex]);



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
            justifyContent: "space-evenly",
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
              justifyContent: "space-evenly",
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
                  style={[
                    {
                      height: 3,
                      borderRadius: 20,
                      flex: index === currentStoryIndex ? progressAnimation : 0,
                      width: index < currentStoryIndex ? '100%' : (index > currentStoryIndex ? 0 : null),
                      backgroundColor: "white",
                    },
                  ]}
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
            paddingLeft: "4%",
            top: "4%",
            zIndex: 1

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
            <Text
              style={{
                marginRight: 6,
                color: "white",
                fontSize: 12
              }}
            >
              {formatPostDate(createdAt, t)}
            </Text>
            <TouchableOpacity onPress={goToHome}
              style={{
                height: 30,
                width: 30,
                borderRadius: 20,
                //backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="dots-three-horizontal" size={20} color="white" />

            </TouchableOpacity>
          </View>



          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "4%"
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

    </SafeAreaView >
  );
};

export default StoriesStream;
