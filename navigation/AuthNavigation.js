import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import AccountVerify from "../screens/SignUpScreen/AccountVerify";
import StartPage from "../screens/StartPage/StartPage";
import VerifyViaStartPage from "../screens/StartPage/VerifyViaStartPage";


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Start" component={StartPage} />
            <Stack.Screen name="Signin" component={SignInScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="VerifyStartPage" component={VerifyViaStartPage} />
            <Stack.Screen name="Changepassword" component={ForgotPasswordScreen} />


        </Stack.Navigator >
    );
};

export default AuthNavigation;
