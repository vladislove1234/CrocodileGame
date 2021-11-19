import React from 'react';
import PropTypes from 'prop-types';

import './rules.scss';
import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../redux/action-creator';

const Rules = ({type}) => {
  const dispatch = useDispatch();

  const show = useSelector(({game}) => game.showRules);
  const justLogged = useSelector(({game}) => game.justLogged);


  const onCloseClick = (event) => {
    event.preventDefault();
    dispatch(ActionCreator.toggleRules());

    if (justLogged) {
      dispatch(ActionCreator.toggleStart());
    }
  };

  const className= `rules__wrapper ${!show && `rules__wrapper--hide`}`;

  if (type === `user`) {
    return (
      <section className={className}>
        <div className="rules">
          <h2 className="rules__heading">Вітаю!</h2>
          <p className="rules__text">
            За результатом жеребкування Ви:
            <span className="rules__text--bold"> гравець</span>.
          </p>

          <p className="rules__text">
          Ви потрапили у гру “Крокодил”. Правила прості:
          відгадати слово ведучого, задаючи йому питання в чаті. Якщо Ваше
          запитання чи здогадка правильні, то повідомлення ставатиме
            <span className="rules__text--green">зеленим</span>,
          якщо ж ні — <span className="rules__text--red">червоним</span>.
          </p>

          <button
            onClick={onCloseClick}
            className="rules__continue"
          >Продовжити</button>
        </div>
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="rules">
        <h2 className="rules__heading">Вітаю!</h2>
        <p className="rules__text">
          За результатом жеребкування Ви:
          <span className="rules__text--bold"> крокодил</span>.
          <br />
          Ваше слово:
          <span className="rules__text--bold"> автомобіль</span>.
        </p>

        <p className="rules__text">
          Ви потрапили у гру “Крокодил”. Правила прості: Завдання
          крокодила максимально швидко віповідати на запитання гравців.
          Для цього у Вас будуть лише дві кнопки:
          <span className="rules__text--green">Так</span> або
          <span className="rules__text--red">Ні</span>.
          Коли гравець правильно назве загадане слово, програма автоматично
          завершить поточну гру, зробивши переможця ведучим.
        </p>

        <button
          onClick={onCloseClick}
          className="rules__continue"
        >Продовжити</button>
      </div>
    </section>
  );
};

Rules.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.oneOf([`user`, `leader`]),
};

export default Rules;
