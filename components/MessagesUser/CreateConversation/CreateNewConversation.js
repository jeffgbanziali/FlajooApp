import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { isEmpty } from "../../Context/Utils"
import CreateHeader from './CreateHeader';
import CreateInputSearch from './CreateInputSearch';
import SearchUser from './SearchUser';
import { createConversation } from '../../../actions/conversation.action';


const CreateNewConversation = () => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                height: "100%",
                width: "100%",
                alignItems: "center",
                //backgroundColor: "blue",
            }}>
            <CreateHeader />
            <CreateInputSearch />
            <SearchUser
            />

        </SafeAreaView >
    )
}

export default CreateNewConversation