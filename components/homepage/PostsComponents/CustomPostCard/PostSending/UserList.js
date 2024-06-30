import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, SafeAreaView, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UidContext } from '../../../../Context/AppContext';
import SenderUserEdit from './SenderUserEdit';
import { sharePostWithUser } from '../../../../../actions/post.actions';
import { useDispatch } from 'react-redux';


const UserList = ({ firstTenUsers, toggleSending, isDarkMode, t, postSenderPost }) => {
    const [userSelect, setUserSelect] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");
    const { uid } = useContext(UidContext);
    const dispatch = useDispatch()
    const [alertVisible, setAlertVisible] = useState(true);


    const selectUserSend = (id) => {
        setUserSelect(id);
        setModalVisible(true);
        console.log("user id selected", id)
    };

    const closeModel = () => {
        setUserSelect(null);
        setModalVisible(false);
    }









    const renderPost = ({ item }) => {
        const isSelected = item._id === userSelect;
        return (
            <TouchableOpacity
                onPress={() => selectUserSend(item._id)}
                style={{ width: 80, alignItems: "center", marginTop: 8, position: 'relative' }}
            >
                <View style={{ width: 60, height: 60, borderRadius: 100 }}>
                    <Image
                        source={{ uri: item.picture }}
                        style={{ width: "100%", height: "100%", borderRadius: 100 }}
                    />
                    {isSelected && (
                        <View
                            style={{
                                position: 'absolute',
                                right: -4,
                                bottom: -2,
                                borderWidth: 2,
                                borderRadius: 100,
                                borderColor: isDarkMode ? "#171717" : "white",
                            }}>
                            <FontAwesome
                                name="check-circle"
                                size={18}
                                color="red"

                            />
                        </View>


                    )}
                </View>
                <Text style={{ marginTop: 8, fontSize: 12, fontWeight: "500", color: isDarkMode ? "#FFFFFF" : "black" }}>
                    {item.pseudo}
                </Text>
            </TouchableOpacity>
        );
    };



    return (
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", paddingLeft: 20 }}>
            <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={firstTenUsers}
                renderItem={renderPost}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <TouchableOpacity
                        style={{ width: 100, height: 120, alignItems: "center" }}>
                        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: isDarkMode ? "#202020" : "#D9D9D9", alignItems: "center", justifyContent: "center" }}>
                            <Entypo name="dots-three-horizontal" size={20} color={isDarkMode ? "white" : "black"} />
                        </View>
                        <Text style={{ marginTop: 8, fontSize: 14, fontWeight: "500", color: isDarkMode ? "#FFFFFF" : "black" }}>
                            {t('Plus')}
                        </Text>
                    </TouchableOpacity>

                }
            />
            <SenderUserEdit
                closeModel={closeModel}
                isDarkMode={isDarkMode}
                t={t}
                modalVisible={modalVisible}
                userSelect={userSelect}
                toggleSending={toggleSending}
                postSenderPost={postSenderPost} />




        </View>
    );
};

export default UserList;
