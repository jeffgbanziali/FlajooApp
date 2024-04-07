import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

const ShowText = ({ setPostText, handleStorySubmit, postText, policeActuelle, isDarkMode, closeModalText }) => {

    const { t } = useTranslation();


    return (
        <SafeAreaView>
            <View
                style={{
                    width: "100%",
                    height: "5%",
                    justifyContent: "center",
                    //backgroundColor: "blue",
                    zIndex: 2,
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2%",
                    }}
                    onPress={closeModalText}
                >
                    <Entypo name="cross" size={36} color="white" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    //backgroundColor: "red",
                    width: "100%",
                    height: "85%",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                <View
                    style={{
                        width: "100%",
                        height: "50%",
                        //backgroundColor: "blue"

                    }}
                >
                    <TextInput
                        style={{
                            width: "100%",
                            height: "100%",
                            paddingLeft: 12,
                            marginTop: "10%",
                            fontSize: 40,
                            fontFamily: policeActuelle,
                            fontWeight: "normal",
                            overflow: "hidden",
                            color: "white",
                        }}
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        onChangeText={(nouveauText) => setPostText(nouveauText)}
                        value={postText}
                        editable
                        placeholder={t('TextInputStory')}
                        placeholderTextColor={isDarkMode ? "#F5F5F5" : "white"}
                        fontSize={20}
                        color={isDarkMode ? "#F5F5F5" : "white"} />
                </View>

            </View>

            <View
                style={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    paddingRight: 14,
                    //backgroundColor: "blue",
                    zIndex: 1,
                }}
            >
                <TouchableOpacity
                    onPress={handleStorySubmit}
                    style={{
                        width: 100,
                        height: 40,
                        backgroundColor: isDarkMode ? "#E52C2C" : "#2B60E8",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        flexDirection: "row",
                        zIndex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: "white"
                        }}>
                        {t('AddPost')}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ShowText