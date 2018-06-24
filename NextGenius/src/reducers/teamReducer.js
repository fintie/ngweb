import {
  GET_TEAM_DATA
} from '../actionTypes';

const initialState = {teamList: []};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const ACTION_HANDLERS = {
  [GET_TEAM_DATA]: (state, { payload }) => {
    return {
      ...state,
      teamList: payload.teamList
    };
  }



};
