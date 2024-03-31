import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import { useDarkMode } from "../components/Context/AppContext";
import PostsFriendsUser from "../components/ProfileFriendsUtils/PostsFriendsUser";
import VideoRéelsFriendsUser from "../components/ProfileFriendsUtils/VideoRéelsFriendsUser";

const Tab = createMaterialTopTabNavigator();

const MaterialTopFriendsNavigation = ({ users }) => {



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
                component={() => <PostsFriendsUser users={users} />}
                name='PostFiendsProfile'
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
                component={() => <VideoRéelsFriendsUser users={users} />}
                name='ReelsFriendsProfile'
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

export default MaterialTopFriendsNavigation;