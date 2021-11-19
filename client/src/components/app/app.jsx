import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


import 'normalize.css';
import './app.scss';

import {useRoutes} from '../../hooks/routes';
import {ActionCreator} from '../../redux/action-creator';

const App = () => {
  // wait until we check is user logined
  const [ready, setReady] = useState(false);

  const isAuth = useSelector(({user}) => user.isAuth);
  const dispatch = useDispatch();

  const router = useRoutes(isAuth);

  useEffect(async () => {
    const username = localStorage.getItem(`name`);
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`https://localhost:5050/chat`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    dispatch(ActionCreator.initConnection(connection));

    if (username) {
      connection.invoke('Connect', username);
      dispatch(ActionCreator.setName(username));
    }

    setReady(true);
  }, []);

  if (ready) {
    return (
      <Router>
        {router}
      </Router>
    );
  }

  return <div />;
};

export default App;
