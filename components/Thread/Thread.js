import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../homepage/Header/Header";
import Stories from "../homepage/Stories/Story/Stories";
import { UidContext, useDarkMode } from "../Context/AppContext";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const userRequire = useSelector((state) => state.postReducer.post);
  const { isDarkMode } = useDarkMode();
  const { uid } = useContext(UidContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (uid) {
          setLoadPost(true);
          await dispatch(getPosts(uid));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadPost(false);
      }
    };

    fetchPosts();
  }, [uid, dispatch]);

  const renderItem = useCallback(({ item }) => (
    <View
      style={{
        alignItems: "center",
        backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray",
      }}
      key={item._id}
    >
      <Posts loadPost={loadPost} user={uid} post={item} />
    </View>
  ), [isDarkMode, loadPost, uid]);

  const ListHeaderComponent = useCallback(() => (
    <View style={{
      backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray",
    }}>
      <Header />
      <Stories />
    </View>
  ), []);

  return (
    <GestureHandlerRootView>
      <FlatList
        data={userRequire}
        keyExtractor={(post) => post._id}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeaderComponent}
      />
    </GestureHandlerRootView>
  );
};

export default Thread;
