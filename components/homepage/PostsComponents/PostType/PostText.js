import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty, formatPostDate } from "../../../Context/Utils";
import { useNavigation } from "@react-navigation/native";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import { useTranslation } from "react-i18next";
import LikeButton from "../LikeButton/LikeButton"
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PostFooter from "../CustomPostCard/PostFooter";


const PostText = ({ post, toggleToolings, toggleComments, toggleSending }) => {

  const usersData = useSelector((state) => state.usersReducer);
  const navigation = useNavigation();
  const { uid } = useContext(UidContext);
  const { isDarkMode } = useDarkMode();

  const goProfil = (id) => {
    if (uid === id) {
      navigation.navigate("Profile", { id });
    } else {
      navigation.navigate("ProfilFriends", { id });
    }
  };


  const { t } = useTranslation();

  const user = usersData.map(user => {
    if (user._id === post.posterId) {
      return user;
    }
    return null;
  }).filter(user => user !== null)[0];

  const isUserOnline = user.onlineStatus === true


  return (




    <View
    >
      {post.originalPosterId && post.posterId ? (

        <>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative ",
              zIndex: 1,
              marginBottom: 10,
              height: 60,
              //backgroundColor:"red"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <TouchableOpacity

                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  marginLeft: 10,
                  zIndex: 1,
                }}
                onPress={() => goProfil(post.posterId)}>

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
                    width: "100%",
                    height: "100%",
                    borderRadius: 30,
                    zIndex: 1,
                  }}
                />
                {isUserOnline && (<View
                  style={{
                    backgroundColor: "#09C03C",
                    position: "absolute",
                    left: 28,
                    width: 8,
                    height: 8,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                    top: 25,
                    zIndex: 100
                  }}>
                </View>
                )}
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
                      fontSize: 14,
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
                size={20}
                color={isDarkMode ? "#F5F5F5" : "black"}

              />
            </TouchableOpacity>
          </View>

          {
            post.message && (
              <View
                style={{
                  zIndex: 1,
                  width: "90%",
                  marginLeft: 10,
                  paddingBottom: 10,
                  justifyContent: "center"
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
            )
          }

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",

            }}>
            <View
              style={{
                width: "90%",
                borderRightRadius: 30,
                borderLeftRadius: 30,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                paddingLeft: 20,
                borderColor: "rgba(255,255,255)",
              }}
            >


              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative ",
                  zIndex: 1,
                  marginBottom: 10,
                  height: 60,
                  //backgroundColor:"red"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
                  }}
                >
                  <TouchableOpacity

                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 30,
                      marginLeft: 10,
                      zIndex: 1,
                    }}
                    onPress={() => goProfil(post.originalPosterId)}>

                    <Image
                      source={{
                        uri:
                          !isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              if (user._id === post.originalPosterId) {
                                return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                              }
                              else
                                return null;
                            })
                            .join(""),
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 30,
                        zIndex: 1,
                      }}
                    />
                    {!isUserOnline && (<View
                      style={{
                        backgroundColor: "#09C03C",
                        position: "absolute",
                        left: 20,
                        width: 6,
                        height: 6,
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                        top: 20,
                        zIndex: 100
                      }}>
                    </View>
                    )}
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
                          fontSize: 12,
                        }}
                      >
                        {!isEmpty(usersData[0]) &&
                          usersData.map((user) => {
                            if (user._id === post.originalPosterId) return user.pseudo;
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
                        fontSize: 10,
                        lineHeight: 12,
                      }}
                    >
                      {formatPostDate(post.originalPostCreated)}
                    </Text>
                  </View>
                </View>



              </View>
              {post.originalMessage && (
                <View
                  style={{
                    zIndex: 1,
                    width: "90%",
                    marginLeft: 10,
                    paddingBottom: 10,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: isDarkMode ? "#F5F5F5" : "black",
                      fontSize: 12,
                      fontWeight: "400",
                      textAlign: "justify",
                      lineHeight: 20,
                    }}
                  >
                    {post.originalMessage}
                  </Text>
                </View>
              )}

            </View>

          </View>

          <View
            style={{
              zIndex: 1,
              //height: "20%",
              width: "90%",
              marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 20,
              // backgroundColor:"red"
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
              width: "100%",

            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: "center",
                paddingLeft: 1,
                paddingRight: 1
              }}
            >
              <PostFooter post={post} toggleComments={toggleComments} />
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
                marginTop: 10
              }}
            >
              <TouchableOpacity

                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  marginLeft: 10,
                  zIndex: 1,
                }}
                onPress={() => goProfil(post.posterId)}>
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
                    width: "100%",
                    height: "100%",
                    borderRadius: 30,
                    resizeMode: "cover",
                    zIndex: 1,
                  }}
                />
                {isUserOnline && (<View
                  style={{
                    backgroundColor: "#09C03C",
                    position: "absolute",
                    left: 28,
                    width: 8,
                    height: 8,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                    top: 25,
                    zIndex: 100
                  }}>
                </View>
                )}
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
                      fontSize: 14,
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
                size={20}
                color={isDarkMode ? "#F5F5F5" : "black"}

              />
            </TouchableOpacity>


          </View>

          <View
            style={{
              zIndex: 1,
              //height: "20%",
              width: "90%",
              marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 20,
              // backgroundColor:"red"
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
              width: "100%",

            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: "center",
                paddingLeft: 1,
                paddingRight: 1
              }}
            >
              <PostFooter
                post={post}
                toggleSending={toggleSending}
                toggleComments={toggleComments} />
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
  )
}

export default PostText