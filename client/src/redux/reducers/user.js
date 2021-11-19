import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SET_NAME,
  USER_SET_COLOR,
  USER_NEW_PRESENTER,
} from '../types';

const initialState = {
  name: ``,
  isAuth: false,
  type: undefined,
  color: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case USER_SET_NAME:
    const name = action.payload;
    return {...state, name};

  case USER_LOGIN:
    const type = action.payload;

    return {
      ...state,
      type,
      isAuth: true,
      showRules: true,
    };

  case USER_LOGOUT:
    return {
      ...state,
      name: ``,
      color: undefined,
      type: undefined,
      isAuth: false,
    };

  case USER_SET_COLOR:
    return {
      ...state,
      color: action.payload,
    };

  case USER_NEW_PRESENTER:
    const newPresenter = action.payload;

    if (newPresenter === state.name) {
      return {
        ...state,
        type: `presenter`,
      };
    }

    return state;
  }

  return state;
};
