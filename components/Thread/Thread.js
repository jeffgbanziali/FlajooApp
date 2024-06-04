import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations, getPosts } from "../../actions/post.actions";
import Posts from "../homepage/PostsComponents/Posts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../homepage/Header/Header";
import Stories from "../homepage/Stories/Story/Stories";
import { UidContext, useDarkMode } from "../Context/AppContext";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  //const posting = useSelector((state) => state.postReducer.post);
  const userRequire = useSelector(state => state.postReducer.post);
  const { isDarkMode } = useDarkMode();
  const { uid } = useContext(UidContext)




  useEffect(() => {
    if (uid) {
      setLoadPost(true); // Démarre le chargement
      dispatch(getPosts(uid))
        .finally(() => {
          setLoadPost(false); // Arrête le chargement après la requête
        });
    }
  }, [uid, dispatch]);

  if (!uid) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Waiting for user ID...</Text>
      </View>
    );
  }

  if (loadPost) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {




    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: isDarkMode ? "#0D0D0D" : "lightgray"
        }}
        key={item._id}
      >
        <Posts post={item} />
      </View>)
  }


  return (
    <GestureHandlerRootView>
      <FlatList
        data={userRequire}
        keyExtractor={(post) => post._id}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
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
