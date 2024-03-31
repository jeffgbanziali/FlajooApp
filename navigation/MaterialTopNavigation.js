import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import PostsUser from "../components/ProfileUtils.js/PostsUser";
import { useDarkMode } from "../components/Context/AppContext";
import VideoRéelsUser from "../components/ProfileUtils.js/VideoRéelsUser";

const Tab = createMaterialTopTabNavigator();

const MaterialTopNavigation = () => {



    const { isDarkMode } = useDarkMode();



    return (
        <Tab.Navigator
            style={{

                paddingTop: StatusBar.currentHeight
            }}
            screenOptions={{
                tabBarStyle: {
                    display: "flex",
                    backgroundColor: isDarkMode ? "#171717" : "white",
                },
            }}

        >
            <Tab.Screen
                options={{
                    title: ({ color, focused }) => (
                        <AntDesign
                            size={25}
                            name={focused ? 'appstore1' : 'appstore-o'}
                            color={focused ? 'blue' : 'gray'}
                        />
                    ),
                }}
                component={PostsUser}
                name='PostProfile'
            />
            <Tab.Screen
                options={{
                    title: ({ color, focused }) => (
                        <Ionicons
                            size={25}
                            name={focused ? 'videocam' : 'videocam-outline'}
                            color={focused ? 'blue' : 'gray'}
                        />
                    ),
                }}
                component={VideoRéelsUser}
                name='ReelsProfile'
            />
            <Tab.Screen
                options={{
                    title: ({ color, focused }) => (
                        <Ionicons
                            size={25}
                            name={focused ? 'heart' : 'heart-outline'}
                            color={focused ? 'blue' : 'gray'}
                        />
                    ),
                }}
                component={SignInScreen}
                name='Signup'
            />


        </Tab.Navigator>


    );
}

export default MaterialTopNavigation;