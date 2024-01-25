import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, } from "react-native";
import { useDispatch } from "react-redux";
import { likeComment, unlikeComment } from "../../../actions/réels.action";
import { UidContext, useDarkMode } from "../../Context/AppContext";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const LikeCommentButton = ({ réels, comment, type }) => {
    const { uid } = useContext(UidContext);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const { isDarkMode } = useDarkMode();

    const like = () => {
        dispatch(likeComment(réels._id, comment._id, uid));
        setLiked(true);
    };

    const unlike = () => {
        dispatch(unlikeComment(réels._id, comment._id, uid));
        setLiked(false);
    };

    console.log("mes réalisations", comment)




    useEffect(() => {
        if (comment.commentLikers.includes(uid))
            setLiked(true);
        else
            setLiked(false);
    }, [uid, comment.commentLikers, liked]);

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

export default LikeCommentButton;
