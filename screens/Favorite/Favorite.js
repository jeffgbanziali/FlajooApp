import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as ImagePicker from 'react-native-image-picker';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

const Favorite = () => {
    const [isTfReady, setIsTfReady] = useState(false);
    const [model, setModel] = useState(null);
    const [image, setImage] = useState(null);
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            await tf.ready();
            setIsTfReady(true);
            try {
                const model = await tf.loadGraphModel(
                    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_140_224/classification/4/model.json'
                );
                setModel(model);
            } catch (error) {
                console.error('Erreur lors du chargement du modèle', error);
            }
        })();
    }, []);

    const selectImage = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.assets) {
                const uri = response.assets[0].uri;
                setImage(uri);
                classifyImage(uri);
            }
        });
    };

    const classifyImage = async (uri) => {
        setLoading(true);
        try {
            const response = await fetch(uri, {}, { isBinary: true });
            const imageData = new Uint8Array(await response.arrayBuffer());
            const imageTensor = decodeJpeg(imageData);

            const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
            const batchedImage = resizedImage.expandDims(0);

            const predictions = await model.predict(batchedImage);
            const topK = await predictions.topk();
            setPredictions(topK.values);
        } catch (error) {
            console.error('Erreur lors de la classification de l\'image', error);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text>TensorFlow Ready: {isTfReady ? 'Yes' : 'No'}</Text>
            <Button title="Select Image" onPress={selectImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {predictions && (
                <Text>Predictions: {JSON.stringify(predictions.arraySync())}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 224,
        height: 224,
    },
});

export default Favorite;
