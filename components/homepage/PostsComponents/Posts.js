import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty, formatPostDate } from "../../Context/Utils";
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import LikeButton from "./LikeButton";
import { useNavigation } from "@react-navigation/native";
import AddCommentButton from "./AddButtom/AddCommentButton";
import AllCommentView from "./AllCommentView";
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { LinearGradient } from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import AddReplyComment from "./AddButtom/AddReplyComment";
import AddReplyToReply from "./AddButtom/AddReplyToReply";

const Posts = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const [showComments, setShowComments] = useState(false);
  const [showToolings, setShowToolings] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedReply, setSelectedReply] = useState(null);
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [commentsHeight, setCommentsHeight] = useState(new Animated.Value(0));
  const [toolingsHeight, setToolingsHeight] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [response, setResponse] = useState(false)
  const [responseToResponse, setResponseToResponse] = useState(false)
  const { uid } = useContext(UidContext);
  const { isDarkMode } = useDarkMode();

  const goProfil = (id) => {
    if (uid === id) {
      console.log("go to my profil", id);
      navigation.navigate("Profile", { id });
    } else {
      navigation.navigate("ProfilFriends", { id });
      console.log("go to profile friends", id);
    }
  };
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


  /*useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardActive(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardActive(false);
      }
    );

    // Nettoyez les écouteurs lorsqu'ils ne sont plus nécessaires
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);*/





  const { t } = useTranslation();

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

  return (
    <>

      {post.picture && post.message && !post.video && (
        <View
          key={post._id}
          style={{
            marginTop: 8,
            marginBottom: 5,
            backgroundColor: isDarkMode ? "#171717" : "white",
            position: "relative",
            width: "96%",
            height: 500,
            borderRadius: 20,
            zIndex: 1,
            shadowColor: isDarkMode ? "white " : "#000",
            shadowOffset: {
              width: 0,
              height: isDarkMode ? 1 : 2,
            },
            shadowOpacity: isDarkMode ? 0.16 : 0.6,
            shadowRadius: 3.84,
            elevation: 2,
          }}
        >
          {isLoading ? (
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative ",
                  zIndex: 1,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => goProfil(post.posterId)}>
                    <Image
                      source={{
                        uri:
                          !isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId) {
                                return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                              }
                              else
                                return null;
                            })
                            .join(""),
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 30,
                        marginTop: 10,
                        marginLeft: 30,
                        resizeMode: "cover",
                        zIndex: 1,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: isDarkMode ? "white" : "white",
                          marginLeft: 5,
                          fontWeight: "600",
                          fontSize: 16,
                        }}
                      >
                        {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                            if (user._id === post.posterId) return user.pseudo;
                            else return null;
                          })}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        marginLeft: 5,
                        marginTop: 4,
                        fontWeight: "400",
                        fontSize: 12,
                        lineHeight: 12,
                      }}
                    >
                      {formatPostDate(post.createdAt)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={toggleToolings}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="more-horizontal"
                    size={25}
                    color="white"

                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderColor: "red",
                  width: "100%",
                  height: 500,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  overflow: "hidden",
                }}
              >
                <LinearGradient
                  colors={[isDarkMode ? "black" : "#4F4F4F", "transparent"]}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    height: 100,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />
                <Image
                  source={{
                    uri: post.picture,
                  }}
                  style={{
                    borderColor: "red",
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20,
                    opacity: isDarkMode ? 0.7 : 1,
                  }}
                />

                <LinearGradient
                  colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 200,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  marginVertical: 10,
                  top: "70%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "26%",
                    }}
                  >
                    <LikeButton post={post} type={"postPicture"} />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      {post.likers.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "26%",
                    }}
                  >
                    <TouchableOpacity onPress={toggleComments}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 30,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome5
                          name="comment"
                          size={25}
                          color="white"

                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      {post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather
                      name="send"
                      size={25}
                      color="white"

                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="bookmark"
                    size={25}
                    color="white"

                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  zIndex: 1,
                  height: "12%",
                  width: "90%",
                  marginLeft: 10,
                  top: "56%",
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? "white" : "#F5F5F5",
                    fontSize: 15,
                    fontWeight: "400",
                    textAlign: "justify",
                    lineHeight: 20,
                  }}
                >
                  {post.message}
                </Text>
              </View>
            </>
          )}
        </View>
      )}

      {!post.picture && post.message && !post.video && (
        <View
          key={post._id}
          style={{
            marginTop: 8,
            marginBottom: 5,
            backgroundColor: isDarkMode ? "#171717" : "white",
            position: "relative",
            width: "96%",
            height: 200,
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
          {isLoading ? (
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative ",
                  zIndex: 1,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => goProfil(post.posterId)}>
                    <Image
                      source={{
                        uri:
                          !isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId)
                                return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                              else return null;
                            })
                            .join(""),
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        marginTop: 10,
                        marginLeft: 30,
                        resizeMode: "cover",
                        zIndex: 1,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: isDarkMode ? "#F5F5F5" : "black",
                          marginLeft: 5,
                          fontWeight: "600",
                          fontSize: 18,
                        }}
                      >
                        {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                            if (user._id === post.posterId) return user.pseudo;
                            else return null;
                          })}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: isDarkMode ? "#F5F5F5" : "black",

                        fontSize: 10,
                        marginLeft: 5,
                        marginTop: 4,
                        fontWeight: "400",
                        fontSize: 12,
                        lineHeight: 12,
                      }}
                    >
                      {formatPostDate(post.createdAt)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={toggleToolings}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 30,
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="more-horizontal"
                    size={25}
                    color="white"

                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  zIndex: 1,
                  height: "12%",
                  width: "90%",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? "#F5F5F5" : "black",
                    fontSize: 16,
                    fontWeight: "400",
                    textAlign: "justify",
                    lineHeight: 20,
                  }}
                >
                  {post.message}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  marginVertical: 40,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "26%",
                    }}
                  >
                    <LikeButton post={post} type={"postMessage"} />
                    <Text
                      style={{
                        color: isDarkMode ? "#F5F5F5" : "black",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      {post.likers.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "26%",
                    }}
                  >
                    <TouchableOpacity onPress={toggleComments}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 30,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome5
                          name="comment"
                          size={25}
                          color={isDarkMode ? "#F5F5F5" : "black"}

                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: isDarkMode ? "#F5F5F5" : "black",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      {post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Feather
                      name="send"
                      size={25}
                      color={isDarkMode ? "#F5F5F5" : "black"}

                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="bookmark"
                    size={25}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}

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
                {post.comments.length + post.comments.reduce((total, comment) => total + (comment.replies ? comment.replies.length : 0), 0)} {t('PostsComment')}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "78%",
                borderTopWidth: 1,
                backgroundColor: isDarkMode ? "#171717" : "white",
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              <AllCommentView post={post} toggle={toggleComments} toAnswering={answer} toReplying={toReplying} />

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
              {response ? (
                <>
                  <AddReplyComment
                    post={post}
                    selectedComment={selectedComment} />

                </>

              ) : responseToResponse ?
                (
                  <>
                    <AddReplyToReply
                      post={post}
                      selectedComment={selectedComment}
                      selectedReply={selectedReply}
                    />
                  </>

                ) : (
                  <>
                    <AddCommentButton post={post} />
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
            height: "70%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 10,
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: "100%",
              height: "90%",
            }}>
            <View
              style={{
                width: "100%",
                height: "25%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                borderTopWidth: 2,
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "center",
                  justifyContent: "space-between"

                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    //backgroundColor: "blue",
                    borderWidth: 3,
                    borderColor: isDarkMode ? "gray" : "lightgray",
                    alignItems: "center",
                    justifyContent: "center"

                  }}>
                  <Fontisto
                    name="heart-alt"
                    size={24}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 14
                  }}
                >
                  Enregistrer
                </Text>

              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "center",
                  justifyContent: "space-between"

                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    //backgroundColor: "blue",
                    borderWidth: 3,
                    borderColor: isDarkMode ? "gray" : "lightgray",
                    alignItems: "center",
                    justifyContent: "center"

                  }}>
                  <Fontisto
                    name="heart-alt"
                    size={24}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 14
                  }}
                >
                  Enregistrer
                </Text>

              </View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  alignItems: "center",
                  justifyContent: "space-between"

                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    //backgroundColor: "blue",
                    borderWidth: 3,
                    borderColor: isDarkMode ? "gray" : "lightgray",
                    alignItems: "center",
                    justifyContent: "center"

                  }}>
                  <Fontisto
                    name="heart-alt"
                    size={24}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 14
                  }}
                >
                  Enregistrer
                </Text>

              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "15%",
                borderTopWidth: 2,
                borderColor: isDarkMode ? "#343232" : "lightgray",
              }}
            >

            </View>

          </View>
        </KeyboardAvoidingView>
      </Modal>

    </>
  );
};

export default Posts;
