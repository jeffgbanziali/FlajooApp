import { View, Text } from 'react-native'
import React from 'react'
import { dateParser, FormationDateParser } from '../../Context/Utils'

const Education = ({ education }) => {
    return (
        <View
            style={{
                width: "100%",
                height: 300,
                paddingTop: 10,
                flexDirection: "row"
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
                        backgroundColor: "red",
                    }}>

                </View>
            </View>
            <View
                style={{
                    width: "80%",
                    height: 80,
                    marginTop: 10,
                }}>
                <View
                    style={{
                        width: "80%",
                        paddingLeft: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "white",
                            fontWeight: '600',
                        }}>
                        {education[0].institution}
                    </Text>
                    <Text
                        style={{
                            paddingTop: 2,
                            fontSize: 15,
                            color: "white",
                            fontWeight: '400',
                        }}>
                        {education[0].degree}
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
                            {FormationDateParser(education[0].startDate)}{" - "}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "gray",
                                fontWeight: '500',
                            }}>
                            {FormationDateParser(education[0].endDate)}
                        </Text>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default Education