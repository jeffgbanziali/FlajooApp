import { View, Text, Image, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dateParser,
  formatPostDate,
  isEmpty,
  timestampParser,
} from "../../Context/Utils";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UidContext, useDarkMode } from "../../Context/AppContext";
import { getPosts } from "../../../actions/post.actions";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CommentText from "./CommentType/CommentText"
import CommentImage from "./CommentType/CommentImage"
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
          <CommentImage comment={comment} post={post} toggle={toggle} toAnswering={toAnswering} toReplying={toReplying} />
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
