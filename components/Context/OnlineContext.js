import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { MESSAGE_ADRESS_IP } from '../../config';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créer le contexte
const OnlineStatusContext = createContext();

export const useOnlineStatus = () => useContext(OnlineStatusContext);

export const OnlineStatusProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const socket = useRef(null);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        const unsubscribeNetInfo = NetInfo.addEventListener(state => {
            setIsInternetConnected(state.isConnected);
        });

        return () => {
            unsubscribeNetInfo();
        };
    }, []);

    useEffect(() => {
        const fetchUserOnline = async () => {
            if (isInternetConnected) {


                socket.current = io(`ws:${MESSAGE_ADRESS_IP}:8900`);
                //console.log(`Attempting to connect to ws:${MESSAGE_ADRESS_IP}:8900`);

                socket.current.on('connect', () => {
                    setIsConnected(true);
                  //  console.log('Connected to server');
                   // console.log(userData._id, "Utilisateur connecté !!!!", socket.current.id);
                    socket.current.emit("addUser", userData._id);
                    socket.current.emit("onlineStatusChanged", { userId: userData._id, onlineStatus: true });
                    //console.log("Tu es en ligne ou pas !!!!", userData.onlineStatus, "donnde moi ton id", userData._id, "donne moi ton pseudo", userData.pseudo);
                });

                socket.current.on('connect_error', (error) => {
                    console.error('Connection error:', error);
                });

                // Gérer la déconnexion
                socket.current.on('disconnect', () => {
                    setIsConnected(false);
                   // console.log('Disconnected from server');
                    if (userData) {
                        socket.current.emit("removeUser", userData._id);
                    }
                });
            } else {
                setIsConnected(false);
                if (socket.current && userData) {
                    socket.current.emit("removeUser", userData._id);
                }
            }
        };

        fetchUserOnline();

        // Nettoyer les événements lors du démontage
        return () => {
            if (socket.current) {
                socket.current.off('connect');
                socket.current.off('disconnect');
                socket.current.off('connect_error');
                socket.current.disconnect();
            }
        };
    }, [isInternetConnected, userData._id]);

    return (
        <OnlineStatusContext.Provider value={{ isConnected, isInternetConnected }}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export default OnlineStatusProvider;
