import { View, Text, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../Context/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Education from '../ProfilsUserTools/Education';
import { FlatList } from 'react-native';

const Studies = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const [disciplines, setDisciplines] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [universities, setUniversities] = useState([]);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        const fetchSecteurs = async () => {
            try {
                const data = require('../../../Data/ActivitySector.json');
                setSecteurs(data.ActivitySector);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSecteurs();
    }, []);


    const [showFullEducation, setShowFullEducation] = useState(false);

    const toggleText = () => {
        console.warn("Je suis là")
    };



    return (
        <View
            style={{
                width: "100%",
                backgroundColor: isDarkMode ? "#2C2C2C" : "#E6E6E6",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
            }}>

            <View
                style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    paddingLeft: 10,
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}>
                <Text
                    style={{
                        fontSize: 24,
                        color: "white",
                        fontWeight: '500',
                    }}>
                    {t('Education')}
                </Text>

                <View
                    style={{
                        width: 120,
                        height: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Feather
                            name="plus"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                        <Octicons
                            name="pencil"
                            size={20}
                            color={isDarkMode ? "white" : "black"}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            {
                userData.education.length > 0 ? (
                    <>

                        <FlatList
                            data={userData.education}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => {
                                return (
                                    <Education education={item} />
                                )
                            }}

                        />
                        {userData.education.length > 1 && (
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onPress={toggleText}>
                                <Text style={{
                                    color: isDarkMode ? "white" : "black",
                                    fontWeight: '600',
                                    fontSize: 16,
                                }}>
                                    Afficher les {userData.education.length} formations
                                </Text>
                            </TouchableOpacity>
                        )}

                    </>
                ) :
                    (
                        <View
                            style={{
                                width: "100%",
                                height: 60,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "white",
                                    fontWeight: '500',
                                    fontWeight: '500',
                                }}>
                                Ajouter vos formations
                            </Text>
                        </View>
                    )
            }

        </View>
    )
}

export default Studies