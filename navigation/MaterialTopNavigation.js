import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from "../screens/Profile/Profile";
import Settings from "../screens/Settings/Settings";
import CreateStory from "../components/homepage/Stories/CreateMyStory";
import { View } from "react-native-animatable";

const Tab = createMaterialTopTabNavigator();

function MaterialTopNavigation() {
    return (
        <View>
            <Tab.Navigator>
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Settings" component={Settings} />
                <Tab.Screen name="StoryCreate" component={CreateStory} />
            </Tab.Navigator>
        </View>


    );
}

export default MaterialTopNavigation;