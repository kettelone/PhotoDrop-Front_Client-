import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'
import './styles/index.css'
import Header from './components/common/header/Header'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
