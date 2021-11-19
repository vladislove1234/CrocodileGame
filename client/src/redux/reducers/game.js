import {
  GAME_SET_WORD,
  GAME_TOGGLE_RULES,
  GAME_TOGGLE_START,
  GAME_SET_JUST_LOGGED,
} from '../types';

const initialState = {
  showRules: false,
  showStart: false,
  justLogged: false,
  word: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GAME_TOGGLE_RULES:
    return {
      ...state,
      showRules: !state.showRules,
    };

  case GAME_TOGGLE_START:
    return {
      ...state,
      showStart: !state.showStart,
    };

  case GAME_SET_JUST_LOGGED:
    return {
      ...state,
      justLogged: action.payload,
    };

  case GAME_SET_WORD:
    return {
      ...state,
      word: action.payload,
    };
  }

  return state;
};
