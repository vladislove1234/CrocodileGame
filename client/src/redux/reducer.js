import {combineReducers} from 'redux';

import userReducer from './reducers/user';
import gameReducer from './reducers/game';
import messagesReducer from './reducers/messages';

export const reducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  messages: messagesReducer,
});
