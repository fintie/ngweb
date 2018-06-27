import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../actionTypes/index';
import {postData} from '../utils/api';

// ------------------------------------
// Actions
// ------------------------------------
export const handleSubmit = (btnId, data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REQUEST,
      payload: {id: btnId}
    });

    try {
      await postData('/tron', data);
      dispatch({
        type: FETCH_SUCCESS,
        payload: {id: btnId}
      });

    } catch (err) {
      dispatch({
        type: FETCH_FAILURE,
        payload: {id: btnId, error: err}
      });
    }

  };

};
