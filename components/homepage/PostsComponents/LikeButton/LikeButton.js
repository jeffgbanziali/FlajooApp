import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, } from "react-native";
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
              width: 50,
              height: 50,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={like}
          >
            {type === "postPicture" && (
              <Feather
                name="heart"
                size={25}
                color={isDarkMode ? "#F5F5F5" : "white"}

              />
            )}
            {type === "postMessage" && (
              <Feather
                name="heart"
                size={25}
                color={isDarkMode ? "#F5F5F5" : "black"}

              />
            )}
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
          {type === "postPicture" && (
            <AntDesign
              name="heart"
              size={25}
              color="red"

            />
          )}
          {type === "postMessage" && (
            <AntDesign
              name="heart"
              size={25}
              color="red"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LikeButton;
