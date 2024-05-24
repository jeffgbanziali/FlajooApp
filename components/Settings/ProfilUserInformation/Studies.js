import { View, Text, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../Context/AppContext';
import { TextInput } from 'react-native';
import axios from 'axios';

const Studies = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const [disciplines, setDisciplines] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [universities, setUniversities] = useState([]);

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
            <View
                style={{
                    width: "100%",
                    height: 40,
                    justifyContent: "center",
                    paddingLeft: 10
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: '500',
                    }}>
                    Vos formations
                </Text>
            </View>

        </View>
    )
}

export default Studies