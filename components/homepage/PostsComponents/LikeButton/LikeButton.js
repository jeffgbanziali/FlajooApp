import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../../../actions/post.actions";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";

const LikeButton = ({ post, type }) => {
  const { uid } = useContext(UidContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();

  const isLiked = useSharedValue(liked ? 1 : 0);

  useEffect(() => {
    const isPostLiked = post.likers.includes(uid);
    setLiked(isPostLiked);
    isLiked.value = withSpring(isPostLiked ? 1 : 0);
  }, [uid, post.likers]);

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
    isLiked.value = withSpring(1);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
    isLiked.value = withSpring(0);
  };

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(isLiked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isLiked.value }],
      opacity: isLiked.value,
    };
  });

  const buttonStyle = {
    width: 80,
    height: 38,
    flexDirection: "row",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  };

  const renderButton = (liked) => {
    const textColor = liked ? "#ED3237" : "gray";

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={liked ? unlike : like}
      >
        <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle, styles.iconContainer]}>
          <Feather
            name="heart"
            size={20}
            color="gray"
          />
          <Text style={{ ...textStyle, color: textColor }}>
            J'aime
          </Text>
        </Animated.View>
        <Animated.View style={[fillStyle, styles.iconContainer]}>
          <AntDesign
            name="heart"
            size={18}
            color="#ED3237"
          />
          <Text style={{ ...textStyle, color: textColor }}>
            J'aime
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return <View>{uid && renderButton(liked)}</View>;
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
});

export default LikeButton;
