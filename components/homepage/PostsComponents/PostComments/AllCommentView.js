import { Easing, FlatList, Animated, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CommentText from "./CommentType/CommentText"
import CommentImage from "./CommentType/CommentImage"
import CommentVideo from "./CommentType/CommentVideo"
import CommentGift from "./CommentType/CommentGift"
import CommentAudio from "./CommentType/CommentAudio"
import CommentTools from "./CommentTools/CommentTools";
import Modal from "react-native-modal";




const AllCommentView = ({ post, toggle, toAnswering, toReplying }) => {

  const [pressComment, setPressComment] = useState(new Animated.Value(0));
  const [pressInComments, setPressInComments] = useState(false);


  const areYouPressComment = () => {
    if (pressInComments) {
      Animated.timing(pressComment, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => setPressInComments(false));
    } else {
      setPressInComments(true);
      Animated.timing(pressComment, {
        toValue: 200,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  };








  const renderItem = ({ item: comment }) => {

    return (

      <>

        {comment.text && !comment.commentMedia && (
          <TouchableOpacity
            onLongPress={areYouPressComment}

          >
            <CommentText
              areYouPressComment={areYouPressComment}
              comment={comment}
              post={post}
              toggle={toggle}
              toAnswering={toAnswering}
              toReplying={toReplying} />

          </TouchableOpacity>

        )}

        {comment.commentMedia && !comment.text && (
          <>
            {comment.commentType === "image" && (
              <TouchableOpacity
                onLongPress={areYouPressComment}
              >
                <CommentImage
                  areYouPressComment={areYouPressComment}
                  comment={comment}
                  post={post}
                  toggle={toggle}
                  toAnswering={toAnswering}
                  toReplying={toReplying} />
              </TouchableOpacity >
            )}
            {comment.commentType === "video" && (
              <TouchableOpacity
                onLongPress={areYouPressComment}

              >
                <CommentVideo
                  areYouPressComment={areYouPressComment}
                  comment={comment}
                  post={post}
                  toggle={toggle}
                  toAnswering={toAnswering}
                  toReplying={toReplying} />
              </TouchableOpacity>
            )}

            {comment.commentType === "audio" && (
              <TouchableOpacity
                onLongPress={areYouPressComment}

              >
                <CommentAudio
                  areYouPressComment={areYouPressComment}
                  comment={comment}
                  post={post}
                  toggle={toggle}
                  toAnswering={toAnswering}
                  toReplying={toReplying} />
              </TouchableOpacity>
            )}

            {comment.commentType === "gif" && (
              <TouchableOpacity
                onLongPress={areYouPressComment}
              >
                <CommentGift
                  areYouPressComment={areYouPressComment}
                  comment={comment}
                  post={post}
                  toggle={toggle}
                  toAnswering={toAnswering}
                  toReplying={toReplying} />
              </TouchableOpacity>

            )}
          </>
        )
        }

        <Modal
          isVisible={pressInComments}
          onBackdropPress={areYouPressComment}
          //transparent={true}
          backdropOpacity={0.5}
          animationIn="pulse"
          animationOut="fadeOut"
          useNativeDriverForBackdrop
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >


          <CommentTools
            post={post}
            comment={comment}
            areYouPressComment={areYouPressComment} />

        </Modal>

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
