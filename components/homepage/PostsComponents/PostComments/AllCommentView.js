import { FlatList } from "react-native";
import React from "react";
import CommentText from "./CommentType/CommentText"
import CommentImage from "./CommentType/CommentImage"
import CommentVideo from "./CommentType/CommentVideo"
import CommentGift from "./CommentType/CommentGift"
import CommentAudio from "./CommentType/CommentAudio"




const AllCommentView = ({ post, toggle, toAnswering, toReplying }) => {


  const renderItem = ({ item: comment }) => {

    return (

      <>

        {comment.text && !comment.commentMedia && (
          <CommentText comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
        )}

        {comment.commentMedia && !comment.text && (
          <>
            {comment.commentType === "image" && (
              <CommentImage comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}
            {comment.commentType === "video" && (
              <CommentVideo comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}

            {comment.commentType === "audio" && (
              <CommentAudio comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
            )}

            {comment.commentType === "gif" && (
              <CommentGift comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
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
      data={post.comments}
      keyExtractor={(item) => item._id}
      renderItem={renderItem} />
  )
};

export default AllCommentView;
