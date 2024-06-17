import {
    GET_USER,
    SIGNIN_USER,
    SIGNIN_SUCCESS,
    SIGNIN_FAILURE,
    LOGOUT_USER,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    SEARCH_USERS,
    FOLLOW_USER,
    UNFOLLOW_USER,
    UPDATE_PROFILE,
    ADD_FAVORITE_POST,
    REMOVE_FAVORITE_POST,
    REMOVE_SAVED_POST,
    SAVED_POST,
    ADD_EDUCATION_REQUEST,
    ADD_EDUCATION_SUCCESS,
    ADD_EDUCATION_FAILURE,
    ADD_EXPERIENCE_REQUEST,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EXPERIENCE_FAILURE
} from '../actions/user.action';

const initialState = {
    favoritePost: [],
    savedPost: []
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                picture: action.payload,
            };

        case ADD_EDUCATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_EDUCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case ADD_EDUCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_EXPERIENCE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_EXPERIENCE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case ADD_EXPERIENCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case SIGNIN_USER:
            return {
                ...state,
                isLoading: true, // You may want to set a loading flag for the sign-in process
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...action.payload, // Assuming your sign-in payload includes user data
            };
        case SIGNIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        case LOGOUT_USER:
            return initialState;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
        case UPDATE_BIO:
            console.log("Nouvelle biographie reçue:", action.payload);
            return {
                ...state,
                bio: action.payload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow),
            };
        case SEARCH_USERS:
            return { ...state, searchResults: action.payload };
        case ADD_FAVORITE_POST:
            return {
                ...state,
                favoritePost: [...state.favoritePost, action.payload.postId]
            };

        case REMOVE_FAVORITE_POST:
            return {
                ...state,
                favoritePost: state.favoritePost.filter(postId => postId !== action.payload.postId)
            };
        case SAVED_POST:
            return {
                ...state,
                savedPost: [...state.savedPost, action.payload.postId]
            };

        case REMOVE_SAVED_POST:
            return {
                ...state,
                savedPost: state.savedPost.filter(postId => postId !== action.payload.postId)
            };
        default:
            return state;
    }
}
