import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList, View, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../config';
import { MyPostUser } from '../../Data/UserProfilePost';
import { LinearGradient } from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useDarkMode, UidContext } from '../Context/AppContext';
import Video from 'react-native-video';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const VideoRéelsFriendsUser = ({ users }) => {
    const [user, setUser] = useState([]);
    const { isDarkMode } = useDarkMode();
    const { uid } = useContext(UidContext)

    const imageWidthSize = windowWidth * 0.3;
    const imageHeightSize = windowHeight * 0.2;

    useEffect(() => {
        const getPostUser = async () => {
            try {
                const response = await axios.get(`${APP_API_URL}/api/videoReels/${users._id}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getPostUser();
    }, [users._id]);




    const renderPost = ({ item, index }) => (
        < TouchableOpacity key={index} >
            <View style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "white"
            }}>

                <View
                    style={{
                        width: imageWidthSize,
                        height: imageHeightSize,
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
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>

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
        <View style={{
            flex: 1,
            width: user.length <= 2 ? '68%' : '100%',
        }}>
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
    );
}



export default VideoRéelsFriendsUser;;
