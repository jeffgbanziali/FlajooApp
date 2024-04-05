import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Button, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, SafeAreaView, Alert, TextInput } from 'react-native';
import { darkBlue, darkRose } from '../../components/Button/Constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../components/Context/AppContext';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { APP_API_URL } from '../../config';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-neat-date-picker'
import CountryPicker from 'react-native-country-picker-modal';


const data = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
];




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const [pseudo, setPseudo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)



    // iPhone 15 Pro (standard)
    const iPhone15ProWidth = 393; // Largeur de l'écran de l'iPhone 15 Pro
    const iPhone15ProHeight = 852; // Hauteur de l'écran de l'iPhone 15 Pro

    // iPhone 15 Pro Max
    const iPhone15ProMaxWidth = 430; // Largeur de l'écran de l'iPhone 15 Pro Max
    const iPhone15ProMaxHeight = 932; // Hauteur de l'écran de l'iPhone 15 Pro Max

    // iPhone SE (3rd génération)
    const iPhoneSEWidth = 375; // Largeur de l'écran de l'iPhone SE (3rd génération)
    const iPhoneSEHeight = 667; // Hauteur de l'écran de l'iPhone SE (3rd génération)

    // Ajustement des mesures en fonction des appareils
    const inputWidthSize = windowWidth * 0.85;
    const inputHeightSize = windowHeight * 0.056;

    const containerPersoWidthSize = windowWidth * 0.4;
    const containerPersoHeightSize = windowHeight * 0.35;

    const containerInfosWidthSize = windowWidth * 0.75;
    const containerInfosHeightSize = windowHeight * 0.25;

    const containerAdressWidthSize = windowWidth * 0.75;
    const containerAdressHeightSize = windowHeight * 0.4;

    // Fonction pour ajuster les mesures en fonction de l'appareil
    const adjustMeasurement = (measurement, baseWidth, targetWidth) => {
        return (measurement / baseWidth) * targetWidth;
    };

    // Ajuster les mesures en fonction des appareils cibles
    const adjustedInputWidthSize = adjustMeasurement(inputWidthSize, iPhone15ProWidth, windowWidth);
    const adjustedInputHeightSize = adjustMeasurement(inputHeightSize, iPhone15ProHeight, windowHeight);

    const adjustedContainerPersoWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, iPhone15ProMaxWidth, iPhone15ProWidth, windowWidth);
    const adjustedContainerPersoHeightSize = adjustMeasurement(containerPersoHeightSize, iPhoneSEHeight, iPhone15ProHeight, iPhone15ProMaxHeight, windowHeight);

    const adjustedContainerInfosWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, iPhone15ProMaxWidth, iPhone15ProWidth, windowWidth);
    const adjustedContainerInfosHeightSize = adjustMeasurement(containerInfosHeightSize, iPhoneSEHeight, iPhone15ProHeight, iPhone15ProMaxHeight, windowHeight);

    const adjustedContainerAdressWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, iPhone15ProMaxWidth, iPhone15ProWidth, windowWidth);
    const adjustedContainerAdressHeightSize = adjustMeasurement(containerAdressHeightSize, iPhoneSEHeight, iPhone15ProHeight, iPhone15ProMaxHeight, windowHeight);






    const openDatePickerSingle = () => setShowDatePickerSingle(true)

    const onCancelSingle = () => {
        setShowDatePickerSingle(false)
    }

    const onConfirmSingle = (output) => {
        setShowDatePickerSingle(false);

        console.log("the day", output);
        const selectedDate = new Date(output.dateString);
        setBirthDate(selectedDate);
    };


    const onSelectCountry = (nationality) => {
        setNationality(nationality);
        setModalVisible(false);
    };




    const handleSignUp = async () => {
        const data = {
            pseudo,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            phoneNumber,
            birthDate,
            nationality,
            homeAddress: {
                streetNumber,
                streetName,
                city,
                state,
                department,
                region,
                postalCode,
                country
            }
        };
        try {
            const url = `${APP_API_URL}/api/user/register`;


            // Validate the form data
            if (pseudo === '') {
                Alert.alert("Please enter your pseudo");
                return;
            }

            if (firstName === '') {
                Alert.alert("Please enter your first name");
                return;
            }

            if (lastName === '') {
                Alert.alert("Please enter your last name");
                return;
            }

            if (email === '') {
                Alert.alert("Please enter your email");
                return;
            }

            if (!EMAIL_REGEX.test(email)) {
                Alert.alert("Please enter a valid email");
                return;
            }

            if (password === '') {
                Alert.alert("Please enter your password");
                return;
            }

            if (confirmPassword === '') {
                Alert.alert("Please confirm your password");
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
            }

            if (phoneNumber === '') {
                Alert.alert("Please enter your phone number");
                return;
            }

            // Send the data to the server
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Handle the server response
            if (response.status === 201) {
                alert("User created successfully");
                console.log(response);
                navigation.navigate("Signin");
            } else {
                alert("An error ");
                console.log(response);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        }
    };

    const showConfirmPassword = () => {
        setShowConfirmPass(!showConfirmPass);
    }
    const showPassword = () => {
        setShowPass(!showPass);
    }



    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                backgroundColor: isDarkMode ? "#171717" : "white",
                alignItems: 'center',
                justifyContent: 'center',
                height: "100%"
            }}
        >

            <SafeAreaView
                style={{
                    height: "100%",
                    width: "100%",
                }}

            >
                <ScrollView
                    showsVerticalScrollIndicator={false}>

                    <View
                        style={{
                            width: "100%",
                            height: 150,
                            padding: 2,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 100

                            }}
                            source={require("../../assets/Logos/ios/1212.png")} />
                    </View>


                    <View
                        style={{
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}
                    >

                        <Text
                            style={{
                                fontSize: 20,
                                color: isDarkMode ? "#FFFFFF" : "black",
                                fontWeight: 'bold',
                                marginVertical: 2,
                                marginBottom: 16
                            }}>
                            {t('CreateAccount')}
                        </Text>

                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                //backgroundColor: "green",
                                justifyContent: 'center',
                                height: adjustedContainerPersoHeightSize,

                            }}>
                            <View
                                style={{
                                    width: inputWidthSize,
                                    //backgroundColor: "red",
                                    justifyContent: "center",
                                    paddingLeft: 6


                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: isDarkMode ? "#FFFFFF" : "black",
                                        fontWeight: '500',
                                    }}>
                                    {t('PersonalInfo')}
                                </Text>
                            </View>

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    marginTop: 6,
                                    width: inputWidthSize,
                                }}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Gender"
                                    value={value}
                                    onChange={item => {
                                        setValue(item.value);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                    )}
                                    renderItem={renderItem}
                                />
                            </View>

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t('Pseudo')}
                                    placeholderTextColor='gray'
                                    value={pseudo}
                                    onChangeText={(text) => setPseudo(text)}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                            </View>




                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t('FirstName')}
                                    placeholderTextColor='gray'
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                            </View>


                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '85%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t("LastName")}
                                    placeholderTextColor='gray'
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                            </View>


                            <DatePicker
                                isVisible={showDatePickerSingle}
                                mode={'single'}
                                onCancel={onCancelSingle}
                                onConfirm={onConfirmSingle}
                            />

                            <TouchableOpacity
                                onPress={openDatePickerSingle}
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>


                                {birthDate ?
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: isDarkMode ? 'black' : "black",
                                        }}>{birthDate.toLocaleDateString(t('dateLanguage'))}</Text> :
                                    <>
                                        <View style={{
                                            paddingRight: 6
                                        }}>
                                            <Ionicons name="calendar-outline" size={24} color="gray" />

                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: isDarkMode ? 'gray' : "black",
                                            }}>
                                            {t('birthDate')}
                                        </Text>
                                    </>


                                }


                            </TouchableOpacity>



                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>

                                {nationality ?
                                    <>

                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: isDarkMode ? 'black' : "black",
                                            }}>{nationality.name}
                                        </Text>
                                    </>
                                    :
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: isDarkMode ? 'gray' : "black",
                                        }}>
                                        {t('SelectNationality')}
                                    </Text>
                                }

                            </TouchableOpacity>

                            <CountryPicker
                                withFlag
                                withCountryNameButton
                                withCallingCodeButton
                                withAlphaFilter
                                onSelect={onSelectCountry}
                                visible={modalVisible}
                                onClose={() => setModalVisible(false)}
                                containerButtonStyle={styles.countryPickerContainer}
                                modalProps={{ animationType: 'slide', transparent: true }}
                            />

                        </View>




                        <View
                            style={{
                                width: "100%",
                                height: adjustedContainerInfosHeightSize,
                                alignItems: "center",
                                //backgroundColor: "blue",
                                justifyContent: 'center',

                            }}>
                            <View
                                style={{
                                    width: inputWidthSize,
                                    height: "10%",
                                    //backgroundColor: "red",
                                    justifyContent: "center",
                                    paddingLeft: 6


                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: isDarkMode ? "#FFFFFF" : "black",
                                        fontWeight: '500',
                                    }}>
                                    {t('AccountInfo')}
                                </Text>
                            </View>

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t('Email')}
                                    placeholderTextColor='gray'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}

                                />
                            </View >

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    justifyContent: "center",
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '85%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t('Password')}
                                    placeholderTextColor='gray'
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    secureTextEntry={!showPass}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <View
                                    style={{
                                        width: '15%',
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <Pressable
                                        onPress={showPassword}
                                    >
                                        {
                                            showPass ?
                                                <Ionicons name="eye" size={22} color="gray" /> :
                                                <Ionicons name="eye-off" size={22} color="gray" />
                                        }
                                    </Pressable>

                                </View>
                            </View>

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    justifyContent: "center",
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '85%',
                                        height: "100%",
                                        fontSize: 16
                                    }}
                                    placeholder={t('ConfirmPass')}
                                    placeholderTextColor='gray'
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={!showConfirmPass}
                                />
                                <View
                                    style={{
                                        width: '15%',
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <Pressable
                                        onPress={showConfirmPassword}
                                    >
                                        {
                                            showConfirmPass ?
                                                <Ionicons name="eye" size={22} color="gray" /> :
                                                <Ionicons name="eye-off" size={22} color="gray" />
                                        }
                                    </Pressable>

                                </View>
                            </View>

                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    borderColor: "#2e2e2d",
                                    borderWidth: 1,
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    paddingLeft: 14,
                                    width: inputWidthSize,
                                    flexDirection: "row"
                                }}>
                                <TextInput
                                    style={{
                                        width: '90%',
                                        height: "100%",
                                        fontSize: 16,
                                    }}
                                    placeholder={t('PhoneNumb')}
                                    placeholderTextColor='gray'
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                        </View>




                        <View
                            style={{
                                width: "100%",
                                height: adjustedContainerAdressHeightSize,
                                alignItems: "center",
                                //backgroundColor: "red"

                            }}>

                            <View
                                style={{
                                    width: inputWidthSize,
                                    //backgroundColor: "pink",
                                    justifyContent: "center",
                                    paddingLeft: 6


                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: isDarkMode ? "#FFFFFF" : "black",
                                        fontWeight: '500',
                                    }}>
                                    {t('Adress')}
                                </Text>
                            </View>



                            <View
                                style={{
                                    height: inputHeightSize,
                                    borderRadius: 10,
                                    marginTop: 6,
                                    marginLeft: 30,
                                    marginRight: 30,
                                    justifyContent: "space-between",
                                    width: inputWidthSize,
                                    flexDirection: "column"
                                }}>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: inputWidthSize,
                                        justifyContent: "space-between",
                                        height: inputHeightSize,
                                    }}
                                >


                                    <View
                                        style={{
                                            width: "20%",
                                            height: inputHeightSize,
                                            backgroundColor: "white",
                                            paddingLeft: 10,
                                            alignItems: "stretch",
                                            borderRadius: 10,
                                            borderColor: "#2e2e2d",
                                            borderWidth: 1,
                                        }}>
                                        <TextInput
                                            style={{
                                                width: '90%',
                                                height: "100%",
                                                fontSize: 16,
                                            }}
                                            placeholder={t('Number')}
                                            placeholderTextColor='gray'
                                            value={streetNumber}
                                            onChangeText={(text) => setStreetNumber(text)}
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>


                                    <View
                                        style={{
                                            width: "78%",
                                            height: inputHeightSize,
                                            backgroundColor: "white",
                                            borderRadius: 10,
                                            borderColor: "#2e2e2d",
                                            borderWidth: 1,
                                            paddingLeft: 14,
                                        }}>
                                        <TextInput
                                            style={{
                                                width: '90%',
                                                height: "100%",
                                                fontSize: 16,
                                            }}
                                            placeholder={t('streetName')}
                                            placeholderTextColor='gray'
                                            value={streetName}
                                            onChangeText={(text) => setStreetName(text)}
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('postalCode')}
                                        placeholderTextColor='gray'
                                        value={postalCode}
                                        onChangeText={(text) => setPostalCode(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>

                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('City')}
                                        placeholderTextColor='gray'
                                        value={city}
                                        onChangeText={(text) => setCity(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>


                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('state')}
                                        placeholderTextColor='gray'
                                        value={state}
                                        onChangeText={(text) => setState(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>

                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('department')}
                                        placeholderTextColor='gray'
                                        value={department}
                                        onChangeText={(text) => setDepartment(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>




                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('region')}
                                        placeholderTextColor='gray'
                                        value={region}
                                        onChangeText={(text) => setRegion(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>

                                <View
                                    style={{
                                        height: inputHeightSize,
                                        borderRadius: 10,
                                        marginTop: 6,
                                        justifyContent: "space-between",
                                        width: inputWidthSize,
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        paddingLeft: 14,

                                    }}>
                                    <TextInput
                                        style={{
                                            width: '90%',
                                            height: "100%",
                                            fontSize: 16,
                                        }}
                                        placeholder={t('country')}
                                        placeholderTextColor='gray'
                                        value={country}
                                        onChangeText={(text) => setCountry(text)}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>


                            </View>

                        </View>




                        <TouchableOpacity
                            style={{
                                backgroundColor: "#FF1C1C",
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 10,
                                width: 120,
                                height: 48,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={handleSignUp}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                {t('ButtonRegis')}
                            </Text>
                        </TouchableOpacity>


                        <View style={styles.footerView}>
                            <Text style={{
                                fontSize: 16,
                                color: isDarkMode ? "#FFFFFF" : "black",
                            }}>{t('HaveAccount')}{" "}
                                <Text
                                    onPress={() => navigation.navigate("Signin")}
                                    style={{
                                        color: isDarkMode ? "#2D75FF" : "#74A0F4",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }}>
                                    {t('ButtonSignin')}
                                </Text>
                            </Text>
                        </View>






                    </View>


                </ScrollView>


            </SafeAreaView>
        </KeyboardAvoidingView >

    );
}





const inputWidthSize = windowWidth * 0.75;
const inputHeightSize = windowHeight * 0.056;




const styles = StyleSheet.create(


    {



        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: darkRose,
            marginBottom: 30,
        },
        error: {
            color: 'red',
            fontSize: 12,
            marginBottom: 10,
            marginLeft: 30,
            marginRight: 30,
        },
        input: {
            height: inputHeightSize,
            borderRadius: 10,
            borderColor: "#2e2e2d",
            borderWidth: 1,
            backgroundColor: "white",

            marginTop: 6,
            marginBottom: 10,
            paddingLeft: 14,
            width: inputWidthSize,
        },
        button: {
            backgroundColor: "red",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            width: 120,
            height: 46,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center'
        },
        buttonTitle: {
            color: 'white',
            fontSize: 16,
            fontWeight: "bold"
        },
        footerView: {
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
        },



        dropdown: {
            height: inputHeightSize,
            width: 100,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
        },

        icon: {
            marginRight: 5,
        },

        item: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        textItem: {
            flex: 1,
            fontSize: 18,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
        countryPickerContainer: {
            position: 'absolute',
            top: 50,
            left: 30,
        },

    })

export default SignUpScreen;
