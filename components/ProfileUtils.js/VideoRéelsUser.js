import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList, Dimensions, SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../config';
import { MyPostUser } from '../../Data/UserProfilePost';
import { LinearGradient } from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useDarkMode, UidContext } from '../Context/AppContext';
import Video from 'react-native-video';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const VideoRéelsUser = () => {
    const [user, setUser] = useState([]);
    const { isDarkMode } = useDarkMode();
    const { uid } = useContext(UidContext)

    useEffect(() => {
        const getPostUser = async () => {
            try {
                const response = await axios.get(`${APP_API_URL}/api/videoReels/${uid}`);
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
    const containerPersoHeightSize = windowHeight * 0.18;


    // Fonction pour ajuster les mesures en fonction de l'appareil
    const adjustMeasurement = (measurement, baseWidth, targetWidth) => {
        return (measurement / baseWidth) * targetWidth;
    };

    // Ajuster les mesures en fonction des appareils cibles

    const imageWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, iPhone15ProMaxWidth, iPhone15ProWidth, windowWidth);
    const imageHeightSize = adjustMeasurement(containerPersoHeightSize, iPhoneSEHeight, iPhone15ProHeight, iPhone15ProMaxHeight, windowHeight);















    const renderPost = ({ item, index }) => (
        < TouchableOpacity key={index} >
            <View style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "white"
            }}>
                <Video
                    source={{ uri: item.videoPath }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    isLooping
                    paused={true}
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
                        marginLeft: "4%",
                        fontSize: 18,
                        fontWeight: "600",
                        color: "white",
                        zIndex: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: "50%",

                    }}>
                        <Feather name="play" size={18} color="white" />
                        {" "}
                        {item.viewers ? item.viewers.length : 0}
                    </Text>
                    <LinearGradient
                        colors={["transparent", isDarkMode ? "black" : "black"]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 60,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                    />
                </View>

            </View>
        </TouchableOpacity >
    );




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



export default VideoRéelsUser;;
