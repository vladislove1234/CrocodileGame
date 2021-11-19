import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {ActionCreator} from '../../redux/action-creator';

import './alert-screen.scss';

const AlertScreen = ({title, text = ``}) => {
  const dispatch = useDispatch();

  const showStart = useSelector(({game}) => game.showStart);

  const className = `
    alert__wrapper ${!showStart && `alert__wrapper--hide`}
  `;

  useEffect(() => {
    if (showStart) {
      setTimeout(() => {
        dispatch(ActionCreator.setJustLogged(false));
        dispatch(ActionCreator.toggleStart());
      }, 3000);
    }
  }, [showStart]);

  return (
    <section className={className}>
      <div className="alert">
        <h2 className="alert__title">{title}</h2>
        {text && <p className="alert__text">{text}</p>}
      </div>
    </section>
  );
};

AlertScreen.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default AlertScreen;
