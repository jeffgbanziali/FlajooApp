import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Thread = () => {
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false);// Store fetched posts
  const dispatch = useDispatch();
  const posting = useSelector((state) => state.postReducer);

  useEffect(() => {
    // Fetch posts when component mounts or page changes
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    // Dispatch action to get posts for the current page
    await dispatch(getPosts(page, 5)); // Fetch 5 posts at a time
    setLoading(false);
  };

  const handleLoadMore = () => {
    // Load more posts when end of list is reached
    if (!loading) {
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    // Render loading indicator at the end of the list
    return loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  };

  return (
    <GestureHandlerRootView>
      <FlatList
        data={posting}
        keyExtractor={(post) => post._id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
