import React, { useState } from "react";
import { Animated, Easing, Pressable, Text } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { formatPostDate } from "../Context/Utils";
import Modal from "react-native-modal";

const MessagesUser = ({ message, own, user }) => {
  const userData = useSelector((state) => state.userReducer);
  const [showMessageTools, setMessageTools] = useState(false);
  const [messageHeight, setCommentsHeight] = useState(new Animated.Value(0));
  console.log(user)
  const userImageUri = own ? userData.picture : user.picture;

  const messageTools = () => {
    if (showMessageTools) {
      Animated.timing(messageHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setMessageTools(false));
    } else {
      setMessageTools(true);
      Animated.timing(messageHeight, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const messageOther = () => {
    console.warn("betise")
  }


  return (
    <>

      {
        own ? (
          <View style={styles.messageOwn}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={{
                  uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />

              <Pressable
                onLongPress={messageTools}
              >
                <View
                  style={{
                    backgroundColor: "red",
                    borderRadius: 20,
                    maxWidth: 300,
                    maxHeight: 200,
                    padding: 10,
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={
                      {
                        fontSize: 18,
                        color: "#FFFFFF",
                        textAlign: 'justify',
                        fontFamily: 'Roboto',
                        fontWeight: "500",
                        lineHeight: 24
                      }
                    }>
                    {message.text}
                  </Text>
                </View>
              </Pressable>
            </View >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "gray",
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                }}
              >
                {formatPostDate(message.createdAt)}
              </Text>
            </View>
          </View >
        ) : (
          <View style={styles.messageOther}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={{
                  uri: userImageUri || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
                }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />

              <Pressable
                onLongPress={messageOther}
              >
                <View
                  style={{
                    backgroundColor: "#1158C1",
                    flexDirection: "column",
                    borderRadius: 20,
                    maxWidth: 300,
                    padding: 10,
                    maxHeight: 200,
                    justifyContent: "center",
                  }
                  }
                >
                  <Text
                    style={
                      {
                        fontSize: 18,
                        color: "#FFFFFF",
                        textAlign: 'justify',
                        fontFamily: 'Roboto',
                        fontWeight: "500",
                        lineHeight: 24
                      }}>
                    {message.text}
                  </Text>
                </View>
              </Pressable>
            </View >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "gray",
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                }}
              >
                {formatPostDate(message.createdAt)}
              </Text>
            </View>
          </View >
        )
      }


      <Modal
        isVisible={showMessageTools}
        onBackdropPress={messageTools}
        style={{ margin: 0, justifyContent: "flex-end" }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriverForBackdrop
      >
        <View
          style={{
            backgroundColor: "white",
            height: "60%",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >

        </View>
      </Modal >


    </>





  );
};

const styles = StyleSheet.create({
  messageOwn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  messageOther: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

});

export default MessagesUser;
