import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, Dimensions, SafeAreaView, FlatList, View, Text } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'react-native-linear-gradient';
import { useDarkMode, UidContext } from '../Context/AppContext';
import { APP_API_URL } from '../../config';
import { MyPostUser } from '../../Data/UserProfilePost';
import { $CombinedState } from 'redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const PostsUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);

    const { isDarkMode } = useDarkMode();
    const { uid } = useContext(UidContext)

    useEffect(() => {
        const getPostUser = async () => {
            try {
                const response = await axios.get(`${APP_API_URL}/api/post/${uid}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getPostUser();
    }, [uid]);






    // iPhone 15 Pro (standard)
    const iPhone15ProWidth = 390; // Largeur de l'écran de l'iPhone 15 Pro
    const iPhone15ProHeight = 852; // Hauteur de l'écran de l'iPhone 15 Pro

    // iPhone 15 Pro Max
    const iPhone15ProMaxWidth = 430; // Largeur de l'écran de l'iPhone 15 Pro Max
    const iPhone15ProMaxHeight = 932;



    // iPhone SE (3rd génération)
    const iPhoneSEWidth = 375; // Largeur de l'écran de l'iPhone SE (3rd génération)
    const iPhoneSEHeight = 667; // Hauteur de l'écran de l'iPhone SE (3rd génération)

    // Ajustement des mesures en fonction des appareils
    const inputWidthSize = windowWidth * 0.85;
    const inputHeightSize = windowHeight * 0.056;

    const containerPersoWidthSize = windowWidth * 0.28;
    const containerPersoHeightSize = windowHeight * 0.15;


    // Fonction pour ajuster les mesures en fonction de l'appareil
    const adjustMeasurement = (measurement, baseWidth, targetWidth) => {
        return (measurement / baseWidth) * targetWidth;
    };

    // Ajuster les mesures en fonction des appareils cibles

    const imageWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, iPhone15ProMaxWidth, iPhone15ProWidth, windowWidth);
    const imageHeightSize = adjustMeasurement(containerPersoHeightSize, iPhoneSEHeight, iPhone15ProHeight, iPhone15ProMaxHeight, windowHeight);

















    const renderPost = ({ item, index }) => {

        return (
            <>

                {
                    item.media && (
                        <TouchableOpacity
                            key={index} >
                            <View style={{
                                //borderRadius: 10,
                                overflow: "hidden",
                                borderWidth: 1,
                                borderColor: isDarkMode ? "black" : "#4F4F4F",
                                backgroundColor: "black"
                            }}>

                                <Image
                                    source={{ uri: item.media[0]?.mediaUrl }}
                                    style={{
                                        width: imageWidthSize,
                                        height: imageHeightSize,
                                        resizeMode: "cover",
                                    }}
                                />
                                <View
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        bottom: 0,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{
                                        marginLeft: "10%",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: "white",
                                        zIndex: 4,
                                        bottom: "60%",

                                    }}>
                                        {item.likers ? item.likers.length : 0}
                                    </Text>
                                    <LinearGradient
                                        colors={["transparent", isDarkMode ? "black" : "#4F4F4F"]}
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: 60,
                                           // borderBottomLeftRadius: 10,
                                            //borderBottomRightRadius: 10,
                                        }}
                                    />
                                </View>

                            </View>
                        </TouchableOpacity >
                    )
                }

            </>

        );
    }




    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: 900,
                justifyContent: "center",
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
            }} >
            <View
                style={{
                    flex: 1,
                    paddingTop: 10,
                    width: user.length <= 2 ? '100%' : '100%',
                    alignItems: user.length <= 2 ? "flex-start" : "center",
                    paddingLeft: user.length <= 2 ? 4 : 0
                }
                }>
                <FlatList
                    data={user}
                    renderItem={renderPost}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: user.length <= 2 ? 'space-evenly' : 'space-evenly',
                    }}
                />
            </View>

        </SafeAreaView >
    );
}



export default PostsUser;
