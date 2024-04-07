import axios from 'axios';
import { APP_API_URL } from '../config';

// Story actions
export const GET_STORIES = 'GET_STORIES';
export const ADD_STORY = 'ADD_STORY';
export const LIKE_STORY = 'LIKE_STORY';
export const DISLIKE_STORY = 'DISLIKE_STORY';
export const VIEW_STORY = 'VIEW_STORY';
export const VIEW_STORY_FAILED = 'VIEW_STORY_FAILED';
export const COMMENT_STORY = 'COMMENT_STORY';
export const DELETE_STORY = 'DELETE_STORY';
export const GET_STORIES_WITH_VIEWS = 'GET_STORIES_WITH_VIEWS';

// Action creators
export const getStories = (num) => {
  return (dispatch) => {
    return axios
      .get(`${APP_API_URL}/api/stories`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_STORIES, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addStory = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${APP_API_URL}/api/stories/`, data);

      if (response.data.message === 'Story added to container successfully!') {
        dispatch({ type: ADD_STORY, payload: response.data.story });
      } else {
        console.log('Error adding story:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding story:', error);

      // Gérer les erreurs ici (si nécessaire)
    }
  };
};

export const likeStory = (storyId, posterId) => {
  return (dispatch) => {
    return axios
      .patch(`${APP_API_URL}/api/stories/like-story/${storyId}`, posterId)
      .then((res) => {
        dispatch({ type: LIKE_STORY, payload: { storyId, posterId } });
      })
      .catch((err) => console.log(err));
  };
};

export const dislikeStory = (storyId, posterId) => {
  return (dispatch) => {
    return axios
      .patch(`${APP_API_URL}/api/stories/dislike-story/${storyId}`, posterId)
      .then((res) => {
        dispatch({ type: DISLIKE_STORY, payload: { storyId, posterId } });
      })
      .catch((err) => console.log(err));
  };
};




export const viewStory = (containerId, storyId, viewerId) => {
  return async (dispatch) => {
    try {
      console.log("Calling viewStory API with containerId:", containerId, "storyId:", storyId, "viewerId:", viewerId);
      const res = await axios.post(`${APP_API_URL}/api/stories/view-story/${containerId}/${storyId}`, { viewerId });
      console.log("viewStory API response:", res.data);
      dispatch({ type: VIEW_STORY, payload: { containerId, storyId, viewer: res.data } });
    } catch (error) {
      console.error("Error in viewStory:", error);
      dispatch({ type: VIEW_STORY_FAILED, payload: error.message });
    }
  };
};





export const commentStory = (storyId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios
      .patch(`${APP_API_URL}/api/stories/comment-story/${storyId}`, {
        commenterId,
        text,
        commenterPseudo,
      })
      .then((res) => {
        dispatch({ type: COMMENT_STORY, payload: { storyId, comment: res.data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteStory = (storyId) => {
  return (dispatch) => {
    return axios
      .delete(`${APP_API_URL}/api/stories/${storyId}`)
      .then((res) => {
        dispatch({ type: DELETE_STORY, payload: { storyId } });
      })
      .catch((err) => console.log(err));
  };
};




export const getStoriesWithViews = () => {
  return (dispatch) => {
    return axios
      .get(`${APP_API_URL}/api/stories/storiesWithViews`)
      .then((res) => {
        dispatch({ type: GET_STORIES_WITH_VIEWS, payload: res.data });
      })
      .catch((err) => console.error(err));
  };
};