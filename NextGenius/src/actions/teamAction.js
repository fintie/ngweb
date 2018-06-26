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
export const getTeamList = () => {
  // TODO Below is from static data, it can switch to api in the future
  return {
    type: GET_TEAM_DATA,
    payload: {teamList: TEAM_LIST}
  }
};

export const jobInquiry = (btnId, data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REQUEST,
      payload: {id: btnId}
    });

    try {
      // await postData('/applyJob', data);
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