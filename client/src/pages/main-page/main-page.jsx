import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../redux/action-creator';

import './main-page.scss';


const MainPage = () => {
  const [input, setInput] = useState(``);

  const connection = useSelector(({messages}) => messages.connection);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    connection.invoke('Connect', input);

    dispatch(ActionCreator.setName(input));
    dispatch(ActionCreator.setJustLogged(true));
    dispatch(ActionCreator.toggleRules());
  };

  return (
    <section className="main">
      <form onSubmit={onSubmit} className="main">
        <div className="main__input-wrapper">
          <input
            required
            type="text"
            value={input}
            minLength={1}
            maxLength={20}
            className="main__input"
            placeholder="Введіть Ваше ім'я"
            onInput={(event) => setInput(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="main__button"
        >Увійти</button>
      </form>
    </section>
  );
};

export default MainPage;
