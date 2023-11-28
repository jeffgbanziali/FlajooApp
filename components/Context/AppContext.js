import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../../Translations/Services/i18next';

export const UidContext = createContext({ uid: null, setUid: () => { } });

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Ajoute l'état pour la langue ici

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
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, selectedLanguage, changeLanguage }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
