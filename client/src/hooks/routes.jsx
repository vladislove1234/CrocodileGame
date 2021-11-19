import React from 'react';
import {Route, Routes} from 'react-router-dom';

import MainPage from '../pages/main-page';
import ChatPage from '../pages/chat-page';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
