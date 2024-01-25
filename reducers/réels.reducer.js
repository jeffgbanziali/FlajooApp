import {
  GET_VIDEO_REELS,
  ADD_VIDEO_REELS,
  LIKE_VIDEO_REELS,
  DISLIKE_VIDEO_REELS,
  VIEW_VIDEO_REELS,
  COMMENT_VIDEO_REELS,
  DELETE_VIDEO_REELS,
  ADD_REPLY,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  LIKE_REPLY,
  UNLIKE_REPLY
} from "../actions/réels.action";

const initialState = [];

export default function videoReelsReducer(state = initialState, action) {
  switch (action.type) {

    case GET_VIDEO_REELS:
      return action.payload;

    case ADD_VIDEO_REELS:
      return [action.payload, ...state];

    case LIKE_VIDEO_REELS:
      return state.map((videoRéels) =>
        videoRéels._id === action.payload.videoReelsId
          ? {
            ...videoRéels,
            likers: [action.payload.userId, ...videoRéels.likers],
          }
          : videoRéels
      );

    case DISLIKE_VIDEO_REELS:
      return state.map((videoRéels) =>
        videoRéels._id === action.payload.videoReelsId
          ? {
            ...videoRéels,
            likers: videoRéels.likers.filter(
              (id) => id !== action.payload.userId
            ),
          }
          : videoRéels
      );

    case VIEW_VIDEO_REELS:
      return state.map((videoRéels) =>
        videoRéels._id === action.payload.videoReelsId
          ? {
            ...videoRéels,
            views: [
              ...videoRéels.views,
              { viewerId: action.payload.viewerId, viewed_at: Date.now() },
            ],
          }
          : videoRéels
      );

    case COMMENT_VIDEO_REELS:
      const { videoReelsId, commenterId, text, commenterPseudo } = action.payload;
      return state.map((videoRéels) => {
        if (videoRéels._id === videoReelsId) {
          return {
            ...post,
            comments: [{ commenterId, text, commenterPseudo }, ...videoRéels.comments]
          };
        }
        return post;
      });

    case ADD_REPLY:
      const { postingId, commentId, reply } = action.payload;
      return state.map((post) => {
        if (post._id === postingId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, reply]
                };
              }
              return comment;
            })
          };
        }
        return post;
      });

    case LIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.videoReelsId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  commentLikers: [action.payload.userId, ...comment.commentLikers],
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });

    case UNLIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.videoReelsId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  commentLikers: comment.commentLikers.filter((id) => id !== action.payload.userId),
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });

    case LIKE_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.videoReelsId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply._id === action.payload.replyId) {
                      return {
                        ...reply,
                        replierLikers: [...reply.replierLikers, action.payload.userId],
                      };
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });

    case UNLIKE_REPLY:
      return state.map((post) => {
        if (post._id === action.payload.videoReelsId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply._id === action.payload.replyId) {
                      return {
                        ...reply,
                        replierLikers: reply.replierLikers.filter((id) => id !== action.payload.userId),
                      };
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            }),
          };
        }
        return post;
      });

    case DELETE_VIDEO_REELS:
      return state.filter(
        (videoRéels) => videoRéels._id !== action.payload.videoReelsId
      );
    default:
      return state;
  }
}
