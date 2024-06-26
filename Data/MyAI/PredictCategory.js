import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Assurez-vous que tfjs-react-native est initialisé
import * as ImagePicker from 'react-native-image-picker';
import { fetch as fetchPolyfill } from '@tensorflow/tfjs-react-native';

const PredictCategory = () => {
    const [model, setModel] = useState(null);
    const [image, setImage] = useState(null);
    const [predictedCategory, setPredictedCategory] = useState('');

    useEffect(() => {
        const loadModel = async () => {
            try {
                await tf.ready();
                const model = await tf.loadGraphModel(
                    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_140_224/classification/3/default/1',
                    { fromTFHub: true }
                );
                setModel(model);
            } catch (error) {
                console.error('Error loading the model', error);
            }
        };
        loadModel();
    }, []);

    const handleImagePicker = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(source);
            }
        });
    };

    const classifyImage = async (uri) => {
        if (!model || !uri) return;

        const response = await fetchPolyfill(uri, {}, { isBinary: true });
        const imageDataArray = new Uint8Array(await response.arrayBuffer());
        const imageTensor = decodeJpeg(imageDataArray);
        const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
        const batched = resized.expandDims(0).toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        const predictions = await model.predict(batched).data();
        const topIndex = predictions.indexOf(Math.max(...predictions));

        const labelsResponse = await fetch('https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt');
        const labelsText = await labelsResponse.text();
        const labels = labelsText.split('\n');

        console.log("Ma prediction", labelsResponse)


        setPredictedCategory(labels[topIndex]);
    };


    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={handleImagePicker} />
            {image && <Image source={image} style={styles.image} />}

            <Button title="Class" onPress={classifyImage} />

            {predictedCategory && (
                <View style={styles.predictionContainer}>
                    <Text style={styles.predictionText}>Prediction: {predictedCategory}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 16
    },
    predictionContainer: {
        marginTop: 16
    },
    predictionText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default PredictCategory;
