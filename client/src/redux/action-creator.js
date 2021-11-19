import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SET_NAME,
  MESSAGE_SEND,
  MESSAGE_SELECT,
  MESSAGE_SET_RIGHT,
  MESSAGE_NEW_MESSAGE,
  MESSAGE_INIT_CONNECTION,
  GAME_TOGGLE_RULES,
  GAME_TOGGLE_START,
  GAME_SET_JUST_LOGGED,
} from './types';

const userActions = {
  setName: (name) => ({
    type: USER_SET_NAME,
    payload: name,
  }),

  login: (type, color) => ({
    type: USER_LOGIN,
    payload: {type, color},
  }),

  logout: () => ({
    type: USER_LOGOUT,
  }),
};

const messageActions = {
  initMessages: (connection) => async (dispatch) => {
    connection.on(`Connected`, (...args) => {
      console.log(args);
      
      const [type, color] = args;
      dispatch(userActions.login(type, color));
    });

    connection.on(`NewMessage`, (...args) => {
      console.log(args);
      
      const [message] = args;
      dispatch(messageActions.newMessage(message));
    });

    await connection.start();

    return {
      type: MESSAGE_INIT_CONNECTION,
      payload: connection,
    };
  },

  sendMessage: ({user, text, type = undefined, color = undefined}) => ({
    type: MESSAGE_SEND,
    payload: {user, text, type, color},
  }),

  selectMessage: (id) => ({
    type: MESSAGE_SELECT,
    payload: id,
  }),

  setRight: (isRight) => ({
    type: MESSAGE_SET_RIGHT,
    payload: isRight,
  }),

  newMessage: (message) => ({
    type: MESSAGE_NEW_MESSAGE,
    payload: message,
  }),
};

const gameActions = {
  toggleRules: () => ({
    type: GAME_TOGGLE_RULES,
  }),

  toggleStart: () => ({
    type: GAME_TOGGLE_START,
  }),

  setJustLogged: (justLogged = false) => ({
    type: GAME_SET_JUST_LOGGED,
    payload: justLogged,
  }),
};

export const ActionCreator = {
  ...userActions,
  ...messageActions,
  ...gameActions,
};
