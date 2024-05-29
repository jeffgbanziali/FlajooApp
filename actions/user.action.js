import axios from 'axios';
import { APP_API_URL } from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GET_USER = "GET_USER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const ADD_EDUCATION_REQUEST = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE = 'ADD_EDUCATION_FAILURE';
export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';
export const LOGOUT_USER = "LOGOUT_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const ADD_EDUCATION = "ADD_EDUCATION"
export const REMOVE_FAVORITE_POST = "REMOVE_FAVORITE_POST"
export const SAVED_POST = "SAVED_POST"
export const REMOVE_SAVED_POST = "REMOVE_SAVED_POST"
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const SEARCH_USERS = "SEARCH_USERS";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${APP_API_URL}/api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};





export const addEducation = (userId, education) => async (dispatch) => {
    dispatch({ type: ADD_EDUCATION_REQUEST });

    try {
        const response = await axios.post(`${APP_API_URL}/api/user/add-education`, { userId, education });
        dispatch({
            type: ADD_EDUCATION_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_EDUCATION_FAILURE,
            payload: error.message,
        });
    }
};


export const addExperience = (userId, experience) => async (dispatch) => {
    dispatch({ type: ADD_EXPERIENCE_REQUEST });

    try {
        const response = await axios.post(`${APP_API_URL}/api/user/add-experience`, { userId, experience });
        dispatch({
            type: ADD_EXPERIENCE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_EXPERIENCE_FAILURE,
            payload: error.message,
        });
    }
};





export const updateProfile = (pictureUrl, userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `${APP_API_URL}/api/user/updateProfile/${userId}`,
                pictureUrl
            );
            if (response.status === 200) {
                dispatch({ type: UPDATE_PROFILE, payload: pictureUrl });
                alert("Profile picture updated successfully");
            } else {
                console.error("Error updating profile picture. Server responded with status:", response.status);
                alert(`An error occurred while updating profile picture. Server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
            alert("An error occurred while updating profile picture");
        }
    };
};







export const logoutUser = () => {
    return async (dispatch) => {
        try {
            await axios.get(`${APP_API_URL}/api/user/logout`);
            dispatch({ type: LOGOUT_USER });
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };
};

export const signIn = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SIGNIN_USER });

            const response = await axios.post(
                `${APP_API_URL}/api/user/login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const user = response.data;
                await AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: SIGNIN_SUCCESS, payload: user });
                alert("User logged in successfully");
            } else {
                if (
                    response.data.errors.email !== "" ||
                    response.data.errors.password !== ""
                ) {
                    dispatch({ type: SIGNIN_FAILURE, payload: response.data.errors });
                    console.log("Sign-in failure with specific errors:", response.data.errors);
                } else {
                    dispatch({ type: SIGNIN_FAILURE, payload: { general: "An error occurred" } });
                    console.log("Sign-in failure with general error");
                }
                alert("An error occurred");
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            dispatch({ type: SIGNIN_FAILURE, payload: { general: "An error occurred" } });
        }
    };
};

export const updateBio = (bio, userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(
                `${APP_API_URL}/api/user/${userId}`,
                { bio }
            );
            if (response.status === 200) {
                dispatch({ type: UPDATE_BIO, payload: bio });
                alert("bio updated successfully");
            } else {
                console.error("Error updating bio. Server responded with status:", response.status);
                alert(`An error occurred while updating bio. Server responded with status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating bio:", error);
            alert("An error occurred while updating bio");
        }
    };
};

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${APP_API_URL}/api/user/follow/` + followerId,
            data: { idToFollow },
        })
            .then((res) => {
                dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
            })
            .catch((err) => console.log(err));
    };
};

export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${APP_API_URL}/api/user/unfollow/` + followerId,
            data: { idToUnfollow },
        })
            .then((res) => {
                dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
            })
            .catch((err) => console.log(err));
    };
};



export const addFavoPost = (userId, postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${APP_API_URL}/api/user/addFavPost`,
                { userId, postId } // Corps de la requête
            );
            if (response.status === 200) {
                // Dispatch de l'action réussie
                dispatch({ type: ADD_FAVORITE_POST, payload: { userId, postId } });
            } else {
                console.error("Erreur lors de l'ajout du post aux favoris. Le serveur a répondu avec le statut :", response.status);
                alert(`Une erreur s'est produite lors de l'ajout du post aux favoris. Le serveur a répondu avec le statut : ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du post aux favoris :", error);
            alert("Une erreur s'est produite lors de l'ajout du post aux favoris");
        }
    };
};

export const removeFavoPost = (userId, postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${APP_API_URL}/api/user/removeFavPost`,
                { userId, postId } // Corps de la requête
            );
            if (response.status === 200) {
                // Dispatch de l'action réussie
                dispatch({ type: REMOVE_FAVORITE_POST, payload: { userId, postId } });
            } else {
                console.error("Erreur lors du retrait du post des favoris. Le serveur a répondu avec le statut :", response.status);
                alert(`Une erreur s'est produite lors du retrait du post des favoris. Le serveur a répondu avec le statut : ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors du retrait du post des favoris :", error);
            alert("Une erreur s'est produite lors du retrait du post des favoris");
        }
    };
};






export const addSavedPost = (userId, postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${APP_API_URL}/api/user/savedPost`,
                { userId, postId } // Corps de la requête
            );
            if (response.status === 200) {
                // Dispatch de l'action réussie
                dispatch({ type: SAVED_POST, payload: { userId, postId } });
            } else {
                console.error("Erreur lors de l'ajout du post aux dans les posts enregistrés. Le serveur a répondu avec le statut :", response.status);
                alert(`Une erreur s'est produite lors de l'ajout du post aux favoris. Le serveur a répondu avec le statut : ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du post aux favoris :", error);
            alert("Une erreur s'est produite lors de l'ajout du post aux favoris");
        }
    };
};

export const removeSavedPost = (userId, postId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${APP_API_URL}/api/user/remSavedPost`,
                { userId, postId } // Corps de la requête
            );
            if (response.status === 200) {
                // Dispatch de l'action réussie
                dispatch({ type: REMOVE_SAVED_POST, payload: { userId, postId } });
            } else {
                console.error("Erreur lors du retrait du post des favoris. Le serveur a répondu avec le statut :", response.status);
                alert(`Une erreur s'est produite lors du retrait du post des favoris. Le serveur a répondu avec le statut : ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors du retrait du post des favoris :", error);
            alert("Une erreur s'est produite lors du retrait du post des favoris");
        }
    };
};












export const searchUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${APP_API_URL}/api/user/search`)
            .then((res) => {
                dispatch({ type: SEARCH_USERS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

