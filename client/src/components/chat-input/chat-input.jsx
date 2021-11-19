import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../redux/action-creator';

import './chat-input.scss';
import { useSelector } from 'react-redux';

const ChatInput = ({name: user, color}) => {
  const [text, setText] = useState(``);
  const dispatch = useDispatch();

  const connection = useSelector(({messages}) => messages.connection);

  const onInputChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    connection.invoke("SendMessage", text);
    dispatch(ActionCreator.sendMessage({user, text, color}));
    setText(``);
  };

  return (
    <form onSubmit={onSubmit} className="chat__input-form">
      <input
        required
        type="text"
        value={text}
        minLength="1"
        className="chat__input"
        onChange={onInputChange}
        placeholder="Введіть запитання або здогадку"
      />

      <button
        type="submit"
        className="chat__input-submit"
      >Відправити</button>
    </form>
  );
};

ChatInput.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default ChatInput;
