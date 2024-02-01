import React from "react";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NewPostScreen from "../screens/NewPostScreen/NewPostScreen";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const MaterialTopNavigation = () => {
    return (
        <View style={{ flex: 1 }}>

            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
            </Tab.Navigator>
        </View>

    );
}

export default MaterialTopNavigation;