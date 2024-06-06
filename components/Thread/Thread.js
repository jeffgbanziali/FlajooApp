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
    if (uid) {
      setLoadPost(true);
      dispatch(getPosts(uid))
        .finally(() => {
          setLoadPost(false);
        });
    }
  }, [uid, dispatch]);

  /*const postHeight = 600; 


  const handleScroll = async (event) => {
    try {
      const offsetY = event.nativeEvent.contentOffset.y;

      // Calculer l'index de la publication visible actuellement
      const viewedPostIndex = Math.floor(offsetY / postHeight);
      const viewedPost = userRequire[viewedPostIndex];

      // Enregistrer la vue de la publication visible
      const response = await dispatch(markPostAsViewed(viewedPost._id, uid));
      console.log("Réponse de la requête de marquage comme vu :", response);
    } catch (err) {
      console.error("Erreur lors du marquage de la publication comme vue :", err);
    }
  };*/





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
{/* <View style={{
        width: "100%",
        height: postHeight,
        backgroundColor: "red",
        position: "absolute",
        zIndex: 9999
      }}>

      </View>*/}
      <FlatList
        data={userRequire}
        keyExtractor={(post) => post._id}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
      //  onScroll={handleScroll} // Ajoutez la fonction handleScroll ici
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
