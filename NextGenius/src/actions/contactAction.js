import {TEAM_LIST} from '../assets/data/team';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  GET_TEAM_DATA
} from '../actionTypes/index';
import {postData} from '../utils/api';

// ------------------------------------
// Actions
// ------------------------------------
export const contactUs = (btnId, data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REQUEST,
      payload: {id: btnId}
    });

    try {
      // await postData('/contactUs', data);
      await resolveAfterSeconds(3);
      dispatch({
        type: FETCH_SUCCESS,
        payload: {id: btnId}
      });

    } catch (err) {
      dispatch({
        type: FETCH_FAILURE,
        payload: {id: btnId}
      });
    }

  };

};


const resolveAfterSeconds = (seconds) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};