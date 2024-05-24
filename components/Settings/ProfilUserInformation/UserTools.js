import { View, Text, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../Context/AppContext';
import { TextInput } from 'react-native';






const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const UserTools = () => {

    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [loadUsers, setLoadUSers] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const [pseudo, setPseudo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [nationality, setNationality] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [department, setDepartment] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [value, setValue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();


    const containerWidthSize = windowWidth * 0.88;
    const containerHeightSize = windowHeight * 0.40;

    const inputWidthSize = windowWidth * 0.80;
    const inputHeightSize = windowHeight * 0.050;

    const data = {
        password,
        newPassword,
        confirmNewPassword
    }

    const OkData = () => {
        console.log("Mes données", data)
    }

    return (
        <View
            style={{
                width: "100%",
                backgroundColor: isDarkMode ? "#2C2C2C" : "#E6E6E6",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
            }}>

            {/* Le pseudo */}
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        color: isDarkMode ? "#FFFFFF" : "black",
                        fontWeight: '500',
                    }}>{t("Pseudo")}</Text>
                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={userData.pseudo}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setPseudo(text)}
                        value={pseudo}
                        autoCapitalize="none"
                    />
                </View>
            </View>


            {/* Le Prénom */}
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        color: isDarkMode ? "#FFFFFF" : "black",
                        fontWeight: '500',
                    }}>{t("FirsName")}</Text>
                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={userData.firstName}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            {/* Le Nom */}
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        color: isDarkMode ? "#FFFFFF" : "black",
                        fontWeight: '500',
                    }}>{t("LastName")}</Text>
                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={userData.lastName}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            {/* Le Mot de passe */}
            <View>
                <Text
                    style={{
                        fontSize: 18,
                        color: isDarkMode ? "#FFFFFF" : "black",
                        fontWeight: '500',
                    }}>{t("Password")}</Text>
                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={t("Enter")}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        autoCapitalize="none"
                    />
                </View>
            </View>


            {/* Le nouveau mot de passe */}
            <View>

                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={t("EnterNewPass")}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                        autoCapitalize="none"
                    />
                </View>
            </View>


            {/* Confirmer le nouveau mot de passe */}

            <View>

                <View
                    style={{
                        width: inputWidthSize,
                        height: inputHeightSize,
                        borderRadius: 10,
                        borderColor: "#2e2e2d",
                        borderWidth: 1,
                        overflow: "hidden",
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingLeft: 14,
                    }}>
                    <TextInput
                        style={{
                            width: '90%',
                            height: "100%",
                            fontSize: 16,
                            borderColor: "white",
                            //backgroundColor:"red"
                        }}
                        keyboardType="default"
                        placeholder={t("EnterConfirmNewPass")}
                        placeholderTextColor="gray"
                        onChangeText={(text) => setConfirmNewPassword(text)}
                        value={confirmNewPassword}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            <Pressable
                onPress={OkData}
                style={{
                    width: 150,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                }}>
                <Text
                    style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: '500',
                    }}>{t("Update")}</Text>
            </Pressable>
        </View>
    )
}

export default UserTools