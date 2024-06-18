import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../homepage/Header/Header";
import Stories from "../homepage/Stories/Story/Stories";
import { UidContext, useDarkMode } from "../Context/AppContext";
import PlaceholderComponent from "../homepage/PostsComponents/CustomPostCard/PlaceholderComponent";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const userRequire = useSelector(state => state.postReducer.post);
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

  const renderPlaceholders = () => {
    return Array(userRequire.length || 5).fill(null).map((_, index) => (
      <PlaceholderComponent key={index} />
    ));
  };

  return (
    <GestureHandlerRootView>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray"
        }}
      >
        <Header />
        <Stories />
        {loadPost ? (
          renderPlaceholders()
        ) : (
          userRequire.map((item) => (
            <View
              style={{
                alignItems: "center",
                backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray"
              }}
              key={item._id}
            >
              <Posts loadPost={loadPost} user={uid} post={item} />
            </View>
          ))
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
});

export default Thread;
