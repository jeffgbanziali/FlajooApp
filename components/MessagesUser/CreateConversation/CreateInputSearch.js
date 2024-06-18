import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../Context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CreateInputSearch = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector((state) => state.usersReducer);



    return (
        <View
            style={{
                width: "100%",
                height: "10%",
                // backgroundColor: "red",

            }}>


            <View
                style={{
                    width: "100%",
                    height: "40%",
                    // backgroundColor: "blue",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingLeft: 10

                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: isDarkMode ? "#F5F5F5" : "#000000",
                    }}>
                    À
                </Text>

            </View>

            <View
                style={{
                    width: "100%",
                    height: "60%",
                    //backgroundColor: "green",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: isDarkMode ? "#171717" : "#F1F1F1",
                    borderRadius: 10

                }}>
                <TextInput
                    style={{
                        //backgroundColor: '#2C2C2C',
                        //backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
                        paddingLeft: 25,
                        height: "100%",
                        width: "60%",
                        fontSize: 16,
                        color: isDarkMode ? "#F5F5F5" : "#000000",
                    }}
                    fontSize={18}
                    placeholder={t('Research')}
                    color={isDarkMode ? "#F5F5F5" : "#000000"}
                    placeholderTextColor="white"
                    onChangeText={setSearchText}
                    value={searchText}
                />

            </View>
        </View>
    )
}

export default CreateInputSearch