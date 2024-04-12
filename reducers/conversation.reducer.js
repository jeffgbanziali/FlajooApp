// conversationReducer.js

import { CONVERSATION_CREATED, CONVERSATION_ERROR, FETCH_CONVERSATION_INFO_FAILURE, FETCH_CONVERSATION_INFO_SUCCESS, FETCH_CONVERSATIONS_FAILURE, FETCH_CONVERSATIONS_SUCCESS } from "../actions/conversation.action";

const initialState = {
    conversations: [],
    error: null,
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                conversations: action.payload,
                error: null,
            };
        case FETCH_CONVERSATIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case FETCH_CONVERSATION_INFO_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_CONVERSATION_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CONVERSATION_CREATED:
            return {
                ...state,
                conversation: action.payload,
                error: null
            };
        case CONVERSATION_ERROR:
            return {
                ...state,
                conversation: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export default conversationReducer;
