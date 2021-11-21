import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';


import 'normalize.css';
import './app.scss';

import {useRoutes} from '../../hooks/routes';
import {ActionCreator} from '../../redux/action-creator';

const App = () => {
  // wait until we check is user logined

  const isAuth = useSelector(({user}) => user.isAuth);
  const dispatch = useDispatch();

  const router = useRoutes(isAuth);

  useEffect(async () => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`https://localhost:5050/chat`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    dispatch(ActionCreator.initMessages(connection));
  }, []);

  return (
    <Router>
      {router}
    </Router>
  );
};

export default App;
