import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useDarkMode } from '../../Context/AppContext';
import { useNavigation } from '@react-navigation/native';

const ViewProfile = ({ user }) => {

    const { isDarkMode } = useDarkMode();
    const navigation = useNavigation();


    const viewProfile = () => {
        navigation.navigate("ProfilFriends", {
            id: user._id
        });
    };
    return (
        <View style={{
            width: "100%",
            height: 300,
            //backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
        }}>

            <Pressable
                onPress={viewProfile}
                style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100,
                        marginBottom: 10
                    }}
                    source={{ uri: user.picture }}
                />
            </Pressable>
            <View
                style={{
                    //
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 30,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: isDarkMode ? "white" : "black",
                    }}>{user.pseudo}
                </Text>

            </View>
            <View
                style={{
                    //
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 30,
                    flexDirection: "row",
                }}>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "400",
                        color: "gray"
                    }}>
                    2,7 K followers
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "400",
                        color: "gray"
                    }}>
                    {'   '}1 publication
                </Text>

            </View>
            <View
                style={{
                    //
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%",
                    height: 50,
                    flexDirection: "row",
                }}>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "400",
                        color: "gray"
                    }}>
                    Vous suivez tous les deux Kondo_Jo-Christ et 38 autres comptes
                </Text>

            </View>
        </View>
    )
}

export default ViewProfile