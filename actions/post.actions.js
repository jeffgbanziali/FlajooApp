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
export const FETCH_RECOMMENDATIONS = 'FETCH_RECOMMENDATIONS';



export const fetchRecommendations = (userId) => {
    return async dispatch => {

        try {
            const response = await axios.get(`${APP_API_URL}/api/post/actuality-file/my-user/${userId}`);
            dispatch({ type: FETCH_RECOMMENDATIONS, payload: response.data });
            
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    }
};




export const getPosts = (num) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/post`);
            const array = response.data.slice(0, num); // Slice the response data to get the specified number of posts
            dispatch({ type: GET_POSTS, payload: array });
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    };
};



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





export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            // Envoyer une requête DELETE pour supprimer le post avec l'ID spécifié
            const res = await axios.delete(`${APP_API_URL}/api/post/${postId}`);

            // Si la suppression réussit, dispatchez une action DELETE_POST avec l'ID du post supprimé
            if (res.data.errors) {
                dispatch({ type: CREATE_POST_ERROR, payload: res.data.errors });
            } else {
                dispatch({ type: DELETE_POST, payload: { postId } });
            }
        } catch (error) {
            // En cas d'erreur, affichez l'erreur dans la console
            console.error('Erreur lors de la suppression du post:', error);
            // Dispatchez une action CREATE_POST_ERROR avec un message d'erreur approprié
            dispatch({ type: CREATE_POST_ERROR, payload: 'Une erreur s\'est produite lors de la suppression du post.' });
        }
    };
};



export const likePost = (postId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/like-post/` + postId, { id: userId });
            dispatch({ type: LIKE_POST, payload: { postId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du like:', error);
        }
    };
};








export const unlikePost = (postId, userId) => {
    return async (dispatch) => {
        try {
            await axios.patch(`${APP_API_URL}/api/post/unlike-post/` + postId, { id: userId });
            dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du unlike:', error);
        }
    };
};


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



export const addComment = (postId, commenterId, text, commenterPseudo, commentMedia, commentType) => {

    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${APP_API_URL}/api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo, commentMedia, commentType },
        })
            .then((res) => {
                const comment = res.data.comment;
                dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
            })
            .catch((err) => console.log(err));
    };
};


export const replyComment = (postId, commentId, replierId, replierPseudo, text, replyMedia, replyType, repliedTo) => {


    return (dispatch) => {
        return axios({
            method: 'post',
            url: `${APP_API_URL}/api/post/comment-post/${postId}/reply`,
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
                dispatch({ type: ADD_REPLY, payload: { postId, commentId, reply } });
            })
            .catch((err) => console.log(err));
    };
};





export const deleteComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            // Envoyer une requête DELETE pour supprimer le post avec l'ID spécifié
            const res = axios.delete(`${APP_API_URL}api/post/delete-comment-post/${postId}`, { data: { commentId } });

            // Si la suppression réussit, dispatchez une action DELETE_POST avec l'ID du commentaire supprimé
            if (res.data && res.data.errors) {
                dispatch({ type: CREATE_POST_ERROR, payload: res.data.errors });
            } else {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
            }

        } catch (error) {
            // En cas d'erreur, affichez l'erreur dans la console
            console.error('Erreur lors de la suppression du commentaire:', error);
            // Dispatchez une action CREATE_POST_ERROR avec un message d'erreur approprié
            dispatch({ type: CREATE_POST_ERROR, payload: 'Une erreur s\'est produite lors de la suppression du commentaire.' });
        }
    };
};




/*export const eleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${APP_API_URL}api/post/delete-comment-post/${postId}`,
            data: { commentId },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
            })
            .catch((err) => console.log(err));
    };
};*/

