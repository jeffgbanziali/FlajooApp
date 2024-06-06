import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Context/Utils";
import Modal from "react-native-modal";
import AddCommentButton from "./PostComments/AddButtom/AddCommentButton";
import AllCommentView from "./PostComments/AllCommentView";
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import AddReplyComment from "./PostComments/AddButtom/AddReplyComment";
import AddReplyToReply from "./PostComments/AddButtom/AddReplyToReply";
import PostText from "./PostType/PostText";
import PostMedia from "./PostType/PostMedia";
import PostTwoMedia from "./PostType/PostTwoMedia";
import PostTextAndMedia from "./PostType/PostTextAndMedia";
import PostTools from "./CustomPostCard/PostTools/PostTools";
import PostTwoMediaAndText from "./PostType/PostTwoMediaAndText";







const Posts = ({ post, loadPost, userId }) => {






  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const [showComments, setShowComments] = useState(false);
  const [showToolings, setShowToolings] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedReply, setSelectedReply] = useState(null);
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [commentsHeight, setCommentsHeight] = useState(new Animated.Value(0));
  const [toolingsHeight, setToolingsHeight] = useState(new Animated.Value(0));
  const [partVisible, setPartVisible] = useState(true);
  const [response, setResponse] = useState(false)
  const [responseToResponse, setResponseToResponse] = useState(false)
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation()






  const answer = (comment) => {
    setResponse(!response);
    setResponseToResponse(false);
    setSelectedComment(comment);
  };



  const toReplying = (comment, reply) => {
    setResponseToResponse(!responseToResponse);
    setResponse(false);
    setSelectedComment(comment);
    setSelectedReply(reply);
  };



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Le clavier est ouvert, masquez votre partie
        setPartVisible(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Le clavier est fermé, affichez votre partie
        setPartVisible(true);
      }
    );

    // Nettoyez les écouteurs lorsque le composant est démonté
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);





  useEffect(() => {
    !isEmpty(usersData)[0] && setIsLoading(false);
  }, [usersData]);


  const toggleComments = () => {
    if (showComments) {
      Animated.timing(commentsHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setShowComments(false));
    } else {
      setShowComments(true);
      Animated.timing(commentsHeight, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  };


  const toggleToolings = () => {
    if (showToolings) {
      Animated.timing(toolingsHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setShowToolings(false));
    } else {
      setShowToolings(true);
      Animated.timing(toolingsHeight, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };



  const mediaData = post.media?.map(mediaItem => mediaItem);


  const [currentMediaIndex, setCurrentMediaIndex] = useState(
    post.media
  );

  const mediaDate = post.media?.find(mediaItem => mediaItem);

  const commentary = post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)


  //console.log("Mes commentaires",commentary)


  return (
    <>

      {currentMediaIndex?.length > 1 ? (
        <>
          {mediaData && post.message && (
            <View
              key={post._id}
              style={{
                marginTop: 8,
                marginBottom: 5,
                backgroundColor: isDarkMode ? "#171717" : "white",
                position: "relative",
                width: "100%",
                zIndex: 1,
                shadowColor: isDarkMode ? "white " : "#000",
                shadowOffset: {
                  width: 0,
                  height: isDarkMode ? 1 : 2,
                },
                shadowOpacity: isDarkMode ? 0.16 : 0.4,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              {
                isLoading /*|| loadPost || !userId*/ ? (
                  <View
                    style={{
                      width: "100%",
                      height: 400,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "30%",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          color: isDarkMode ? "white" : "black",
                        }}
                      >
                        Loading
                      </Text>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                    <Text
                      style={{
                        fontSize: 26,
                        marginTop: "5%",
                        textAlign: "center",
                        color: isDarkMode ? "white" : "black",
                      }}
                    >
                      Please wait
                    </Text>
                  </View>
                ) : (
                  <>
                    <PostTwoMediaAndText post={post} currentMediaIndex={currentMediaIndex} mediaItem={mediaData} toggleToolings={toggleToolings} toggleComments={toggleComments} />
                  </>
                )}
            </View>
          )}

          {mediaData && !post.message && (
            <View
              key={post._id}
              style={{
                marginTop: 8,
                marginBottom: 5,
                backgroundColor: isDarkMode ? "#171717" : "white",
                position: "relative",
                width: "100%",
                zIndex: 1,
                shadowColor: isDarkMode ? "white " : "#000",
                shadowOffset: {
                  width: 0,
                  height: isDarkMode ? 1 : 2,
                },
                shadowOpacity: isDarkMode ? 0.16 : 0.4,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              {
                isLoading ? (
                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "30%",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          color: isDarkMode ? "white" : "black",
                        }}
                      >
                        Loading
                      </Text>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                    <Text
                      style={{
                        fontSize: 26,
                        marginTop: "5%",
                        textAlign: "center",
                        color: isDarkMode ? "white" : "black",
                      }}
                    >
                      Please wait
                    </Text>
                  </View>
                ) : (
                  <>
                    <PostTwoMedia post={post} mediaItem={mediaData} toggleToolings={toggleToolings} toggleComments={toggleComments} />
                  </>
                )}
            </View>
          )}
        </>
      ) :
        currentMediaIndex?.length === 1 ? (
          <>

            {mediaDate && post.message && (
              <View
                key={post._id}
                style={{
                  marginTop: 8,
                  marginBottom: 5,
                  backgroundColor: isDarkMode ? "#171717" : "white",
                  position: "relative",
                  width: "100%",
                  zIndex: 1,
                  shadowColor: isDarkMode ? "white " : "#000",
                  shadowOffset: {
                    width: 0,
                    height: isDarkMode ? 1 : 2,
                  },
                  shadowOpacity: isDarkMode ? 0.16 : 0.4,
                  shadowRadius: 3.84,
                  elevation: 2,
                }}
              >
                {
                  isLoading /*|| loadPost || !userId*/ ? (
                    <View
                      style={{
                        width: "100%",
                        height: 400,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: "30%",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                            color: isDarkMode ? "white" : "black",
                          }}
                        >
                          Loading
                        </Text>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                      <Text
                        style={{
                          fontSize: 26,
                          marginTop: "5%",
                          textAlign: "center",
                          color: isDarkMode ? "white" : "black",
                        }}
                      >
                        Please wait
                      </Text>
                    </View>
                  ) : (
                    <>
                      <PostTextAndMedia post={post} item={mediaDate} toggleToolings={toggleToolings} toggleComments={toggleComments} />
                    </>
                  )}
              </View>
            )}

            {mediaDate && !post.message && (


              <PostMedia isLoading={isLoading} post={post} item={mediaDate} toggleToolings={toggleToolings} toggleComments={toggleComments} />


            )}
          </>
        ) : (
          <>
            {!mediaDate && post.message && (
              <View
                key={post._id}
                style={{
                  marginTop: 8,
                  marginBottom: 5,
                  backgroundColor: isDarkMode ? "#171717" : "white",
                  position: "relative",
                  width: "96%",
                  borderRadius: 20,
                  zIndex: 1,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                {
                  isLoading /*|| loadPost || !userId */? (
                    <View
                      style={{
                        width: "100%",
                        height: 400,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: "30%",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                            color: isDarkMode ? "white" : "black",
                          }}
                        >
                          Loading
                        </Text>
                        <ActivityIndicator size="large" color="white" />
                      </View>
                      <Text
                        style={{
                          fontSize: 26,
                          marginTop: "5%",
                          textAlign: "center",
                          color: isDarkMode ? "white" : "black",
                        }}
                      >
                        Please wait
                      </Text>
                    </View>
                  ) : (
                    <>
                      <PostText post={post} toggleToolings={toggleToolings} toggleComments={toggleComments} />


                    </>
                  )}
              </View>
            )}

          </>
        )
      }



      <Modal
        isVisible={showComments}
        onBackdropPress={toggleComments}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriverForBackdrop
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: isDarkMode ? "#171717" : "white",
            height: "85%",
            height: isKeyboardActive ? "auto" : "85%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <SafeAreaView>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: isDarkMode ? "#343232" : "lightgray",
                height: "6%",
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? "#F5F5F5" : "black",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {commentary} {t('PostsComment')}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "78%",
                borderTopWidth: 1,
                paddingBottom: 10,
                backgroundColor: isDarkMode ? "#171717" : "white",
                //backgroundColor: "red",

                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              {
                commentary === 0 ? (
                  <>
                    <View
                      style={{
                        width: "100%",
                        height: "80%",
                        //backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: 'center',

                      }}
                    >
                      <Text
                        style={{
                          color: isDarkMode ? "#F5F5F5" : "black",
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                        }}>
                        {t("TheFirsComment")}
                      </Text>
                    </View>

                  </>
                ) : (
                  <>
                    <AllCommentView
                      post={post}
                      toggle={toggleComments}
                      toAnswering={answer}
                      toReplying={toReplying} />

                  </>
                )
              }


            </View>
            <View
              style={{
                width: "100%",
                height: "16%",
                //backgroundColor: "gray",
                borderTopWidth: 1,
                justifyContent: "center",
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              {
                response ? (
                  <>
                    <AddReplyComment
                      post={post}
                      selectedComment={selectedComment}
                      partVisible={partVisible}
                    />

                  </>

                ) : responseToResponse ?
                  (
                    <>
                      <AddReplyToReply
                        post={post}
                        selectedComment={selectedComment}
                        selectedReply={selectedReply}
                        partVisible={partVisible}
                      />
                    </>

                  ) : (
                    <>
                      <AddCommentButton
                        post={post}
                        partVisible={partVisible}
                      />
                    </>

                  )

              }
            </View>

          </SafeAreaView>

        </KeyboardAvoidingView>
      </Modal >


      <Modal
        isVisible={showToolings}
        onBackdropPress={toggleToolings}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriverForBackdrop
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={{
            backgroundColor: isDarkMode ? "#171717" : "white",
            height: "80%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 10,
            justifyContent: "center"
          }}
        >
          <PostTools post={post} toggleToolings={toggleToolings} />

        </KeyboardAvoidingView>
      </Modal>

    </>
  );
};

export default Posts;
