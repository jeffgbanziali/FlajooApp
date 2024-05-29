import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { UidContext, useDarkMode } from '../../../components/Context/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from "react-i18next";
import { addExperience, getUser } from "../../../actions/user.action";
import { useDispatch } from "react-redux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddExperience = ({ showModal }) => {
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();
    const { uid } = useContext(UidContext)
    const containerWidthSize = windowWidth * 0.88;
    const containerHeightSize = windowHeight * 0.40;

    const inputWidthSize = windowWidth * 0.90;
    const inputHeightSize = windowHeight * 0.056;

    // States for form inputs
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [skills, setSkills] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [loadUsers, setLoadUsers] = useState(true);

    useEffect(() => {
        if (loadUsers) {
            dispatch(getUser(uid));
            setLoadUsers(false);
        }
    }, [loadUsers, dispatch]);

    const handleClickReturnProfile = () => {
        console.log("clicked home");
        showModal();
        setLoadUsers(true);
    };

    const handleAddExperience = async () => {
        setIsLoading(true);
        const experience = {
            company,
            role,
            description,
            startDate,
            endDate,
            skills,
        };

        try {
            await dispatch(addExperience(uid, experience));
            console.log('Experience added successfully');
            setTimeout(() => {
                setConfirmationMessage('Expérience ajoutée avec succès !');
            }, 2500);
        } catch (error) {
            console.error('Failed to add experience', error);
            setConfirmationMessage('Échec de l\'ajout de l\'expérience');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
    };

    const renderTextInput = (placeholder, value, onChangeText) => (
        <View
            style={{
                width: inputWidthSize,
                height: inputHeightSize,
                borderRadius: 10,
                borderColor: "#2e2e2d",
                borderWidth: 1,
                overflow: "hidden",
                backgroundColor: "white",
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 14,
            }}
        >
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="gray"
                style={{
                    width: '90%',
                    height: "100%",
                    fontSize: 16,
                    borderColor: "white",
                }}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
            }}>
            <View
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity onPress={handleClickReturnProfile}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 30,
                        }}>
                        <MaterialIcons
                            name="arrow-back"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: "bold",
                            marginVertical: 10,
                            textAlign: 'center',
                        }}>
                        Ajouter une expérience
                    </Text>

                    {renderTextInput("Entreprise", company, setCompany)}
                    {renderTextInput("Rôle", role, setRole)}
                    {renderTextInput("Description", description, setDescription)}
                    {renderTextInput("Date de début", startDate, setStartDate)}
                    {renderTextInput("Date de fin", endDate, setEndDate)}
                    {renderTextInput("Compétences", skills, setSkills)}

                    <TouchableOpacity
                        onPress={handleAddExperience}
                        style={{
                            backgroundColor: isDarkMode ? "red" : "#000",
                            padding: 15,
                            width: 300,
                            borderRadius: 10,
                            alignItems: "center",
                            marginTop: 20,
                        }}>
                        {
                            isLoading ?

                                <ActivityIndicator
                                    textAlign="center"
                                    size={"large"}
                                    color={isDarkMode ? "white" : "black"} />
                                :
                                <Text style={{ color: "white", fontSize: 18 }}>
                                    Sauvegarder
                                </Text>
                        }

                    </TouchableOpacity>

                    {confirmationMessage && (
                        <View
                            style={{
                                width: 350,
                                height: 60,
                                borderRadius: 15,
                                marginTop: 50,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: isDarkMode ? "#171717" : "white",
                            }}>
                            <Text
                                style={{
                                    color: isDarkMode ? "white" : "black",
                                    fontSize: 16,
                                }}>
                                {confirmationMessage}
                            </Text>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginLeft: 10,
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <AntDesign
                                    name="checkcircleo"
                                    size={24}
                                    color={isDarkMode ? "green" : "green"}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddExperience;
