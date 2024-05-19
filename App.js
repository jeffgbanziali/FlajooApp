import React, { useState, useEffect, useRef, useContext } from "react";
import { StatusBar } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import axios from "axios";
import { DarkModeProvider, UidContext, useDarkMode } from "./components/Context/AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";
import rootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { getUsers } from "./actions/users.action";
import { getPosts } from "./actions/post.actions";
import { getStories } from "./actions/story.action";
import { getVideoReels } from "./actions/réels.action";
import { NavigationContainer } from "@react-navigation/native";
import { APP_API_URL, MESSAGE_ADRESS_IP } from "./config";
import AuthNavigation from "./navigation/AuthNavigation";
import FirstNavigation from "./navigation/FirstNavigation";
import Loading from "./components/Loading/Loading";
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';
import { useOnlineStatus, OnlineStatusProvider } from "./components/Context/OnlineContext";



const App = () => {

    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk,))
    );


    const connectToRemoteDebugger = () => {
        NativeDevSettings.setIsDebuggingRemotely(true);
    };


    connectToRemoteDebugger()


    store.dispatch(getUsers());
    store.dispatch(getPosts());
    store.dispatch(getStories());
    store.dispatch(getVideoReels());

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





const AppW = () => {

    const [uid, setUid] = useState(null);

    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);

    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();
    const { isConnected, isInternetConnected } = useOnlineStatus();

    console.log("est qu'il est en ligne ? ", isConnected, "est ce que tues connecté ?", isInternetConnected)

    useEffect(() => {
        AsyncStorage.getItem('uid')
            .then((storedUid) => {
                if (storedUid) {
                    setIsFirstTime(false);
                }
            });
    }, [isFirstTime]);

    useEffect(() => {
        const fetchToken = async () => {
            setIsLoadingApp(true)
            try {
                const response = await axios({
                    method: "get",
                    url: `${APP_API_URL}/jwtid`,
                    withCredentials: true,
                });
                setUid(response.data);
                AsyncStorage.setItem('uid', response.data);
                AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
            } catch (error) {
                console.log("No token", error);
            }

            finally {
                setIsLoadingApp(false);
            }
        };

        fetchToken();
        if (uid) {
            dispatch(getUser(uid));
        }

        if (uid === null && isLoadingApp) {
            <Loading />
        }


    }, [isDarkMode, uid, dispatch]);

    return (


        <UidContext.Provider value={{ uid, setUid }}>

            {
                isLoadingApp ?
                    <Loading /> :
                    <NavigationContainer>

                        {

                            isFirstTime ?
                                <FirstNavigation />
                                : uid ?
                                    <StackNavigation />

                                    :
                                    <AuthNavigation />

                        }
                    </NavigationContainer>
            }

            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
            />
        </UidContext.Provider>

    );
};


export default App;




