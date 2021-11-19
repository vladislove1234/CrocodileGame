import React from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {ActionCreator} from '../../redux/action-creator';

import ChatButtons from '../../components/chat-buttons/chat-buttons';
import ChatInput from '../../components/chat-input/chat-input';
import InfoLine from '../../components/info-line/info-line';
import Rules from '../../components/rules/rules';
import ChatList from '../../components/chat-list/chat-list';

import './chat-page.scss';
import AlertScreen from '../../components/alert-screen/alert-screen';

const ChatPage = () => {
  const isScaled = useSelector(({game}) => game.showRules || game.showStart);

  const [name, type, color] = useSelector(
    ({user}) => [user.name, user.type, user.color],
    shallowEqual,
  );

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(ActionCreator.disconnectMessages());
    dispatch(ActionCreator.logout());
  };

  const onInfoClick = (event) => {
    event.preventDefault();
    dispatch(ActionCreator.toggleRules());
  };

  return (
    <section className="chat-page">
      <Rules type={type} />
      <AlertScreen title="Гру розпочато!" />

      <div className={`chat__wrapper ${isScaled && `chat__wrapper--scaled`}`}>
        <section className="chat">
          <button
            onClick={onInfoClick}
            title="Показати правила"
            className="chat__show-rules"
          >
            <span className="visually-hidden">Показати правила</span>
            і
          </button>

          <InfoLine
            name={name}
            type={type}
            color={color}
            logout={logout}
          />

          <ChatList />
        </section>

        {
          type === `player` ?
            <ChatInput /> :
            <ChatButtons />
        }
      </div>
    </section>
  );
};

export default ChatPage;
