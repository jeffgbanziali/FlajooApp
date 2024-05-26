import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDarkMode } from '../../../components/Context/AppContext';
import { FormationDateParser } from '../../../components/Context/Utils';

const ExperienceTools = ({ experience }) => {


    const { isDarkMode } = useDarkMode();
    const { t } = useTranslation();

    const description = experience.description


    return (
        <View
            style={{
                width: "100%",
                paddingTop: 10,
                flexDirection: "row",
                borderBottomWidth: 1,
                backgroundColor: isDarkMode ? "#171717" : "white",
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
                    <MaterialIcons
                        name="work-outline"
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
                        {experience.company}
                    </Text>
                    <Text
                        style={{
                            paddingTop: 2,
                            fontSize: 15,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: '400',
                        }}>
                        {experience.role}
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
                            {FormationDateParser(experience.startDate)}{" - "}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "gray",
                                fontWeight: '500',
                            }}>
                            {FormationDateParser(experience.endDate)}
                        </Text>
                    </View>

                </View>

                <View
                    style={{
                        width: "100%",
                        paddingLeft: 10,
                        marginBottom: 10
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: isDarkMode ? "white" : "black",
                            fontWeight: '400', paddingRight: 10
                        }}>
                        {description}
                    </Text>

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
                        {t('Skills')}{experience.skills}
                    </Text>

                </View>

            </View>

        </View>


    )
}

export default ExperienceTools