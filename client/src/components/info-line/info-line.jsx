import React from 'react';
import PropTypes from 'prop-types';

import UserAvatar from '../user-avatar/user-avatar';


import './info-line.scss';

const userTypeToRole = {
  'presenter': `Крокодил`,
  'player': `Користувач`,
};

const InfoLine = ({name, type, color, logout}) => {
  return (
    <section className="info">
      <div className="info__user">
        <UserAvatar
          width={52}
          color={color}
          className="info__user-color"
        />

        <div className="info__user-data">
          <p className="info__user-name">{name}</p>
          <p className="info__user-type">{userTypeToRole[type]}</p>
        </div>
      </div>

      <button onClick={logout} title="Вийти" className="info__logout">
        <span className="info__logout--text">Вийти</span>
        <img src="./img/close.svg" alt="Вийти" />
      </button>
    </section>
  );
};

InfoLine.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  type: PropTypes.oneOf([`player`, `presenter`]).isRequired,
};

export default InfoLine;
