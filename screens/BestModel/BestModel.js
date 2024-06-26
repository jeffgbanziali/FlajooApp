import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native'; // Importez ce module pour une utilisation correcte de TF.js dans React Native
import PredictCategory from '../../Data/MyAI/PredictCategory';

const BestModel = () => {


    return (
        <View style={styles.container}>
            <PredictCategory />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
    },
    category: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BestModel;
