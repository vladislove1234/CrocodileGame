import React from 'react';
import PropTypes from 'prop-types';

import './user-avatar.scss';

const UserAvatar = ({color = `#000`, width = 32, className, ...other}) => {
  return (
    <div
      {...other}
      style={{
        background: color,
        width, height: width,
      }}
      className={`user-avatar ${className}`}
    />
  );
};

UserAvatar.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
};

export default React.memo(UserAvatar);
