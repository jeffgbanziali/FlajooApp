import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dateParser,
  formatPostDate,
  isEmpty,
  timestampParser,
} from "../../Context/Utils";
import { ScrollView } from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather';
import { useDarkMode } from "../../Context/AppContext";
import { LIKE_POST, getPosts } from "../../../actions/post.actions";
import { useTranslation } from "react-i18next";

const AllCommentView = ({ post }) => {
  const { isDarkMode } = useDarkMode();
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();


  const { t } = useTranslation();



  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  const renderItem = ({ item: comment }) => (

    <View
      style={{
        flexDirection: "column",
        width: "100%",
        marginTop: "3%"
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "3%",
        }}
      >
        <View
          style={{
            width: "85%",
            flexDirection: "row",
          }}>

          <View
            style={{
              width: 45,
              height: 45,
            }}
          >
            <Image
              source={{
                uri:
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId)
                        return user.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png"
                      else return null;
                    })
                    .join("")
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              alt="commenter-pic"
            />
          </View>

          <View
            style={{
              width: "100%",
              marginLeft: "4%",
            }}>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginRight: 5,
                  fontSize: 14,
                  color: isDarkMode ? "#F5F5F5" : "black",
                }}
              >
                {comment.commenterPseudo}
              </Text>
              <Text
                style={{
                  fontWeight: "normal",
                  marginRight: 5,
                  color: isDarkMode ? "#F5F5F5" : "black",

                }}
              >
                {formatPostDate(comment.timestamp)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                maxHeight: 300,
                maxWidth: 340,
                minHeight: 30,
                backgroundColor: isDarkMode ? "#3C3C3C" : "#F3F2F2",
                borderRadius: 15,
                padding: 10,
                marginTop: "2%",
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
              <Text
                style={{
                  color: isDarkMode ? "#F5F5F5" : "black",
                  fontSize: 18,
                  fontFamily: 'Roboto',
                  fontWeight: "400",
                  lineHeight: 22
                }}
              >
                {comment.text}
              </Text>
            </View>
          </View>

        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        <View
          style={{
            width: "44%",
            height: "100%",
            marginLeft: "3%",
            justifyContent: "center",
            alignItems: "center",

          }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "gray",
              }}>
              {t("Reply")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "9%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "3.5%"
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="heart"
              size={20}
              color={isDarkMode ? "#F5F5F5" : "black"}

            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "normal",
              color: isDarkMode ? "#F5F5F5" : "black",
              marginTop: "2%",
            }}>
            12
          </Text>
        </View>
      </View>


    </View >



  )

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={post.comments}
      keyExtractor={(item) => item._id}
      renderItem={renderItem} />
  )
};

export default AllCommentView;
