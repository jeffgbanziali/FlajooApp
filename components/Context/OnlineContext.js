import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { MESSAGE_ADRESS_IP } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../actions/user.action';
import { UidContext } from './AppContext';

// Créer le contexte
const OnlineStatusContext = createContext();

export const useOnlineStatus = () => useContext(OnlineStatusContext);

export const OnlineStatusProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const socket = useRef(null);
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeNetInfo = NetInfo.addEventListener(state => {
            setIsInternetConnected(state.isConnected);

            //console.log("Ma connexion est là", state)
        });

        return () => {
            unsubscribeNetInfo();
        };
    }, []);




    useEffect(() => {
        const fetchUid = async () => {
            const storedUid = await AsyncStorage.getItem("uid") || await AsyncStorage.getItem("user")

            setUid(storedUid);
        };

        fetchUid();

    }, []);

    useEffect(() => {
        dispatch(getUser(uid));
    }, [dispatch, uid]);





    useEffect(() => {
        const fetchUserOnline = async () => {


            if (isInternetConnected) {

                socket.current = io(`ws:${MESSAGE_ADRESS_IP}:8900`);
                //console.log(`Attempting to connect to ws:${MESSAGE_ADRESS_IP}:8900`);

                socket.current.on('connect', () => {
                    setIsConnected(true);
                    // console.log('Connected to server');
                    // console.log(uid, "Utilisateur connecté !!!!", socket.current.id);
                    socket.current.emit("addUser", uid);
                    socket.current.emit("onlineStatusChanged", { userId: uid, onlineStatus: true });
                    //console.log("Tu es en ligne ou pas !!!!", userData, "donnde moi ton id", uid, "donne moi ton pseudo", userData.pseudo);
                });

                socket.current.on('connect_error', (error) => {
                    console.error('Connection error:', error);
                });

                // Gérer la déconnexion

            } else {
                setIsConnected(false);
                if (socket.current && uid) {
                    socket.current.emit("removeUser", uid);
                }

            }
        };

        fetchUserOnline();

        return () => {
            if (socket.current) {
                socket.current.off('connect');
                socket.current.off('disconnect');
                socket.current.off('connect_error');
                socket.current.disconnect();
            }
        };
    }, [isInternetConnected, uid]);

    return (
        <OnlineStatusContext.Provider value={{ isConnected, isInternetConnected }}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export default OnlineStatusProvider;
