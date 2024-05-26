import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { dateParser, FormationDateParser } from '../../Context/Utils'
import { useTranslation } from 'react-i18next';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from '../../Context/AppContext';

const Education = ({ education }) => {


    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };
    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const maxLength = 100;
    const description = education.description


    return (
        <View
            style={{
                width: "100%",
                paddingTop: 10,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "gray"
            }}>
            <View
                style={{
                    width: "20%",
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <View
                    style={{
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Ionicons
                        name="school-outline"
                        size={40}
                        color={isDarkMode ? "white" : "black"}
                    />
                </View>
            </View>
            <View
                style={{
                    width: "80%",
                    marginTop: 10,
                }}>
                <View
                    style={{
                        width: "100%",
                        paddingLeft: 10,
                        marginBottom: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: '600',
                        }}>
                        {education.institution}
                    </Text>
                    <Text
                        style={{
                            paddingTop: 2,
                            fontSize: 15,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: '400',
                        }}>
                        {education.degree}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            paddingTop: 2,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "gray",
                                fontWeight: '500',
                            }}>
                            {FormationDateParser(education.startDate)}{" - "}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "gray",
                                fontWeight: '500',
                            }}>
                            {FormationDateParser(education.endDate)}
                        </Text>
                    </View>

                </View>

                <View style={{ width: "100%", paddingLeft: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: isDarkMode ? "white" : "black", fontWeight: '400', paddingRight: 10 }}>
                        {showFullText ? description : `${description.substring(0, maxLength)}${description.length > maxLength ? '...' : ''}`}
                    </Text>
                    {description.length > maxLength && (
                        <TouchableOpacity onPress={toggleText}>
                            <Text style={{ color: "lightblue", marginTop: 5 }}>
                                {showFullText ? "Afficher moins" : "Afficher plus"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View
                    style={{
                        width: "100%",
                        paddingLeft: 10,
                        marginBottom: 10,

                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: '600',
                            paddingRight: 10,
                        }}>
                        {t('Skills')}{education.skills}
                    </Text>

                </View>

            </View>

        </View>


    )
}

export default Education