import axios from "axios";
import { APP_API_URL } from "../config";

// VideoRéels actions
export const GET_VIDEO_REELS = "GET_VIDEO_REELS";
export const ADD_VIDEO_REELS = "ADD_VIDEO_REELS";
export const LIKE_VIDEO_REELS = "LIKE_VIDEO_REELS";
export const DISLIKE_VIDEO_REELS = "DISLIKE_VIDEO_REELS";
export const VIEW_VIDEO_REELS = "VIEW_VIDEO_REELS";
export const COMMENT_VIDEO_REELS = "COMMENT_VIDEO_REELS";
export const DELETE_VIDEO_REELS = "DELETE_VIDEO_REELS";
export const ADD_REPLY = 'ADD_REPLY';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";
export const LIKE_REPLY = 'LIKE_REPLY';
export const UNLIKE_REPLY = 'UNLIKE_REPLY';




export const getVideoReels = (num) => {
  return (dispatch) => {
    return axios
      .get(`${APP_API_URL}/api/videoReels`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_VIDEO_REELS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addVideoReels = (data) => {
  return (dispatch) => {
    return axios
      .post(`${APP_API_URL}/api/videoReels/`, data)
      .then((res) => {
        dispatch({ type: ADD_VIDEO_REELS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};




export const likeVideoReels = (videoReelsId, userId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${APP_API_URL}/api/videoReels/like-videoReels/${videoReelsId}`,
        { id: userId }
      )
      .then((res) => {
        dispatch({ type: LIKE_VIDEO_REELS, payload: { videoReelsId, userId } });
      })
      .catch((err) => console.log(err));
  };
};



export const dislikeVideoReels = (videoReelsId, userId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${APP_API_URL}/api/videoReels/dislike-videoReels/${videoReelsId}`,
        { id: userId }
      )
      .then((res) => {
        dispatch({
          type: DISLIKE_VIDEO_REELS,
          payload: { videoReelsId, userId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const viewVideoReels = (videoReelsId, viewerId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${APP_API_URL}/api/videoReels/view-videoReels/${videoReelsId}`,
        { viewerId }
      )
      .then((res) => {
        dispatch({
          type: VIEW_VIDEO_REELS,
          payload: { videoReelsId, viewerId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const likeComment = (videoReelsId, commentId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${APP_API_URL}/api/videoReels/like-comment-videoReels/${videoReelsId}/${commentId}`, { id: userId });
      dispatch({ type: LIKE_COMMENT, payload: { videoReelsId, commentId, userId } });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like:', error);
    }
  };
};


export const unlikeComment = (videoReelsId, commentId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${APP_API_URL}/api/videoReels/unlike-comment-videoReels/${videoReelsId}/${commentId}`, { id: userId });
      dispatch({ type: UNLIKE_COMMENT, payload: { videoReelsId, commentId, userId } });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du unlike:', error);
    }
  };
};


export const likeReply = (videoReelsId, commentId, replyId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${APP_API_URL}/api/videoReels/like-reply-comment-videoReels/${videoReelsId}/${commentId}/${replyId}`, { id: userId });
      dispatch({ type: LIKE_REPLY, payload: { videoReelsId, commentId, replyId, userId } });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du like pour la réponse au commentaire:', error);
    }
  };
};


export const unlikeReply = (videoReelsId, commentId, replyId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${APP_API_URL}/api/videoReels/unlike-reply-comment-videoReels/${videoReelsId}/${commentId}/${replyId}`, { id: userId });
      dispatch({ type: UNLIKE_REPLY, payload: { videoReelsId, commentId, replyId, userId } });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du unlike pour la réponse au commentaire:', error);
    }
  };
};



export const commentVideoReels = (
  videoReelsId,
  commenterId,
  text,
  commenterPseudo,
  commentMedia,
  commentType
) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${APP_API_URL}/api/videoReels/comment-videoReels/${videoReelsId}`,
      data: { commenterId, text, commenterPseudo, commentMedia, commentType },
    })
      .then((res) => {
        const comment = res.data.comment;
        dispatch({ type: ADD_COMMENT, payload: { videoReelsId, comment } });
      })
      .catch((err) => console.log(err));
  };
};




export const replyComment = (videoReelsId, commentId, replierId, replierPseudo, text, replyMedia, replyType, repliedTo) => {


  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${APP_API_URL}/api/videoReels/comment-videoReels/${videoReelsId}/reply`,
      data: {
        commentId,
        replierId,
        replierPseudo,
        text,
        replyMedia,
        replyType,
        repliedTo,
      },
    })
      .then((res) => {
        const reply = res.data;
        dispatch({ type: ADD_REPLY, payload: { videoReelsId, commentId, reply } });
      })
      .catch((err) => console.log(err));
  };
};



export const deleteVideoReels = (videoRéelsId) => {
  return (dispatch) => {
    return axios
      .delete(`${APP_API_URL}/api/videoReels/${videoRéelsId}`)
      .then((res) => {
        dispatch({ type: DELETE_VIDEO_REELS, payload: { videoRéelsId } });
      })
      .catch((err) => console.log(err));
  };
};
