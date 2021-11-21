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
  const isScaled = useSelector(({game}) => {
    return game.showRules || game.showStart || game.win.show;
  });
  const showStart = useSelector(({game}) => game.showStart);
  const win = useSelector(({game}) => game.win);

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

      {/* Star Game Alert */}
      <AlertScreen
        title="Гру розпочато!"
        show={showStart}
        onClose={() => {
          dispatch(ActionCreator.setJustLogged(false));
          dispatch(ActionCreator.toggleStart());
        }}
      />

      {/* Win game alert */}
      <AlertScreen
        text={`Гравець ${win.winner} відгадав слово “${win.word.toUpperCase()}”,
         внаслідок чого стає крокодилом`}
        title="Гру завершено!"
        show={win.show}
        time={4000}
        onClose={() => {
          dispatch(ActionCreator.clearWinner());
        }}
      />

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
