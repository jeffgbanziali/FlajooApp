import React, { useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList, View, Text } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../config';
import { MyPostUser } from '../../Data/UserProfilePost';
import { LinearGradient } from 'react-native-linear-gradient';
import { useDarkMode, UidContext } from '../Context/AppContext';


const PostsUser = () => {
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


    console.log("Cadeau", user)




    const renderPost = ({ item, index }) => (
        < TouchableOpacity key={index} >
            <View style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: "white"
            }}>
                
                <Image
                    source={{ uri: item.media }}
                    style={{
                        width: 135,
                        height: 200,
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



export default PostsUser;
