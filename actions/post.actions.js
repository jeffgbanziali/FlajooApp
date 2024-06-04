import axios from 'axios';
import { APP_API_URL } from '../config';

// Post actions
export const GET_POSTS = "GET_POSTS";
export const GET_ADD_POSTS = "GET_ADD_POSTS";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_REPLY = 'ADD_REPLY';
export const DELETE_COMMENT = "DELETE_COMMENT"
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";
export const LIKE_REPLY = 'LIKE_REPLY';
export const UNLIKE_REPLY = 'UNLIKE_REPLY';
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const ADD_POSTS_SUCCESS = "ADD_POSTS_SUCCESS";




export const getPosts = (userId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/post/actuality-file/my-user/${userId}`);
            dispatch({ type: GET_POSTS, payload: response.data });

        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    }
};



/*export const getPosts = (num) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/post`);
            const array = response.data.slice(0, num); // Slice the response data to get the specified number of posts
            dispatch({ type: GET_POSTS, payload: array });
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    };
};*/



// Add post
export const addPosts = (data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${APP_API_URL}/api/post`, data);
            if (res.data.errors) {
                dispatch({ type: CREATE_POST_ERROR, payload: res.data.errors });
            } else {
                dispatch({ type: ADD_POSTS_SUCCESS });
            }
        } catch (error) {
            console.error('Erreur lors de la création du post :', error);
            dispatch({ type: CREATE_POST_ERROR, payload: 'Une erreur s\'est produite lors de la création du post.' });
        }
    };
};

// Delete post
export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${APP_API_URL}/api/post/${postId}`);
            if (res.data.errors) {
                dispatch({ type: CREATE_POST_ERROR, payload: res.data.errors });
            } else {
                dispatch({ type: DELETE_POST, payload: { postId } });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du post:', error);
            dispatch({ type: CREATE_POST_ERROR, payload: 'Une erreur s\'est produite lors de la suppression du post.' });
        }
    };
};

// Like post
export const likePost = (postId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/like-post/${postId}`, { id: userId });
            dispatch({ type: LIKE_POST, payload: { postId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du like:', error);
        }
    };
};

// Unlike post
export const unlikePost = (postId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/unlike-post/${postId}`, { id: userId });
            dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du unlike:', error);
        }
    };
};

// Like comment
export const likeComment = (postId, commentId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/like-comment/${postId}/${commentId}`, { id: userId });
            dispatch({ type: LIKE_COMMENT, payload: { postId, commentId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du like:', error);
        }
    };
};

// Unlike comment
export const unlikeComment = (postId, commentId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/unlike-comment/${postId}/${commentId}`, { id: userId });
            dispatch({ type: UNLIKE_COMMENT, payload: { postId, commentId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du unlike:', error);
        }
    };
};

// Like reply
export const likeReply = (postId, commentId, replyId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/like-reply/${postId}/${commentId}/${replyId}`, { id: userId });
            dispatch({ type: LIKE_REPLY, payload: { postId, commentId, replyId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du like pour la réponse au commentaire:', error);
        }
    };
};

// Unlike reply
export const unlikeReply = (postId, commentId, replyId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/unlike-reply/${postId}/${commentId}/${replyId}`, { id: userId });
            dispatch({ type: UNLIKE_REPLY, payload: { postId, commentId, replyId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du unlike pour la réponse au commentaire:', error);
        }
    };
};

// Add comment
export const addComment = (postId, commenterId, text, commenterPseudo, commentMedia, commentType) => {
    return async (dispatch) => {
        try {
            const res = await axios.patch(`${APP_API_URL}/api/post/comment-post/${postId}`, { commenterId, text, commenterPseudo, commentMedia, commentType });
            const comment = res.data.comment;
            dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
    };
};

// Add reply
export const replyComment = (postId, commentId, replierId, replierPseudo, text, replyMedia, replyType, repliedTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${APP_API_URL}/api/post/comment-post/${postId}/reply`, { commentId, replierId, replierPseudo, text, replyMedia, replyType, repliedTo });
            const reply = res.data;
            dispatch({ type: ADD_REPLY, payload: { postId, commentId, reply } });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réponse :', error);
        }
    };
};

// Delete comment
export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${APP_API_URL}/api/post/delete-comment-post/${postId}`, { data: { commentId } });
            if (res.data && res.data.errors) {
                dispatch({ type: CREATE_POST_ERROR, payload: res.data.errors });
            } else {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
            dispatch({ type: CREATE_POST_ERROR, payload: 'Une erreur s\'est produite lors de la suppression du commentaire.' });
        }
    };
};
