import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UidContext, useDarkMode } from '../../../../Context/AppContext';


const QRCode = () => {

    const { isDarkMode } = useDarkMode();

    return (
        <View
            style={{
                width: 90,
                height: 90,
                alignItems: "center",
                justifyContent: "space-between"

            }}>
            <View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    //backgroundColor: "blue",
                    borderWidth: 3,
                    borderColor: isDarkMode ? "gray" : "lightgray",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                <AntDesign
                    name="qrcode"
                    size={24}
                    color={isDarkMode ? "#F5F5F5" : "black"}

                />
            </View>
            <Text
                style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 14
                }}
            >
                Code QR
            </Text>

        </View>
    )
}

export default QRCode