import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { useDarkMode } from "../Context/AppContext";
import { getUser, updateBio } from "../../actions/user.action";
import { useTranslation } from "react-i18next";

const BioUpdate = () => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const { isDarkMode } = useDarkMode();
  const [loadUsers, setLoadUSers] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { t } = useTranslation();


  const handleUpdate = () => {
    dispatch(updateBio(text, userData._id));
    handleClickReturnProfile()
    setLoadUSers(true);
  };


  useEffect(() => {
    if (loadUsers) {
      dispatch(getUser(userData._id));
      setLoadUSers(false);
    }
  }, [loadUsers, dispatch]);

  const handleClickReturnProfile = () => {
    console.log("clicked home");
    navigation.navigate("EditProfil");
    setLoadUSers(true);
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0D0C0C' : '#FFFFFF',
      }}
    >
      <View
        style={{
          paddingBottom: 2,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: "row",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: 40,
              height: 40,
              borderRadius: 30,
            }}
          >
            <TouchableOpacity onPress={() => handleClickReturnProfile()}>
              <MaterialIcons
                name="arrow-back-ios"
                size={28}
                color={isDarkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 25,
              color: isDarkMode ? "white" : "black",
              fontWeight: "normal",
            }}
          >
            {t('ProfileEdit')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            width: 90,
            height: 40,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontWeight: "500",
            }}
          >
            {t('To-Save')}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "column",
          height: "40%",
          marginTop: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: userData?.picture
                ? userData.picture
                : "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: isDarkMode ? "white" : "black",
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            {userData.pseudo}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "60%",
            borderRadius: 14,
            padding: 10,
            marginTop: 10,
            backgroundColor: isDarkMode ? "#141419" : "#ECECEC"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: isDarkMode ? "lightblue" : "#0765D5",
              fontWeight: "normal",
            }}
          >
            {t('bio-save')}
          </Text>
          <TextInput
            style={{
              width: "100%",
              height: "60%",
              paddingLeft: 12,
              marginTop: 10,
              color: isDarkMode ? "white" : "black"
            }}
            editable
            multiline
            numberOfLines={6}
            maxLength={600}
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder={t('bio-placeholder')}
            placeholderTextColor={isDarkMode ? "white" : "black"}
            fontSize="22"
            color="white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BioUpdate;
