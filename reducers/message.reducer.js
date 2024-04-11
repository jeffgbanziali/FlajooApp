// messageReducer.js

import { DELETE_MESSAGE_FAILURE, DELETE_MESSAGE_SUCCESS, READ_MESSAGE_FAILURE, READ_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_SUCCESS } from "../actions/message.actions";

const initialState = {
    messages: [],
    error: null,
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                error: null,
            };
        case READ_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: action.payload,
                error: null,
            };
        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.payload.id),
                error: null,
            };
        case SEND_MESSAGE_FAILURE:
        case READ_MESSAGE_FAILURE:
        case DELETE_MESSAGE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default messageReducer;
