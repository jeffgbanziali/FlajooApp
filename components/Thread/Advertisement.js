import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Advertisement = ({ ad }) => {

    console.log("MEs images", ad)
    return (
        <View style={styles.container}>
            <Image source={{ uri: ad.image }} style={styles.image} />
            <Text style={styles.title}>{ad.title}</Text>
            <Text style={styles.description}>{ad.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        marginTop: 5,
        color: '#666',
    },
});

export default Advertisement;
