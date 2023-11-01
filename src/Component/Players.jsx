import { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { addPlayer, removePlayer, clearPlayers } from "../ducks/playerSlice"
import { useDispatch, useSelector } from "react-redux"

function Players () {
  const dispatch = useDispatch()
  const ref = useRef()

  const [newName, setNewName] = useState('')
  const players = useSelector((state) => state.players.value)

  const addNameFn = (name) => {
    if(players.filter(player => player.name === name).length > 0) {
      alert('Names cannot repeat')
      return
    }

    const player = {
      name: name,
      bank: 0
    }
    dispatch(addPlayer(player))
    setNewName('')
    ref.current.focus()
  }

  const removePlayerFn = (name) => {
    let removalPlayers = [...players]

    let index = removalPlayers.findIndex(e => e.name === name)

    removalPlayers.splice(index, 1)

    dispatch(removePlayer(removalPlayers))
  }

  const playerNames = players.map(player => {
    return (
      <li key={player.name} onClick={e => removePlayerFn(e.target.textContent)}>{player.name}</li>
    )
  })

  return (
    <>
      <h1>Enter Names Below</h1>
      <h2>Current Players:</h2>
      <ul id="player-list">{playerNames}</ul>

      <div>
        <input
          id="new-name-input"
          type="text"
          value={newName}
          ref={ref}
          onChange={e => setNewName(e.target.value)}
        />
        <button onClick={() => addNameFn(newName)}>Add player</button>
        <button id="clear-btn" onClick={() => dispatch(clearPlayers())}>Clear</button>
      </div>
      <NavLink id="start-game" to="/game">Start Game</NavLink>
    </>
  )
}

export default Players