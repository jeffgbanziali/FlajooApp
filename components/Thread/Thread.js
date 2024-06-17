import React, { useState, useEffect, useContext, useRef } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations, getPosts, markPostAsViewed } from "../../actions/post.actions"; // Ajoutez markPostAsViewed à partir des actions
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../homepage/Header/Header";
import Stories from "../homepage/Stories/Story/Stories";
import { UidContext, useDarkMode } from "../Context/AppContext";
import { Dimensions } from "react-native";



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

  /*useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (uid) {
          setLoadPost(true);
          await dispatch(getPosts());
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadPost(false);
      }
    };

    fetchPosts();

  }, [uid, dispatch]);*/





  const renderItem = ({ item }) => {



    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray"
        }}
        key={item._id}
      >
        <Posts loadPost={loadPost} user={uid} post={item} />
      </View>)
  }

  return (
    <GestureHandlerRootView>
      <FlatList
        data={userRequire}
        keyExtractor={(post) => post._id}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
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
