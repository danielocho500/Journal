import React from 'react';
import { Provider } from 'react-redux'; //store

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
