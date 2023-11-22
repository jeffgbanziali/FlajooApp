import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UidContext = createContext({ uid: null, setUid: () => { } });

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    const fetchDarkModeValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('isDarkMode');
        if (storedValue !== null) {
          setIsDarkMode(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Error fetching isDarkMode value:", error);
      }
    };

    fetchDarkModeValue();
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
