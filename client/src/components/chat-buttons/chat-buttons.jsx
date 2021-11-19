import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActionCreator} from '../../redux/action-creator';

import './chat-buttons.scss';

const ChatButtons = () => {
  const isSelected = useSelector(({messages}) => !!messages.selectedMessage);

  const dispatch = useDispatch();

  const onButtonClick = (event, isRight) => {
    event.preventDefault();
    dispatch(ActionCreator.setRight(isRight));
  };

  return (
    <section className="chat-button__wrapper">
      <button
        disabled={!isSelected}
        className="chat-button chat-button--yes"
        onClick={((event) => onButtonClick(event, true))}
      >Так</button>

      <button
        disabled={!isSelected}
        className="chat-button chat-button--no"
        onClick={((event) => onButtonClick(event, false))}
      >Ні</button>
    </section>
  );
};

export default ChatButtons;
