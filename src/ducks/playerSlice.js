import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'players',
  initialState: {
    value: []
  },
  reducers: {
    addPlayer: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    removePlayer: (state, action) => {
      state.value = action.payload
    },
    clearPlayers: (state) => {
      state.value = []
    },
    updateBankAmount: (state, action) => {
      const {name, amount} = action.payload

      const index = state.value.findIndex(player => player.name === name)

      state.value[index].bank += +amount
    },
    clearBanks: (state) => {
      state.value = state.value.map(player => {
        return {
          name: player.name,
          bank: 0
        }
      })
    }
  }
})

export const {addPlayer, removePlayer, clearPlayers, updateBankAmount, clearBanks} = playerSlice.actions

export default playerSlice.reducer