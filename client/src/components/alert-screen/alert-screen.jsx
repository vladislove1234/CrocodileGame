import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import './alert-screen.scss';

const AlertScreen = ({title, text = ``, time = 3000, show, onClose}) => {
  useEffect(() => {
    if (show) {
      setTimeout(onClose, time);
    }
  }, [show]);

  return (
    <section className={`alert__wrapper ${!show && `alert__wrapper--hide`}`}>
      <div className="alert">
        <div 
          style={{animationDuration: `${time}ms`}}
          className="alert__text-wrapper"
        >
          <h2 className="alert__title">{title}</h2>
          {text && <p className="alert__text">{text}</p>}
        </div>
      </div>
    </section>
  );
};

AlertScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  time: PropTypes.number,
  text: PropTypes.string,
};

export default AlertScreen;
