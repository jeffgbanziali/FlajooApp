import { GET_POSTS, DELETE_POST, LIKE_POST, UNLIKE_POST, ADD_COMMENT, ADD_REPLY, CREATE_POST_ERROR, LIKE_COMMENT, UNLIKE_COMMENT, LIKE_REPLY, UNLIKE_REPLY, DELETE_COMMENT, FETCH_RECOMMENDATIONS } from "../actions/post.actions";

const initialState = {
    recommendations: [],
    post: [],
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {


        case FETCH_RECOMMENDATIONS:
            return {
                recommendations: action.payload,
            };

        case GET_POSTS:
            return {
                post: action.payload
            };
        case DELETE_POST:
            // Supprime le post du state en filtrant les posts ayant un id différent de celui supprimé
            return state.filter(post => post._id !== action.payload.postId);
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers]
                    };
                }
                return post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    };
                }
                return post;
            });
        case ADD_COMMENT:
            const { postId, commenterId, text, commenterPseudo } = action.payload;
            return state.map((post) => {
                if (post._id === postId) {
                    return {
                        ...post,
                        comments: [{ commenterId, text, commenterPseudo }, ...post.comments]
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
        case DELETE_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        comments: post.comments.filter(
                            (comment) => comment._id !== action.payload.commentId
                        ),
                    };
                } else return post;
            });
        case LIKE_COMMENT:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
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
                if (post._id === action.payload.postId) {
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
                if (post._id === action.payload.postId) {
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
                if (post._id === action.payload.postId) {
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
        case CREATE_POST_ERROR:
            // Gérez l'erreur ici, par exemple, stockez-la dans un champ d'état approprié
            return {
                ...state,
                error: action.payload // Stockez l'erreur dans un champ d'état "error"
            };
        default:
            return state;
    }
}
