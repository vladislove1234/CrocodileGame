import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SET_NAME,
  MESSAGE_SEND,
  MESSAGE_SELECT,
  MESSAGE_SET_RIGHT,
  MESSAGE_NEW_MESSAGE,
  MESSAGE_INIT_CONNECTION,
  MESSAGE_SET_MESSAGES,
  GAME_TOGGLE_RULES,
  GAME_SET_WORD,
  GAME_TOGGLE_START,
  GAME_SET_JUST_LOGGED,
} from './types';

const userActions = {
  setName: (name) => ({
    type: USER_SET_NAME,
    payload: name,
  }),

  login: (userType) => ({
    type: USER_LOGIN,
    payload: userType,
  }),

  logout: () => ({
    type: USER_LOGOUT,
  }),
};

const messageActions = {
  initMessages: (connection) => async (dispatch) => {
    connection.on(`Connected`, (userType) => {
      console.log(`userType:`, userType);

      if (userType === `wrong_name`) {
        return console.error(`wrong_name`);
      }

      dispatch(userActions.login(userType));
      dispatch(ActionCreator.setJustLogged(true));
      dispatch(ActionCreator.toggleRules());
    });

    connection.on(`Messages`, (messages) => {
      console.log(`Messages:`, messages);
      dispatch(messageActions.setMessages(messages));
    });

    connection.on(`Word`, (word) => {
      console.log(`Word:`, word);
      dispatch(gameActions.setWord(word));
    });

    connection.on(`Players`, (players) => {
      console.log(`Players:`, players);
    });

    connection.on(`NewMessage`, (message) => {
      console.log(`NewMessage`, message);
      dispatch(messageActions.newMessage(message));
    });

    await connection.start();

    dispatch({
      type: MESSAGE_INIT_CONNECTION,
      payload: connection,
    });
  },

  sendMessage: (text) => ({
    type: MESSAGE_SEND,
    payload: text,
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

  setMessages: (messages) => ({
    type: MESSAGE_SET_MESSAGES,
    payload: messages,
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

  setWord: (word) => ({
    type: GAME_SET_WORD,
    payload: word,
  }),
};

export const ActionCreator = {
  ...userActions,
  ...messageActions,
  ...gameActions,
};
