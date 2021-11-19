import {
  MESSAGE_SELECT,
  MESSAGE_SEND,
  MESSAGE_SET_RIGHT,
  MESSAGE_INIT_CONNECTION,
} from '../types';

const initialState = {
  selectedMessage: null,
  connection: null,
  messages: [],
};

// {
//   id: `1`,
//   type: `system`,
//   isRight: undefined,
//   text: `Віталій Кличко покинув(-ла) гру`,
// }, {
//   id: `2`,
//   user: `Tester`,
//   date: new Date(),
//   isRight: undefined,
//   text: `Test Message`,
//   color: `#fa8`,
// }

export default (state = initialState, action) => {
  switch (action.type) {
  case MESSAGE_INIT_CONNECTION:
    return {
      ...state,
      connection: action.payload,
    };


  case MESSAGE_SEND:
    const {user, text, type, color} = action.payload;

    return {
      ...state,
      messages: [
        ...state.messages,
        {
          user, text, type, color,
          date: new Date(),
          id: +(new Date()) + text,
        },
      ],
    };

  case MESSAGE_SELECT:
    const id = action.payload;

    return {
      ...state,
      selectedMessage: id,
    };

  case MESSAGE_SET_RIGHT:
    const isRight = action.payload;
    const messages = [...state.messages].map((message) => {
      if (message.id === state.selectedMessage) {
        message.isRight = isRight;
      }

      return message;
    });

    return {
      ...state,
      messages,
      selectedMessage: null,
    };
  
  case MESSAGE_NEW_MESSAGE:
    return {
      ...state,
      messages: [...state.messages, action.payload],
    };
  }

  return state;
};
