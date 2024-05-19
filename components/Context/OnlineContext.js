import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { MESSAGE_ADRESS_IP } from '../../config';
import { useSelector } from 'react-redux';

// Créez le contexte
const OnlineStatusContext = createContext();

export const useOnlineStatus = () => useContext(OnlineStatusContext);

// Créez le socket en dehors du composant pour éviter les recréations
const socket = io(`ws:${MESSAGE_ADRESS_IP}:8900`);

export const OnlineStatusProvider = ({ children }) => {
    const [usersOnline, setUsersOnline] = useState([]);
    const userData = useSelector((state) => state.userReducer);

    /*useEffect(() => {
        const handleConnectivityChange = (state) => {
            if (userData && userData._id) {
                if (state.isConnected) {
                    // Émettre l'événement 'addUser' avec l'ID utilisateur lorsqu'il se connecte
                    socket.emit('addUser', userData._id);

                    // Écouter l'événement de connexion
                    socket.on('connect', () => {
                        console.log('Connected to socket server', userData);
                    });

                    // Écouter les utilisateurs en ligne
                    socket.on('getUsers', (users) => {
                        setUsersOnline(users);
                    });

                    // Écouter la déconnexion
                    socket.on('disconnect', () => {
                        console.log('Disconnected from socket server');
                    });
                } else {
                    console.log('Offline - cannot connect to socket server');
                    socket.emit('removeUser', userData._id);
                }
            }
        };

        // Vérifier l'état initial de la connexion
        NetInfo.fetch().then(handleConnectivityChange);

        // Écouter les changements de connectivité
        const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

        // Nettoyage lors du démontage du composant
        return () => {
            unsubscribe();
            socket.emit('removeUser', userData._id);
            socket.off('connect');
            socket.off('getUsers');
            socket.off('disconnect');
        };
    }, [userData]);*/

    return (
        <OnlineStatusContext.Provider value={{ usersOnline, socket }}>
            {children}
        </OnlineStatusContext.Provider>
    );
};

export default OnlineStatusProvider;
