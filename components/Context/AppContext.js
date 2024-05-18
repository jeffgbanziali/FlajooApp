import { createContext, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../../Translations/Services/i18next';
import { MESSAGE_ADRESS_IP } from "../../config";
import { io } from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";




export const UidContext = createContext({ uid: null, setUid: () => { } });


const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [socket, setSocket] = useState(null);
  const [usersOnline, setUsersOnline] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  /*useEffect(() => {
    const initializeSocket = async () => {
      try {
        const storedUid = await AsyncStorage.getItem('uid');
        if (storedUid) {
          const newSocket = io(`ws:${MESSAGE_ADRESS_IP}:8900`);
          newSocket.on('connect', () => {
            console.log("Utilisateur connecté !!!!", newSocket.id);
            newSocket.emit('addUser', storedUid);
            setSocket(newSocket);
          });

          newSocket.on('getUsers', (users) => {
            setUsersOnline(users);
          });

          return () => {
            newSocket.disconnect();
          };
        }
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };

    initializeSocket();
  }, []);*/



  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected); // Mettre à jour l'état de connexion
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = async (language) => {
    try {
      await i18next.changeLanguage(language);
      setSelectedLanguage(language);
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  useEffect(() => {
    const fetchStoredValues = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(JSON.parse(storedDarkMode));
        }

        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage !== null) {
          await i18next.changeLanguage(storedLanguage);
          setSelectedLanguage(storedLanguage);
        }
      } catch (error) {
        console.error("Error fetching stored values:", error);
      }
    };

    fetchStoredValues();
  }, []);


  return (
    <DarkModeContext.Provider value={{ isConnected, usersOnline, isDarkMode, toggleDarkMode, selectedLanguage, changeLanguage }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};