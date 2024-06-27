import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, Dimensions, SafeAreaView, View, Text } from 'react-native';
import axios from 'axios';
import { useDispatch } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { useDarkMode, UidContext } from '../Context/AppContext';
import { APP_API_URL } from "@env";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostsUser = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const { isDarkMode } = useDarkMode();
    const { uid } = useContext(UidContext);

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

    const iPhone15ProWidth = 390;
    const iPhone15ProHeight = 852;
    const iPhone15ProMaxWidth = 430;
    const iPhone15ProMaxHeight = 932;
    const iPhoneSEWidth = 375;
    const iPhoneSEHeight = 667;

    const inputWidthSize = windowWidth * 0.85;
    const inputHeightSize = windowHeight * 0.056;
    const containerPersoWidthSize = windowWidth * 0.28;
    const containerPersoHeightSize = windowHeight * 0.15;

    const adjustMeasurement = (measurement, baseWidth, targetWidth) => {
        return (measurement / baseWidth) * targetWidth;
    };

    const imageWidthSize = adjustMeasurement(containerPersoWidthSize, iPhoneSEWidth, windowWidth);
    const imageHeightSize = adjustMeasurement(containerPersoHeightSize, iPhoneSEHeight, windowHeight);

    const RenderPost = ({ item, index }) => {
        return (
            <TouchableOpacity key={index}>
                <View style={{
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: isDarkMode ? "black" : "#4F4F4F",
                    backgroundColor: "black",
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
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: 900,
                justifyContent: "center",
                backgroundColor: isDarkMode ? "#0D0C0C" : "#F3F2F2",
            }}
        >
            <View
                style={{
                    flex: 1,
                    paddingTop: 10,
                    width: user.length <= 2 ? '100%' : '100%',
                    alignItems: user.length <= 2 ? "flex-start" : "center",
                    paddingLeft: user.length <= 2 ? 4 : 0
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>
                    {
                        user.map((item, index) => (
                            <RenderPost item={item} index={index} key={index} />
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

export default PostsUser;
