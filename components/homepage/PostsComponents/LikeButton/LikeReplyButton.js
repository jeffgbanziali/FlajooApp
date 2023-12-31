import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { likeReply, unlikeReply } from "../../../../actions/post.actions";
import { UidContext, useDarkMode } from "../../../Context/AppContext";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const LikeReplyButton = ({ post, comment, reply, type }) => {
    const { uid } = useContext(UidContext);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();

    const like = () => {
        console.log("Like reply button pressed" + reply);
        dispatch(likeReply(post._id, comment._id, reply._id, uid));
        setLiked(true);
    };

    console.log("Like like likee", comment);

    const unlike = () => {
        console.log("Unlike reply button pressed");
        dispatch(unlikeReply(post._id, comment._id, reply._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        if (reply.replierLikers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, reply.replierLikers, liked]);

    return (
        <View>
            {uid && liked == false && (
                <>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={like}
                    >
                        {type === "postPicture" && (
                            <Feather
                                name="heart"
                                size={20}
                                color={isDarkMode ? "#F5F5F5" : "white"}

                            />
                        )}
                        {type === "postMessage" && (
                            <Feather
                                name="heart"
                                size={20}
                                color={isDarkMode ? "#F5F5F5" : "black"}

                            />
                        )}
                    </TouchableOpacity>
                </>
            )}
            {uid && liked && (
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={unlike}
                >
                    {type === "postPicture" && (
                        <AntDesign
                            name="heart"
                            size={20}
                            color="red"

                        />
                    )}
                    {type === "postMessage" && (
                        <AntDesign
                            name="heart"
                            size={20}
                            color="red"
                        />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default LikeReplyButton;
