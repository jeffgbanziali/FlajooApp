import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';
import { getStories } from "../../../../actions/story.action";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "react-native-linear-gradient";
import { useDarkMode } from "../../../Context/AppContext";

const MyStory = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loadStories, setLoadStories] = useState(true);
  const userStories = useSelector((state) => state.storyReducer).filter(item => item.container.posterId === userData._id);
  const { isDarkMode } = useDarkMode();

  const { t } = useTranslation()


  const handleCreateStory = () => {
    console.log("Create Story");
    navigation.navigate("StoryCreate");
  };

  const handleViewStory = (id, media_type) => {
    console.log("Clicked story ID:", id);
    setLoadStories(true);
    navigation.navigate("StoryStreamUser", { id, media_type });
  };


  useEffect(() => {
    if (loadStories) {
      dispatch(getStories());
      setLoadStories(false);
    }
  }, [loadStories, dispatch]);



  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: 100,
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: isDarkMode ? "#171717" : "white",
        borderRadius: 10,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
      }}
    >


      {
        userStories.length > 0 ? (
          <View>
            {
              userStories.map((item) => (

                <View
                  key={item}

                >
                  <TouchableOpacity
                    onPress={() => {
                      const storyId = item.container.stories[0]._id;
                      const mediaType = item.container.stories[0].media_type;
                      handleViewStory(storyId, mediaType);
                    }}
                  >
                    {item.container.stories && item.container.stories.length > 0 && item.container.stories[item.container.stories.length - 1].media && (


                      <View
                        style={{
                          backgroundColor: isDarkMode ? "#171717" : "white",
                          borderRadius: 10,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.4,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      >
                        {item.container.stories[item.container.stories.length - 1].media_type === "image" && (
                          <Image
                            source={{ uri: item.container.stories[item.container.stories.length - 1].media.url }}
                            style={{
                              width: 100,
                              height: 140,
                              borderRadius: 10,
                              resizeMode: "cover",
                            }}
                          />
                        )}
                        {item.container.stories[item.container.stories.length - 1].media_type === "video" && (
                          <Video
                            source={{ uri: item.container.stories[item.container.stories.length - 1].media.url }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={true}
                            isLooping
                            resizeMode="cover"
                            paused={true}
                            style={{
                              width: 100,
                              height: 140,
                              borderRadius: 10,
                            }}
                          />
                        )}
                      </View>
                    )}
                    {item.container.stories && item.container.stories.length > 0 && !item.container.stories[item.container.stories.length - 1].media.url && (
                      <View
                        style={{
                          width: 100,
                          height: 140,
                          borderRadius: 10,
                          padding: 5,
                          backgroundColor: "#1E0F1C",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            fontWeight: "600",
                            marginTop: 10,
                          }}
                        >
                          {item.container.stories[item.container.stories.length - 1].text}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))}

            <View
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: "5%",
                left: 0,
                right: 0,
              }}
            >
              <TouchableOpacity
                onPress={handleCreateStory}
                style={{
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo
                    name="circle-with-plus"
                    size={30}
                    color="blue"

                  />
                </View>

              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={handleCreateStory}>

              <View
                style={{
                  width: 100,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Image
                  source={{ uri: userData.picture ? userData.picture : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    resizeMode: "cover",
                  }}
                />
              </View>


              <View
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 2,
                  marginTop: 70,
                }}
              >
                <View
                  style={{
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      width: 25,
                      height: 25,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="circle-with-plus"
                      size={25}
                      color="blue"

                    />
                  </View>

                  <View
                    style={{
                      marginTop: 6,

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {t('CreateStory')}
                    </Text>
                  </View>


                </View>



              </View>


              <LinearGradient
                colors={["transparent", isDarkMode ? "black" : "#0F0F0F"]}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />
            </TouchableOpacity>
          </>
        )
      }


    </View>
  );
};

export default MyStory;
