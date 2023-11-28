import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { UidContext, useDarkMode } from '../Context/AppContext';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';


const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useDarkMode();
    const searchResults = useSelector((state) => state.usersReducer);
    const [filteredUsers, setFilteredUser] = useState(searchResults);
    const { uid } = useContext(UidContext);
    const navigation = useNavigation();


    const goProfil = (id) => {
        if (uid === id) {
            console.log("go to my profil", id);
            navigation.navigate("Profile", { id });
        } else {
            navigation.navigate("ProfilFriends", { id });
            console.log("go to profile friends", id);
        }
    };

    const { t } = useTranslation();

    useEffect(() => {
        setLoading(true)
        try {
            const newContacs = searchResults.filter(
                users =>
                    users.pseudo.toLowerCase() === searchText.toLowerCase()
            )
            setFilteredUser(newContacs);
        } catch {
            console.log("error")
        }
        finally {
            setLoading(false)
        }


    }, [searchText])


    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: isDarkMode ? "#171717" : "white",
                }}>
                <View
                    style={{
                        padding: 10,

                    }}
                >
                    <View
                        style={{
                            height: 45,
                            borderColor: 'gray',
                            fontSize: 16,
                            color: 'white',
                            borderRadius: 8,
                            marginTop: "2%"
                        }}
                    >
                        <TextInput
                            style={{
                                backgroundColor: '#2C2C2C',
                                paddingLeft: 16,
                                height: 45,
                                fontSize: 16,
                                color: 'white',
                                borderRadius: 8,
                            }}
                            placeholder={t('Research')}
                            placeholderTextColor="white"
                            onChangeText={setSearchText}
                            value={searchText}
                        />
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: "100%",
                            marginTop: "4%",
                        }}
                    >
                        {
                            loading ?
                                (
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            textAlign: 'center',
                                        }}>{t('Loading')}</Text>
                                ) : (
                                    <FlatList
                                        data={filteredUsers}
                                        keyExtractor={(item) => item._id}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => goProfil(item._id)}
                                                style={{
                                                    width: "100%",
                                                    height: 80,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    padding: 2
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        alignItems: "center",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: 100,
                                                        }}
                                                    >
                                                        <Image
                                                            source={{ uri: item.picture || "https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png" }}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: 100,
                                                                marginLeft: 10,
                                                                resizeMode: "cover",
                                                            }}
                                                        />
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: '5%',
                                                        }}>
                                                        <Text
                                                            style={{
                                                                fontWeight: "500",
                                                                fontSize: 16,
                                                                color: isDarkMode ? "white" : "black"
                                                            }}
                                                        >
                                                            {item.pseudo}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                marginTop: "2%",
                                                                color: isDarkMode ? "white" : "black"
                                                            }}
                                                        >
                                                            {t('Friends')}
                                                        </Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        )}

                                    />
                                )}

                    </View>
                </View>




            </SafeAreaView >





        </>
    )


}






export default Search;
