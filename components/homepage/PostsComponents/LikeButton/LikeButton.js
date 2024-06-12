import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, } from "react-native";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../../../actions/post.actions";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const LikeButton = ({ post, type }) => {
  const { uid } = useContext(UidContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };



  useEffect(() => {
    if (post.likers.includes(uid))
      setLiked(true);
    else
      setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <View>
      {uid && liked == false && (
        <>
          <TouchableOpacity
            style={{
              width: 90,
              height: 38,
              flexDirection: "row",
              borderRadius: 12,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            onPress={like}
          >
            {type === "postPicture" && (
              <Feather
                name="heart"
                size={20}
                color={isDarkMode ? "#F5F5F5" : "black"}

              />
            )}
            {type === "postMessage" && (
              <Feather
                name="heart"
                size={20}
                color={isDarkMode ? "#F5F5F5" : "black"}

              />
            )}
            <Text
              style={{
                color: isDarkMode ? "#F5F5F5" : "black",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "normal",
              }}
            >
              J'aime
            </Text>
          </TouchableOpacity>
        </>
      )
      }
      {
        uid && liked && (
          <TouchableOpacity
            style={{
              width: 90,
              height: 38,
              // backgroundColor: "green",
              flexDirection: "row",
              borderRadius: 12,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            onPress={unlike}
          >
            {type === "postPicture" && (
              <AntDesign
                name="heart"
                size={20}
                color="red"

              />
            )}
            {type === "postMessage" && (
              <AntDesign
                name="heart"
                size={20}
                color="red"
              />
            )}
            <Text
              style={{
                color: isDarkMode ? "red" : "red",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "normal",
              }}
            >
              J'aime
            </Text>
          </TouchableOpacity>
        )
      }
    </View >
  );
};

export default LikeButton;
