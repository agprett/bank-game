import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './ducks/playerSlice.js'

export default configureStore({
  reducer: {
    players: playerReducer
  },
})