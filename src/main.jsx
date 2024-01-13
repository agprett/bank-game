import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Players from './Component/Players.jsx'
import Game from './Component/Game.jsx'
import GameOver from './Component/GameOver.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import store from './ducks/store.js'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.scss'
import './App.css'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/players',
    element: <Players />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/game-over',
    element: <GameOver />
  }
], {
  basename: '/bank-game'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
