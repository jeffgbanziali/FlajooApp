import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import axios from "axios";
import { DarkModeProvider, UidContext, useDarkMode } from "./components/Context/AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";
import { getUsers } from "./actions/users.action";
import { getPosts } from "./actions/post.actions";
import { getStories } from "./actions/story.action";
import { getVideoReels } from "./actions/réels.action";
import rootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./navigation/AuthNavigation";
import FirstNavigation from "./navigation/FirstNavigation";
import Loading from "./components/Loading/Loading";
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import { useOnlineStatus, OnlineStatusProvider } from "./components/Context/OnlineContext";
import { APP_API_URL } from "./config";

// Création du store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// Configuration axios interceptor
axios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const App = () => {

    useEffect(() => {
        const connectToRemoteDebugger = () => {
            NativeDevSettings.setIsDebuggingRemotely(true);
        };
        connectToRemoteDebugger();
    }, []);

    return (
        <Provider store={store}>
            <DarkModeProvider>
                <OnlineStatusProvider>
                    <AppW />
                </OnlineStatusProvider>
            </DarkModeProvider>
        </Provider>
    );
};

const AppW = () => {
    const [uid, setUid] = useState(null);
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);

    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { isConnected, isInternetConnected } = useOnlineStatus();

    useEffect(() => {
        console.log('useEffect AsyncStorage.getItem uid');
        AsyncStorage.getItem('uid')
            .then((storedUid) => {
                if (storedUid) {
                    console.log('Stored UID found:', storedUid);
                    setUid(storedUid);
                    setIsFirstTime(false);
                }
            })
            .catch((error) => {
                console.error('Error getting UID from AsyncStorage:', error);
            });
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            console.log('useEffect fetchToken');
            setIsLoadingApp(true);
            try {
                const response = await axios.get(`${APP_API_URL}/jwtid`, { withCredentials: true });
                console.log('Token fetched, setting UID:', response.data);
                if (response.data) {
                    setUid(response.data);
                    await AsyncStorage.setItem('uid', response.data);
                }
            } catch (error) {
                console.log("No token", error);
            } finally {
                setIsLoadingApp(false);
            }
        };
        fetchToken();
    }, []);

    const updateUserData = useCallback(() => {
        if (uid) {
            console.log('useEffect dispatch actions with UID:', uid);
            dispatch(getUser(uid));
            dispatch(getUsers());
            dispatch(getPosts(uid));
            dispatch(getStories());
            dispatch(getVideoReels());
        }
    }, [uid, dispatch]);

    // Dispatch actions lorsqu'on a l'UID
    useEffect(() => {
        updateUserData();
    }, [updateUserData]);

    console.log("Viens ici, kondo", uid)

    if (!isConnected && !isInternetConnected) {
        return <Loading />;
    }

    return (
        <UidContext.Provider value={{ uid, setUid }}>
            {
                isLoadingApp ? <Loading /> : (
                    <NavigationContainer>
                        {isFirstTime ? (
                            uid ? <StackNavigation /> : <FirstNavigation />
                        ) : (
                            uid ? <StackNavigation /> : <AuthNavigation />
                        )}
                    </NavigationContainer>
                )
            }
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        </UidContext.Provider>
    );
};

export default App;
