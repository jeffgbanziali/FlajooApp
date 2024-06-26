import {
    GET_POSTS,
    DELETE_POST,
    LIKE_POST,
    UNLIKE_POST,
    ADD_COMMENT,
    ADD_REPLY,
    CREATE_POST_ERROR,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    LIKE_REPLY,
    UNLIKE_REPLY,
    DELETE_COMMENT,
    VIEW_POST,
    VIEW_POST_FAILED,
    SHARE_POST_WITH_USER_REQUEST,
    SHARE_POST_WITH_USER_SUCCESS,
    SHARE_POST_WITH_USER_FAILURE,
    SHARE_POST_AS_NEW_POST_REQUEST,
    SHARE_POST_AS_NEW_POST_SUCCESS,
    SHARE_POST_AS_NEW_POST_FAILURE,
} from "../actions/post.actions";

const initialState = {
    post: [],
    message: null,
    error: null,
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POSTS:
            return {
                post: action.payload
            };

        case DELETE_POST:
            return {
                ...state,
                post: state.post.filter(post => post._id !== action.payload.postId)
            };
        case VIEW_POST:
            return {
                ...state,
                post: state.post.map(post =>
                    post._id === action.payload.postId
                        ? {
                            ...post,
                            views: post.views.some(view => view.viewerId === action.payload.viewerId)
                                ? post.views // Ne pas mettre à jour les vues si l'utilisateur a déjà vu le post
                                : [...post.views, { viewerId: action.payload.viewerId, viewed_at: Date.now() }],
                        }
                        : post
                ),
                error: null
            };

        case VIEW_POST_FAILED:
            return {
                ...state,
                error: action.payload
            };
        case LIKE_POST:
            return {
                ...state,
                post: state.post.map((post) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            likers: [action.payload.userId, ...post.likers]
                        };
                    }
                    return post;
                })
            };

        case UNLIKE_POST:
            return {
                ...state,
                post: state.post.map((post) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            likers: post.likers.filter((id) => id !== action.payload.userId)
                        };
                    }
                    return post;
                })
            };

        case ADD_COMMENT:
            const { postId, commenterId, text, commenterPseudo } = action.payload;
            return {
                ...state,
                post: state.post.map((post) => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            comments: [{ commenterId, text, commenterPseudo }, ...post.comments]
                        };
                    }
                    return post;
                })
            };

        case ADD_REPLY:
            const { postingId, commentId, reply } = action.payload;
            return {
                ...state,
                post: state.post.map((post) => {
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
                })
            };

        case DELETE_COMMENT:
            return {
                ...state,
                post: state.post.map((post) => {
                    if (post._id === action.payload.postId) {
                        return {
                            ...post,
                            comments: post.comments.filter(
                                (comment) => comment._id !== action.payload.commentId
                            ),
                        };
                    } else return post;
                })
            };

        case LIKE_COMMENT:
            return {
                ...state,
                post: state.post.map((post) => {
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
                })
            };

        case UNLIKE_COMMENT:
            return {
                ...state,
                post: state.post.map((post) => {
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
                })
            };

        case LIKE_REPLY:
            return {
                ...state,
                post: state.post.map((post) => {
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
                })
            };

        case UNLIKE_REPLY:
            return {
                ...state,
                post: state.post.map((post) => {
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
                })
            };
        case SHARE_POST_WITH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHARE_POST_WITH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                post: state.post.map(p => p._id === action.payload.post._id ? action.payload.post : p),
                message: action.payload.message,
                error: null,
            };

        case SHARE_POST_WITH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SHARE_POST_AS_NEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHARE_POST_AS_NEW_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: [action.payload.post, ...state.post],
                error: null,
            };
        case SHARE_POST_AS_NEW_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CREATE_POST_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
