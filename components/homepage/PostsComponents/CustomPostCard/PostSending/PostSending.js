import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import { UidContext, useDarkMode } from '../../../../Context/AppContext';
import PostSendingHeader from './PostSendingHeader';
import UserList from './UserList';
import ShareSection from './ShareSection';

const PostSending = ({ toggleSending, postSenderPost }) => {
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const firstTenUsers = usersData.slice(0, 50).filter((user) => user._id !== userData._id);

    return (
        <SafeAreaView
            style={{
                backgroundColor: isDarkMode ? "#171717" : "white",
                width: "100%",
                alignItems: "center",
                borderRadius: 20,
            }}
        >
            <PostSendingHeader isDarkMode={isDarkMode} t={t} userData={userData} />

            <View
                style={{
                    height: "38%",
                    width: "100%",
                    marginTop: 20,
                    flexDirection: "column",
                }}
            >
                <TextSection title={t("SendTo")} isDarkMode={isDarkMode} />
                <UserList
                    postSenderPost={postSenderPost}
                    firstTenUsers={firstTenUsers}
                    isDarkMode={isDarkMode}
                    toggleSending={toggleSending}
                    t={t}
                />
            </View>

            <View
                style={{
                    height: "34%",
                    width: "100%",
                    marginTop: 10,
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <TextSection title={t("ShareOn")} isDarkMode={isDarkMode} />
                <ShareSection isDarkMode={isDarkMode} t={t} />
            </View>
        </SafeAreaView>
    );
};

const TextSection = ({ title, isDarkMode }) => (
    <View
        style={{
            height: "20%",
            width: "100%",
            paddingLeft: 20
        }}>
        <Text style={{
            fontSize: 20,
            fontWeight: "500",
            color: isDarkMode ? "#FFFFFF" : "black"
        }}>
            {title}
        </Text>
    </View>
);



export default PostSending;
