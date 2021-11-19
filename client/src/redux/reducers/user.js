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
    localStorage.setItem(`name`, name);

    return {...state, name};

  case USER_LOGIN:
    const {color, type} = action.payload;

    return {
      ...state,
      type,
      color,
      isAuth: true,
      showRules: true,
    };

  case USER_LOGOUT:
    localStorage.removeItem(`name`);

    return {
      ...state,
      name: ``,
      type: undefined,
      isAuth: false,
    };
  }

  return state;
};
