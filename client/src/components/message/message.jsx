import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {ActionCreator} from '../../redux/action-creator';

import UserAvatar from '../user-avatar/user-avatar';

import './message.scss';

// id: PropTypes.string.isRequired,
// text: PropTypes.string.isRequired,
// type: PropTypes.number.isRequired,
// lastFromUser: PropTypes.bool,
// fromMe: PropTypes.bool,
// sentAt: PropTypes.string,
// sender: PropTypes.shape({
//   color: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// }),

const Message = (props) => {
  const {
    id, text, sentAt, sender, userType,
    type = 2,
    messageType = `player`,
    fromMe = false,
    lastFromUser = false,
  } = props;

  if (messageType === `system`) {
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

    if (userType === `presenter`) {
      dispatch(ActionCreator.selectMessage(id));
    }
  };

  const className = `
    message 
    message__user 
    ${type === 1 && `message__user--true`}
    ${type === 0 && `message__user--false`}
    ${isSelected && `message__user--selected`}
    ${!lastFromUser && `message__user--not-last`}
    ${userType === `presenter` && `message__user--hoverable`}
  `;

  const date = new Date(sentAt)
    .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

  if (fromMe) {
    return (
      <li
        onClick={onMessageClick}
        tabIndex={userType === `presenter` ? 1 : -1}
        className={`${className} message__user--right`}
      >
        <div className="message__text">
          {text}
          <span className="message__date">{date}</span>
        </div>

        <div className="message__profile">
          <UserAvatar width={52} color={sender.color} />
          <span className="message__name">{sender.name}</span>
        </div>
      </li>
    );
  }

  return (
    <li
      onClick={onMessageClick}
      tabIndex={userType === `presenter` ? 1 : -1}
      className={`${className} message__user--left`}
    >
      <div className="message__profile">
        <UserAvatar width={52} color={sender.color} />
        <span className="message__name">{sender.name}</span>
      </div>

      <div className="message__text">
        {text}
        <span className="message__date">{date}</span>
      </div>
    </li>
  );
};

Message.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.number,
  lastFromUser: PropTypes.bool,
  fromMe: PropTypes.bool,
  sentAt: PropTypes.string,
  userType: PropTypes.oneOf([`presenter`, `player`]),
  messageType: PropTypes.oneOf([`system`, `player`]),
  sender: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default React.memo(Message);
