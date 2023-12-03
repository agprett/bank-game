import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Players from './Component/Players.jsx'
import Game from './Component/Game.jsx'
import './index.css'
import GameOver from './Component/GameOver.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import store from './store.js'
import { Provider } from 'react-redux'

const routes = createBrowserRouter([
  {
    path: '/bank-game',
    element: <App />
  },
  {
    path: 'players',
    element: <Players />
  },
  {
    path: 'game',
    element: <Game />
  },
  {
    path: 'game-over',
    element: <GameOver />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
