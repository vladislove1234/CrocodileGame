import {
  GAME_SET_WORD,
  GAME_TOGGLE_RULES,
  GAME_TOGGLE_START,
  GAME_SET_JUST_LOGGED,
  GAME_SET_WINNER,
  GAME_CLEAR_WINNER,
} from '../types';

const initialState = {
  showRules: false,
  showStart: false,
  justLogged: false,
  word: null,
  win: {
    show: false,
    winner: ``,
    word: ``,
  },
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

  case GAME_SET_WINNER:
    const winner = action.payload;

    return {
      ...state,
      win: {
        ...state.win,
        show: true,
        winner: winner.name,
        word: winner.word,
      },
    };

  case GAME_CLEAR_WINNER:
    return {
      ...state,
      win: {
        ...state.win,
        show: false,
        winner: ``,
        word: ``,
      },
    };
  };

  return state;
};
