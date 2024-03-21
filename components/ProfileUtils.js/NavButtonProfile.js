import React, { useEffect } from 'react';
import { View } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const NavButtonProfile = ({ onSwitchChange }) => {


    useEffect(() => {
        onSwitchChange("P");
    }, [onSwitchChange]);

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: "red"
            }}
        >

            <SwitchSelector
                initial={0}
                fontSize={16}
                fontStyle="normal"
                fontWeight={600}
                onPress={value => onSwitchChange(value)}
                backgroundColor="#494747"
                textColor="#FFFFFF"
                selectedColor="#FFFFFF"
                buttonColor="#3B4FB8"
                borderColor="#494747"
                borderWidth={2}
                hasPadding
                options={[
                    { label: "Post ", value: "P" },
                    { label: "Réels", value: "V" },
                    { label: "Favoris", value: "A" },
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
                style={{
                    width: "90%",
                    borderRadius: 10,
                    margin: 20,
                    marginBottom: 20,
                }}
            />
        </View>
    );
}

export default NavButtonProfile;