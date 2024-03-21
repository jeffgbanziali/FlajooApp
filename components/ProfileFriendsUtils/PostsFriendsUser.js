import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList, View, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../config';
import { MyPostUser } from '../../Data/UserProfilePost';
import { LinearGradient } from 'react-native-linear-gradient';
import { useDarkMode } from '../Context/AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostsFriendsUser = ({ users }) => {
    const [user, setUser] = useState([]);
    const { isDarkMode } = useDarkMode();
    useEffect(() => {
        const getPostUser = async () => {
            try {
                const response = await axios.get(`${APP_API_URL}/api/post/${users._id}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getPostUser();
    }, [users._id]);



    const imageWidthSize = windowWidth * 0.3;
    const imageHeightSize = windowHeight * 0.2;


    const renderPost = ({ item, index }) => (



        <TouchableOpacity key={index} >

            
            {item.media.length > 1 ? (
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
                            position: "absolute",
                            top: 4,
                            right: 5,
                            zIndex: 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome5
                            name="layer-group"
                            size={20}
                            color={isDarkMode ? "#F5F5F5" : "black"} />

                    </View>
                    <View
                        style={{
                            width: imageWidthSize,
                            height: imageHeightSize,
                        }}>
                        <Image
                            source={{ uri: item.media[0]?.mediaUrl }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                opacity: 0.9,
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
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                        />
                    </View>

                </View>
            ) : (
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
                        <Image
                            source={{ uri: item.media[0]?.mediaUrl }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
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
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                        />
                    </View>

                </View>
            )
            }

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



export default PostsFriendsUser;
