import {
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS
} from '../actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const ACTION_HANDLERS = {
  [FETCH_REQUEST]: (state, { payload }) => {
    return {
      ...state,
      [payload.id]: true
    };
  },
  [FETCH_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      [payload.id]: false
    };
  },
  [FETCH_FAILURE]: (state, { payload }) => {
    return {
      ...state,
      [payload.id]: false
    };
  }
};
