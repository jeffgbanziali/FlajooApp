import { View, Text, TextInput, Image, TouchableOpacity, FlatList, } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyGallery = ({ isDarkMode, selectImage, galleryMedia }) => {

    const { t } = useTranslation()



    return (


        <View
            style={{
                height: "100%",
                marginTop: 10,
                flexDirection: "column",
                //backgroundColor: "red"
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: "6%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        width: "30%",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: "4%",


                    }} >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '300',
                            color: isDarkMode ? "#F5F5F5" : "black",
                            marginLeft: "3.5%",
                            alignSelf: 'center'
                        }}>
                        {t('Film')}
                    </Text>
                    <View
                        style={{
                            marginLeft: 4
                        }}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color={isDarkMode ? "#F5F5F5" : "black"} />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={selectImage}
                    style={{
                        flexDirection: "row",
                        width: "45%",
                        justifyContent: "center",
                        marginRight: "4%",
                        padding: 8,
                        borderRadius: 20,
                        borderWidth: isDarkMode ? 1 : 2,
                        borderColor: isDarkMode ? "#F5F5F5" : "lightgray",

                    }} >
                    <View
                        style={{
                            marginLeft: 4,

                        }}
                    >
                        <AntDesign
                            name="picture"
                            size={24}
                            color={isDarkMode ? "#F5F5F5" : "black"}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '300',
                            color: isDarkMode ? "#F5F5F5" : "black",
                            marginLeft: "3.5%",
                            alignSelf: 'center'
                        }}>
                        {t('Multi')}
                    </Text>


                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                display: "flex",
                alignItems: "center",
            }}>
                <FlatList
                    data={galleryMedia}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleModalImage(item)}
                            style={{
                                width: '30%',
                                aspectRatio: 0.7,
                                margin: '1%',
                                borderRadius: 10,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                />

            </View>
        </View>
    )
}

export default MyGallery