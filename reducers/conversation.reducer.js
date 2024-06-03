// conversationReducer.js

import { CONVERSATION_CREATED, CONVERSATION_DELETE, CONVERSATION_DELETE_ERROR, CONVERSATION_ERROR, CONVERSATION_MARKED_AS_READ, FETCH_CONVERSATION_INFO_FAILURE, FETCH_CONVERSATION_INFO_SUCCESS, FETCH_CONVERSATIONS_FAILURE, FETCH_CONVERSATIONS_SUCCESS, MARK_MESSAGES_AS_READ_FAILURE, MARK_MESSAGES_AS_READ_REQUEST, MARK_MESSAGES_AS_READ_SUCCESS } from "../actions/conversation.action";

const initialState = {
    conversations: [],
    loading: false,
    error: null,
    successMessage: null,
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
        case CONVERSATION_DELETE:
            return {
                ...state,
                conversations: state.conversations.filter(conversation => conversation._id !== action.payload),
                error: null
            };
        case CONVERSATION_DELETE_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case CONVERSATION_MARKED_AS_READ:
            return {
                ...state,
                // Mettez à jour l'état de la conversation pour marquer la conversation comme lue
                conversations: state.conversations.map(conversation => {
                    if (conversation._id === action.payload) {
                        return { ...conversation, isRead: true };
                    }
                    return conversation;
                }),
                error: null
            };

        case MARK_MESSAGES_AS_READ_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                successMessage: null,
            };
        case MARK_MESSAGES_AS_READ_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
            };
        case MARK_MESSAGES_AS_READ_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:

            return state;
    }
};

export default conversationReducer;
