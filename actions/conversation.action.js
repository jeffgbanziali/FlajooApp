import axios from 'axios';
import { APP_API_URL } from '../config';


export const GET_MESSAGE = "GET_MESSAGE";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";
export const FETCH_CONVERSATION_INFO_SUCCESS = "FETCH_CONVERSATION_INFO_SUCCESS";
export const FETCH_CONVERSATION_INFO_FAILURE = "FETCH_CONVERSATION_INFO_FAILURE";
export const CONVERSATION_CREATED = "CONVERSATION_CREATED";
export const CONVERSATION_ERROR = "CONVERSATION_ERROR";
export const CONVERSATION_DELETE = "CONVERSATION_DELETE";
export const CONVERSATION_DELETE_ERROR = "CONVERSATION_DELETE_ERROR";
export const CONVERSATION_MARKED_AS_READ = "CONVERSATION_MARKED_AS_READ"
export const MARK_MESSAGES_AS_READ_REQUEST = "MARK_MESSAGES_AS_READ_REQUEST";
export const MARK_MESSAGES_AS_READ_SUCCESS = "MARK_MESSAGES_AS_READ_SUCCESS";
export const MARK_MESSAGES_AS_READ_FAILURE = "MARK_MESSAGES_AS_READ_FAILURE"




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


export const deleteConversation = (conversationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${APP_API_URL}/api/conversation/${conversationId}`);
            dispatch({
                type: CONVERSATION_DELETE,
                payload: conversationId // Utilisez l'ID de la conversation pour mettre à jour l'état
            });
            return response; // Assurez-vous de retourner la réponse si nécessaire
        } catch (error) {
            dispatch({
                type: CONVERSATION_DELETE_ERROR,
                payload: error.message // Utilisez error.message pour une meilleure lisibilité
            });
            throw error;
        }
    };
};


export const markConversationAsRead = (conversationId) => {
    return async (dispatch) => {
        try {
            await axios.put(`${APP_API_URL}/api/conversation/${conversationId}/read`);
            dispatch({
                type: CONVERSATION_MARKED_AS_READ,
                payload: conversationId
            });
        } catch (error) {
            console.error('Error while marking conversation as read:', error);
        }
    };
};


export const markMessagesAsRead = (conversationId, userId) => {
    return async (dispatch) => {
        dispatch({ type: MARK_MESSAGES_AS_READ_REQUEST });

        try {
            const response = await axios.put(`/api/conversations/${conversationId}/mark-read`, { userId });

            dispatch({
                type: MARK_MESSAGES_AS_READ_SUCCESS,
                payload: response.data

            });
            console.lgo("voici ma reponse ", response.data)
        } catch (error) {
            dispatch({
                type: MARK_MESSAGES_AS_READ_FAILURE,
                payload: error.message
            });
        }
    };
};