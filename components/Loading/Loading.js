import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDarkMode } from '../Context/AppContext';

const Loading = () => {
  const { isDarkMode } = useDarkMode();



  return (
    <View style={styles.container}>

      <ActivityIndicator size="large" color="white" />

      <Text
        style={{
          fontSize: 30,
          color: isDarkMode ? "white" : "white",
        }}
      >Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  },
});

export default Loading;
