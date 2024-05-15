import axios from 'axios';
import { APP_API_URL } from '../config';


export const GET_MESSAGE = "GET_MESSAGE";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";
export const FETCH_CONVERSATION_INFO_SUCCESS = "FETCH_CONVERSATION_INFO_SUCCESS";
export const FETCH_CONVERSATION_INFO_FAILURE = "FETCH_CONVERSATION_INFO_FAILURE";
export const CONVERSATION_CREATED = "CONVERSATION_CREATED";
export const CONVERSATION_ERROR = "CONVERSATION_ERROR";




export const fetchConversations = (uid) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/conversation/${uid}`);
            dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: response.data });
        } catch (error) {
            console.error('Error while fetching conversations:', error);
            dispatch({ type: FETCH_CONVERSATIONS_FAILURE, payload: error.message });
        }
    };
};


export const fetchConversationInfo = (friendId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/user/${friendId}`);
            dispatch({ type: FETCH_CONVERSATION_INFO_SUCCESS, payload: response.data });
        } catch (error) {
            console.error('Error while fetching conversation info:', error);
            dispatch({ type: FETCH_CONVERSATION_INFO_FAILURE, payload: error.message });
        }
    };
};





export const createConversation = (senderId, receiverId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${APP_API_URL}/api/conversation`, { senderId, receiverId });
            dispatch({
                type: CONVERSATION_CREATED,
                payload: response.data
            });
            return response.data; // Ajout de cette ligne pour retourner les données de la réponse
        } catch (error) {
            dispatch({ type: CONVERSATION_ERROR, payload: error });
            throw error; // Vous pouvez également choisir de relancer l'erreur ici si nécessaire
        }
    };
};

