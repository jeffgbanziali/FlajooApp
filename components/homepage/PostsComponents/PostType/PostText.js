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

const PostText = ({ post, toggleToolings, toggleComments }) => {

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


  return (
    <View
      style={{
        width: "100%",
        height: "100%",
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop:10
          }}
        >
          <TouchableOpacity

            style={{
              width: 35,
              height: 35,
              borderRadius: 30,
              marginLeft: 10,
              resizeMode: "cover",
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
            paddingLeft: 12
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
    </View>
  )
}

export default PostText