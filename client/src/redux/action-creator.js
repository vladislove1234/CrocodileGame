import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SET_NAME,
  USER_SET_COLOR,
  USER_NEW_PRESENTER,
  MESSAGE_SEND,
  MESSAGE_SELECT,
  MESSAGE_SET_RIGHT,
  MESSAGE_NEW_MESSAGE,
  MESSAGE_INIT_CONNECTION,
  MESSAGE_ADD_SYSTEM_MESSAGE,
  MESSAGE_SET_MESSAGES,
  MESSAGE_DISCONNECT,
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

  setColor: (color) => ({
    type: USER_SET_COLOR,
    payload: color,
  }),

  login: (userType) => ({
    type: USER_LOGIN,
    payload: userType,
  }),

  logout: () => ({
    type: USER_LOGOUT,
  }),

  newPresenter: (person) => ({
    type: USER_NEW_PRESENTER,
    payload: person,
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

    connection.on(`Player`, (player) => {
      console.log(`Player:`, player);
      dispatch(userActions.setColor(player.color));
    });

    connection.on(`NewMessage`, (message) => {
      console.log(`NewMessage`, message);
      dispatch(messageActions.newMessage(message));
    });

    connection.on(`ConnectedPlayer`, (playerName) => {
      console.log(`ConnectedPlayer`, playerName);
      dispatch(
        messageActions.addSystemMessage(`${playerName} приєднався(-лася)`),
      );
    });

    connection.on(`NewPresenter`, (presenterName) => {
      console.log(`NewPresenter`, presenterName);

      dispatch(userActions.newPresenter(presenterName));
      dispatch(
        messageActions.addSystemMessage(
          `${presenterName} став новим крокодилом`,
        ),
      );
    });

    connection.on(`Disconnected`, (person) => {
      console.log(`Disconnected`, person);
      dispatch(
        messageActions.addSystemMessage(
          `${person} покинув(-ла) гру`,
        ),
      );
    });

    connection.on(`NewWord`, (word) => {
      console.log(`NewWord`, word);
      dispatch(gameActions.setWord(word));
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

  addSystemMessage: (text) => ({
    type: MESSAGE_ADD_SYSTEM_MESSAGE,
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

  disconnectMessages: () => ({
    type: MESSAGE_DISCONNECT,
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
