import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import { isEmpty } from "../Context/Utils";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posting = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <GestureHandlerRootView>
      <FlatList
        data={posting}
        keyExtractor={(post) => post._id}
        renderItem={({ item: post }) => (
          <View
            style={{
              alignItems: "center",
            }}
            key={post._id}
          >
            <Posts post={post} />
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default Thread;
