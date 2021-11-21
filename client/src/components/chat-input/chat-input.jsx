import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {ActionCreator} from '../../redux/action-creator';

import './chat-input.scss';

const ChatInput = () => {
  const [text, setText] = useState(``);
  const dispatch = useDispatch();


  const onInputChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(ActionCreator.sendMessage(text));
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
export default ChatInput;
