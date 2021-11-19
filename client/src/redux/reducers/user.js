import {USER_LOGIN, USER_LOGOUT, USER_SET_NAME} from '../types';

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
      type: undefined,
      isAuth: false,
    };
  }

  return state;
};
