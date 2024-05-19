import { createContext, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../../Translations/Services/i18next';
import { MESSAGE_ADRESS_IP } from "../../config";
import NetInfo from "@react-native-community/netinfo";




export const UidContext = createContext({ uid: null, setUid: () => { } });


const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    // Écoutez les changements de connexion réseau
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
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
    <DarkModeContext.Provider value={{ isConnected, isDarkMode, toggleDarkMode, selectedLanguage, changeLanguage }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};