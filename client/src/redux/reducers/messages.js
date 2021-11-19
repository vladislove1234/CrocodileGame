import {
  MESSAGE_SELECT,
  MESSAGE_SEND,
  MESSAGE_SET_RIGHT,
  MESSAGE_INIT_CONNECTION,
  MESSAGE_NEW_MESSAGE,
  MESSAGE_SET_MESSAGES,
  MESSAGE_DISCONNECT,
  MESSAGE_ADD_SYSTEM_MESSAGE,
} from '../types';

const initialState = {
  selectedMessage: null,
  connection: null,
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case MESSAGE_INIT_CONNECTION:
    return {
      ...state,
      connection: action.payload,
    };

  case MESSAGE_SET_MESSAGES:
    return {
      ...state,
      messages: action.payload,
    };

  case MESSAGE_SEND:
    const text = action.payload;
    state.connection.invoke(`SendMessage`, text);

    return state;

  case MESSAGE_SELECT:
    const id = action.payload;

    return {
      ...state,
      selectedMessage: id,
    };

  case MESSAGE_SET_RIGHT:
    const isRight = `${action.payload}`;
    const {selectedMessage} = state;
    const answer = `${isRight[0].toUpperCase()}${isRight.slice(1)}`;

    state.connection.invoke(`AnswerMessage`, selectedMessage, answer);
    return state;
  
  case MESSAGE_NEW_MESSAGE:
    return {
      ...state,
      messages: [...state.messages, action.payload],
    };

  case MESSAGE_DISCONNECT:
    state.connection.invoke(`Disconnect`);
    return state;

  case MESSAGE_ADD_SYSTEM_MESSAGE:
    return {
      ...state,
      messages: [...state.messages, {
        id: action.payload,
        text: action.payload,
        messageType: `system`,
      }],
    };
  }

  return state;
};
