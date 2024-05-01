import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../homepage/Header/Header";
import Stories from "../homepage/Stories/Story/Stories";
import { useDarkMode } from "../Context/AppContext";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posting = useSelector((state) => state.postReducer);
  const { isDarkMode } = useDarkMode();


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
        onEndReachedThreshold={0.5}
        renderItem={({ item: post }) => (
          <View
            style={{
              alignItems: "center",
              backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray"
            }}
            key={post._id}
          >
            <Posts post={post} />
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Header />
            <Stories />
          </>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default Thread;
