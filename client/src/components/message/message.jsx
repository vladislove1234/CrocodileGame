import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {ActionCreator} from '../../redux/action-creator';

import UserAvatar from '../user-avatar/user-avatar';

import './message.scss';


const Message = (props) => {
  const {
    id, text, user, date, isRight, color, userType,
    type = `user`,
    fromMe = false,
    lastFromUser = false,
  } = props;

  if (type === `system`) {
    return (
      <li className="message message__system">{text}</li>
    );
  }

  const isSelected = useSelector(
    ({messages}) => messages.selectedMessage === id,
  );

  const dispatch = useDispatch();
  const onMessageClick = (event) => {
    event.preventDefault();

    if (userType === `leader`) {
      dispatch(ActionCreator.selectMessage(id));
    }
  };

  const className = `
    message 
    message__user 
    ${isRight && `message__user--true`}
    ${isSelected && `message__user--selected`}
    ${!lastFromUser && `message__user--not-last`}
    ${isRight === false && `message__user--false`}
    ${userType === `leader` && `message__user--hoverable`}
  `;

  if (fromMe) {
    return (
      <li
        onClick={onMessageClick}
        tabIndex={userType === `leader` ? 1 : -1}
        className={`${className} message__user--right`}
      >
        <div className="message__text">
          {text}
          <span className="message__date">
            {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </span>
        </div>

        <div className="message__profile">
          <UserAvatar width={52} color={color} />
          <span className="message__name">{user}</span>
        </div>
      </li>
    );
  }

  return (
    <li
      onClick={onMessageClick}
      tabIndex={userType === `leader` ? 1 : -1}
      className={`${className} message__user--left`}
    >
      <div className="message__profile">
        <UserAvatar width={52} color={color} />
        <span className="message__name">{user}</span>
      </div>

      <div className="message__text">
        {text}
        <span className="message__date">
          {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
        </span>
      </div>
    </li>
  );
};

Message.propTypes = {
  user: PropTypes.string,
  fromMe: PropTypes.bool,
  color: PropTypes.string,
  lastFromUser: PropTypes.bool,
  id: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([`user`, `system`]),
  userType: PropTypes.oneOf([`user`, `leader`]),
  isRight: PropTypes.oneOf([false, true, undefined]),
};

export default React.memo(Message);
