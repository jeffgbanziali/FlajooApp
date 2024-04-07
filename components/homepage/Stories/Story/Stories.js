import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { getStories, viewStory } from "../../../../actions/story.action";
import MyStory from "./MyStory";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../../Context/Utils";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import Video from 'react-native-video';

const Stories = () => {
  const [loadStories, setLoadStories] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation(false)
  const usersData = useSelector((state) => state.usersReducer);
  const { isDarkMode } = useDarkMode();
  const { uid } = useContext(UidContext);


  const storiesData = useSelector((state) => state.storyReducer).map((story, index) => ({
    ...story,
    container: {
      ...story.container,
      index: index,
    },
  }));

  const container = useSelector((state) => state.storyReducer)






  useEffect(() => {
    if (loadStories) {
      dispatch(getStories());
      setLoadStories(false);
    }
  }, [loadStories, dispatch]);




  useEffect(() => {
    !isEmpty(usersData) && setLoading(false);
  }, [usersData]);





  const filteredStories = storiesData.filter(item => item.container.posterId !== uid);







  const renderItem = ({ item }) => {




    const registerView = () => {
      dispatch(
        viewStory(
          item._id,
          item.container.stories[0]._id,
          uid
        ));

    }

    const handleViewStory = (storyId, mediaType) => {
      navigation.navigate("StoryStream",
        { id: storyId, mediaType })
      registerView()
      setLoadStories(true)


    }




    /* console.log("viens à moi mon container", item._id)
     console.log("viens à moi ma story", item.container.stories[0]._id)
     console.log("viens à moi mon id", uid)*/


    return (

      <View key={item._id}>


        <TouchableOpacity
          onPress={() =>
            handleViewStory(
              item.container.stories[0]._id,
              item.container.stories[0].media_type
            )}

        >
          {item.container.stories && item.container.stories.length > 0 && item.container.stories[item.container.stories.length - 1].media && (
            <View
              style={{
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
                  source={{ uri: item.container.stories[item.container.stories.length - 1].media }}
                  style={{
                    width: 100,
                    height: 140,
                    borderRadius: 10,
                    marginLeft: 10,
                    resizeMode: "cover",
                  }}
                />
              )}
              {item.container.stories[item.container.stories.length - 1].media_type === "video" && (
                <Video
                  source={{ uri: item.container.stories[item.container.stories.length - 1].media }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  isLooping
                  paused={true}
                  style={{
                    width: 100,
                    height: 140,
                    borderRadius: 10,
                    marginLeft: 10,
                  }}
                />
              )}


            </View>
          )}

          {item.container.stories && item.container.stories.length > 0 && !item.container.stories[item.container.stories.length - 1].media && (
            <View
              style={{
                width: 100,
                height: 140,
                borderRadius: 10,
                padding: 5,
                backgroundColor: "#1E0F1C",
                marginLeft: 10,
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


        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: -70,
          }} ƒ
        >
          <Image
            source={{
              uri:
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === item.container.posterId) {
                      return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                    }
                    else
                      return null;
                  })
                  .join(""),
            }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: "#3B4FB8",
              marginLeft: 10,
              resizeMode: "cover",
              position: "relative",
            }}
          />
          <View
            style={{
              borderRadius: 30,
              marginLeft: 60,
              marginTop: -28,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#09C03C",
                width: 12,
                height: 12,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: "#000000",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginLeft: -18,
                marginTop: 10,
                zIndex: 100,
              }}
            ></View>
          </View>
          <View
            style={{
              marginLeft: 10,
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
              {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === item.container.posterId) return user.pseudo;
                  else return null;
                })}
            </Text>
          </View>
        </View>


      </View>
    );
  }

  return (
    <View
      style={{
        height: 160,
        width: "100%",
        backgroundColor: isDarkMode ? "#171717" : "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
        data={filteredStories}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={<MyStory />}

      />
    </View>
  );
};

export default Stories;
