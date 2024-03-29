import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Context/Utils";
import { followUser, unfollowUser } from "../../actions/user.action";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from "react-native";
import { useDarkMode } from "../Context/AppContext";
import { useTranslation } from "react-i18next";




const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();






  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <TouchableOpacity onPress={handleUnfollow}>
          {type === "suggestion" && (
            <View
              style={{
                backgroundColor: "#4a5568",
                borderRadius: 10,
                padding: 10,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#F6F6F6",
                  textAlign: "center",
                }}
              >
                {t("Following")}
              </Text>
            </View>
          )}
          {type === "profile" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EBF8FF",
                  borderRadius: 10,
                  height: 38,
                  width: 170,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontWeight: "500",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {t("Following")}
                </Text>
              </View>
            </View>
          )}
          {type === "card" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EBF8FF",
                borderRadius: 10,
                height: 50,
                padding: 2,
                width: 150,
              }}
            >
              <FontAwesome5 name="user-check" size={25} color="#3B82F6" />
              <Text
                style={{
                  color: "#3B82F6",
                  textAlign: "center",
                  fontWeight: "600",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                Friends
              </Text>
            </View>
          )}
          {type === "friends" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "gray",
                width: 20,
                height: 20,
                borderRadius: 30,
              }}
            >
              <FontAwesome5 name="user-check" size={8} color="black" />
            </View>
          )}
          {type === "mess" && (
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#615656",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                {t("UnFollow")}
              </Text>
            </View>
          )}
          {type === "PostTools" && (
            <View
              style={{
                width: "100%",
                height: "100%",
                //backgroundColor: "green",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  //backgroundColor: "red",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 22,
                }}>
                <Feather
                  name="user-minus"
                  size={30}
                  color={isDarkMode ? "gray" : "black"}
                />
                <Text
                  style={{
                    fontWeight: "600",
                    color: isDarkMode ? "gray" : "black",
                    fontSize: 20,
                    paddingLeft: 10,
                  }}
                >
                  {t("UnFollow")}
                </Text>
              </View>

            </View>
          )}
        </TouchableOpacity>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <TouchableOpacity onPress={handleFollow}>
          {type === "suggestion" && (
            <View
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                padding: 10,
                width: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {t("Follow")}
              </Text>
            </View>
          )}
          {type === "profile" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "red",
                  borderRadius: 10,
                  height: 38,
                  width: 170,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "500",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {t("Follow")}
                </Text>
              </View>
            </View>
          )}
          {type === "card" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "red",
                  borderRadius: 10,
                  height: 50,
                  padding: 2,
                  width: 150,
                }}
              >
                <FontAwesome5 name="user-plus" size={25} color="white" />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "semibold",
                    justifyContent: "center",
                    fontSize: 20,
                    marginLeft: 6,
                  }}
                >
                  {t("Follow")}
                </Text>
              </View>
            </View>
          )}
          {type === "friends" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#EBF8FF",
                borderRadius: 8,
                width: 25,
                height: 25,
                borderRadius: 30,
              }}
            >
              <FontAwesome5 name="user-plus" size={10} color="black" />
            </View>
          )}
          {type === "mess" && (
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E50000",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {t("Follow")}
              </Text>
            </View>
          )}
          {type === "PostTools" && (
            <View
              style={{
                width: "100%",
                height: "100%",
                //backgroundColor: "blue",
                alignItems: "center",
                //justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  width: "40%",
                  height: "100%",
                  // backgroundColor: "red",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 22,
                }}>
                <Feather
                  name="user-plus"
                  size={30}
                  color={isDarkMode ? "gray" : "black"}
                />

                <Text
                  style={{
                    fontWeight: "600",
                    color: isDarkMode ? "gray" : "black",
                    fontSize: 20,
                    paddingLeft: 10,
                  }}
                >
                  {t("Follow")}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default FollowHandler;
