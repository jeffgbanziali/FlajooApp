import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from "../../../Context/AppContext";
import { addComment, getPosts } from "../../../../actions/post.actions";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../../Context/Utils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
//import Ionicons from 'react-native-vector-icons/Fontisto';



const AddCommentButton = ({ post, isKeyboardActive }) => {
  const { isDarkMode } = useDarkMode();

  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [loadPost, setLoadPost] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (text.length > 0) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [text]);

  const handleComment = () => {
    if (userData._id && text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo, //commentType,
      ))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };



  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  const { t } = useTranslation();

  return (
    <>

      {userData._id && (
        <>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              //backgroundColor: "red",
              height: "40%"
            }}>
            <View
              style={{
                flexDirection: "row",
                width: "45%",
                alignItems: "center",
                justifyContent: "space-around",
                //backgroundColor: "black",
                marginLeft:"12%",
                height: "100%"
              }}>
              <View
                style={{
                  flexDirection: "row",
                  width: 40,
                  alignItems: "center",
                  //backgroundColor: "green",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="images-outline" size={28} color={isDarkMode ? "#F5F5F5" : "black"} />

              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: 40,
                  alignItems: "center",
                  //backgroundColor: "green",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="file-gif-box" size={35} color={isDarkMode ? "#F5F5F5" : "black"} />

              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: 40,
                  alignItems: "center",
                  //backgroundColor: "green",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="mic-outline" size={28} color={isDarkMode ? "#F5F5F5" : "black"} />

              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: 40,
                  alignItems: "center",
                  //backgroundColor: "green",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Fontisto name="hashtag" size={20} color={isDarkMode ? "#F5F5F5" : "black"} />

              </View>
            </View>



          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              //backgroundColor: "blue",
              height: "60%"
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                marginLeft: "2.5%",
              }}
            >
              <Image
                source={{ uri: userData.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                }}
                alt="commenter-pic"
              />
            </View>
            <TextInput
              style={{
                width: "78%",
                height: "100%",
                paddingLeft: 12,
                marginLeft: 2,
                fontSize: 16,
                //backgroundColor:"red"
              }}
              onChangeText={(text) => setText(text)}
              value={text}
              placeholder={`${t('TextInputPost')} ${!isEmpty(usersData[0]) &&
                (() => {
                  const user = usersData.find((user) => user._id === post.posterId);
                  return user ? user.pseudo : '';
                })()
                }`}

              placeholderTextColor={isDarkMode ? "#F5F5F5" : "black"}
              color={isDarkMode ? "#F5F5F5" : "black"}
            />
            {isButtonVisible && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleComment}
                >
                  <Ionicons name="send" size={30} color="red" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>

      )}
    </>

  );
};

export default AddCommentButton;
