import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const SuggestionFollowers = ({ suggestion }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: suggestion.avatar }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.username}>{suggestion.username}</Text>
                <Button title="Follow" onPress={() => { /* Ajouter la logique de suivi */ }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        marginLeft: 10,
    },
    username: {
        fontWeight: 'bold',
    },
});

export default SuggestionFollowers;
