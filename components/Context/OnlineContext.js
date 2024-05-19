import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { MESSAGE_ADRESS_IP } from '../../config';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Créez le contexte
const OnlineStatusContext = createContext();

export const useOnlineStatus = () => useContext(OnlineStatusContext);

export const OnlineStatusProvider = ({ children }) => {

    const [isConnected, setIsConnected] = useState(false);
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const socket = useRef(null);
    const [uid, setUid] = useState(null);
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsInternetConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {


        const fetchUserOnline = async () => {
            socket.current = io(`ws:${MESSAGE_ADRESS_IP}:8900`);
            console.log(`Attempting to connect to ws:${MESSAGE_ADRESS_IP}:8900`);
            //const userIdOnline = await AsyncStorage.getItem('uid');

            if (isInternetConnected && userData) {

                socket.current.on('connect', () => {
                    setIsConnected(true);
                    //setUid(userIdOnline);
                    console.log('Connected to server');
                    console.log(userData._id, "Utilisateur connecté !!!!", socket.current.id);
                    socket.current.emit("addUser", userData._id);

                    // Émettre un événement vers le serveur pour informer du changement de statut en ligne
                    socket.current.emit("onlineStatusChanged", { userId: userData._id, onlineStatus: true });

                    console.log("Tu es en ligne ou pas !!!!", userData.onlineStatus, "donnde moi ton id", userData._id, "donne moi ton pseudo", userData.pseudo);

                });

                socket.current.on('connect_error', (error) => {
                    console.error('Connection error:', error);
                });



                // Clean up the event listeners on unmount
                return () => {
                    socket.current.off('connect');
                    socket.current.off('disconnect');
                    socket.current.off('connect_error');
                    socket.current.disconnect();
                };
            } else {
                setIsConnected(false);
                if (socket.current && userData) {

                    socket.current.on('disconnect', () => {
                        setIsConnected(false);
                        console.log('Disconnected from server');

                        socket.current.emit("removeUser", userData._id);
                        socket.current.emit("removeUser", userData._id);


                    });
                }
            }
        }

        fetchUserOnline()
    }, [isInternetConnected, userData._id]);

    return (
        <OnlineStatusContext.Provider value={{ isConnected, isInternetConnected }}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export default OnlineStatusProvider;
