import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { likeStory, dislikeStory, getStories } from "../../../../actions/story.action";
import { UidContext } from "../../../Context/AppContext";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const LikeStoriesButton = ({ story }) => {
  const { uid } = useContext(UidContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const [loadStories, setLoadStories] = useState(true);

  const like = () => {
    dispatch(likeStory(story._id, { id: uid }));
    setLiked(true);
    setLoadStories(true);;
  };


  const unlike = () => {
    dispatch(dislikeStory(story._id, { id: uid }));
    setLiked(false);
    setLoadStories(true);
  };


  useEffect(() => {
    setLiked((prevLiked) => {
      if (story?.likers.includes(uid)) return true;
      else return false;
    });
  }, [uid, story?.likers]);

  useEffect(() => {
    if (loadStories) {
      dispatch(getStories());
      setLoadStories(false);
    }
  }, [loadStories, dispatch]);

  console.log("My story status", loadStories)

  return (

    <View
      style={{
        width: 50,
        height: 50,
        marginRight: 4,
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3

      }}
    >
      <View>
        {uid && liked == false && (
          <>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={like}
            >
              <Feather
                name="heart"
                size={35}
                color="white"

              />
            </TouchableOpacity>
          </>
        )}
        {uid && liked && (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={unlike}
          >
            <AntDesign
              name="heart"
              size={35}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LikeStoriesButton;
