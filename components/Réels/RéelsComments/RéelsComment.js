import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentText from "../RéelsComments/CommentType/CommentAudio"
import CommentImage from "../RéelsComments/CommentType/CommentAudio"
import CommentVideo from "../RéelsComments/CommentType/CommentAudio"
import CommentGift from "../RéelsComments/CommentType/CommentAudio"
import CommentAudio from "../RéelsComments/CommentType/CommentAudio"
import { useDarkMode } from "../../Context/AppContext";
import { getVideoReels } from "../../../actions/réels.action";

const RéelsComment = ({ réels, toggle, toAnswering, toReplying }) => {
  const [loadRéels, setLoadRéels] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    if (loadRéels) {
      dispatch(getVideoReels());
      setLoadRéels(false);
    }
  }, [loadRéels, dispatch]);

  console.log(réels)


  const renderItem = ({ item: comment }) => {

    return (

      <>

        {comment.text && !comment.commentMedia && (
          <CommentText comment={comment} réels={réels} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
        )}

        {comment.commentMedia && !comment.text && (
          <>
            {comment.commentType === "image" && (
              <CommentImage comment={comment} réels={réels} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}
            {comment.commentType === "video" && (
              <CommentVideo comment={comment} réels={réels} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}

            {comment.commentType === "audio" && (
              <CommentAudio comment={comment} réels={réels} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}

            {comment.commentType === "gif" && (
              <CommentGift comment={comment} réels={réels} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}
          </>
        )
        }

      </>

    )
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={réels.comments}
      keyExtractor={(item) => item._id}
      renderItem={renderItem} />
  )
};

export default RéelsComment;
