import axios from 'axios';
import { APP_API_URL } from "@env";;

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
export const VIEW_POST = 'VIEW_POST';
export const VIEW_POST_FAILED = "VIEW_POST_FAILED";
export const SHARE_POST_WITH_USER_REQUEST = 'SHARE_POST_WITH_USER_REQUEST';
export const SHARE_POST_WITH_USER_SUCCESS = 'SHARE_POST_WITH_USER_SUCCESS';
export const SHARE_POST_WITH_USER_FAILURE = 'SHARE_POST_WITH_USER_FAILURE';
export const SHARE_POST_AS_NEW_POST_REQUEST = 'SHARE_POST_AS_NEW_POST_REQUEST';
export const SHARE_POST_AS_NEW_POST_SUCCESS = 'SHARE_POST_AS_NEW_POST_SUCCESS';
export const SHARE_POST_AS_NEW_POST_FAILURE = 'SHARE_POST_AS_NEW_POST_FAILURE';





export const getPosts = (userId) => {
    return async dispatch => {
        if (userId === null) {
            console.log('User ID is null. Skipping API call.');
            return;
        }

        try {
            const response = await axios.get(`${APP_API_URL}/api/post/actuality-file/my-user/${userId}`);
            dispatch({ type: GET_POSTS, payload: response.data });
            // console.log("Il est mis à jour ")

        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    }
};



/*export const getAllPosts = (num) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/post`);
            const array = response.data.slice(0, num); // Slice the response data to get the specified number of posts
            dispatch({ type: GET_POSTS, payload: array });

            console.log('My post', array)
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
                return res
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







export const markPostAsViewed = (postId, viewerId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${APP_API_URL}/api/post/view/${postId}`, { viewerId });
            dispatch({ type: VIEW_POST, payload: { postId, viewer: response.data } });
            console.log('ma response ', response)
            return response
        } catch (error) {
            console.error("Error in viewPost:", error);
            dispatch({ type: VIEW_POST_FAILED, payload: error.message });
        }
    }
}


const sharePostWithUserRequest = () => ({
    type: SHARE_POST_WITH_USER_REQUEST,
});

const sharePostWithUserSuccess = (data) => ({
    type: SHARE_POST_WITH_USER_SUCCESS,
    payload: data,
});

const sharePostWithUserFailure = (error) => ({
    type: SHARE_POST_WITH_USER_FAILURE,
    payload: error,
});

export const sharePostWithUser = (postData) => async (dispatch) => {
    dispatch(sharePostWithUserRequest());
    try {
        const response = await axios.post(`${APP_API_URL}/api/post/share-with-user`, postData);
        const data = response.data; // Accédez aux données spécifiques de la réponse
        dispatch(sharePostWithUserSuccess(data));
        console.log("Voici mon log ", data);
        return response;
    } catch (error) {
        dispatch(sharePostWithUserFailure(error.response?.data || error.message));
        console.error("An error occurred while sharing the post:", error); // Ajoutez un log pour les erreurs
        throw error; // Lancez l'erreur pour permettre un traitement ultérieur
    }
};


const sharePostAsNewPostRequest = () => ({
    type: SHARE_POST_AS_NEW_POST_REQUEST,
});

const sharePostAsNewPostSuccess = (data) => ({
    type: SHARE_POST_AS_NEW_POST_SUCCESS,
    payload: data,
});

const sharePostAsNewPostFailure = (error) => ({
    type: SHARE_POST_AS_NEW_POST_FAILURE,
    payload: error,
});

export const sharePostAsNewPost = (postData) => async (dispatch) => {
    dispatch(sharePostAsNewPostRequest());
    try {

        const response = await axios.post(`${APP_API_URL}/api/post/share-as-new-post`, postData);
        const data = response.data;
        dispatch(sharePostAsNewPostSuccess(data));


        return response;
    } catch (error) {
        dispatch(sharePostAsNewPostFailure(error.response?.data || error.message));
        console.error("An error occurred while reply the post:", error);
        throw error;
    }
};