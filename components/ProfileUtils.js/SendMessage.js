import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { createConversation } from '../../actions/conversation.action';
import { useNavigation } from '@react-navigation/native';
import { UidContext, useDarkMode } from '../Context/AppContext';
import { useTranslation } from 'react-i18next';

const SendMessage = ({ users }) => {
    const { isDarkMode, isConnected } = useDarkMode();
    const navigation = useNavigation();
    const [loadStories, setLoadStories] = useState(true);
    const { t } = useTranslation();
    const { uid } = useContext(UidContext)
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()

    const isUserOnline = users.onlineStatus === true


    const conversations = useSelector(state => state.conversationReducer);




    const handleCreateConversation = async () => {
        try {


            const senderId = uid;


            const receiverId = users._id;
            const conversationData = await dispatch(createConversation(senderId, receiverId)); // Utilisation de await pour obtenir les données de la réponse
            console.log("Nouvelle conversation créée :", conversationData.message.text);
            navigation.navigate("Chatlist", { user: users, conversationData });

            console.log("Nouvelle conversation créée");
        } catch (error) {
            console.error("montre moi l'erreur", error.message);
        }
    };



    const conversationExists = conversations.conversations.find(conversation =>
        (conversation.members.senderId === uid && conversation.members.receiverId === users._id) ||
        (conversation.members.senderId === users._id && conversation.members.receiverId === uid)
    );





    const handleSendMEssage = (id) => {
        console.log("clicked");
        if (conversationExists) {
            navigation.navigate("Chatlist", {
                conversationId: conversationExists._id,
                conversation: conversationExists,
                user: users
            });
        } else {
            // Créer une nouvelle conversation
            handleCreateConversation()
        }
    };

    return (
        <TouchableOpacity onPress={() => handleSendMEssage()}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode ? "#004AAD" : "#004AAD",
                borderRadius: 10,
                marginLeft: 2,
                height: 35,
                width: 150,
            }}
        >
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "500",
                    justifyContent: "center",
                    fontSize: 16,
                }}
            >
                {t('Writing')}
            </Text>
        </TouchableOpacity>
    )
}

export default SendMessage