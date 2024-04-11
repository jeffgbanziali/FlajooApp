// messageActions.js
import axios from 'axios';
import { APP_API_URL } from '../config';

export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const READ_MESSAGE_SUCCESS = "READ_MESSAGE_SUCCESS";
export const READ_MESSAGE_FAILURE = "READ_MESSAGE_FAILURE";
export const DELETE_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";



export const sendMessage = (messageData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${APP_API_URL}/api/message`, messageData);
            dispatch({ type: SEND_MESSAGE_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: SEND_MESSAGE_FAILURE, payload: error.message });
        }
    }
};

export const readMessage = (conversationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${APP_API_URL}/api/message/${conversationId}`);
            dispatch({ type: READ_MESSAGE_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: READ_MESSAGE_SUCCESS, payload: error.message });
        }
    }
};

export const deleteMessage = (messageId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${APP_API_URL}/api/message/${messageId}`);
            dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: DELETE_MESSAGE_FAILURE, payload: error.message });
        }
    }
};
