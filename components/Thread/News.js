import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const News = ({ news }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.content}>{news.content}</Text>
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
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        color: '#666',
    },
});

export default News;
