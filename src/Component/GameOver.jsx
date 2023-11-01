import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router";
import { clearBanks, clearPlayers } from "../ducks/playerSlice";

function GameOver() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ordered, setOrdered] = useState([])
  const [first, setFirst] = useState('<></>')

  const players = useSelector(state => state.players.value)

  useEffect(() => {
    if(players.length === 0) {
      alert('No players playing, add players')

      dispatch(clearPlayers())
      navigate('/players')
    }
  }, [])

  useEffect(() => {
    const allPlayers = [...players]

    const winnerInfo = allPlayers.shift()
    const winner = (<div>
      <h1>Winner - {winnerInfo.name}</h1>
      <h1>{winnerInfo.bank}</h1>
    </div>)

    setFirst(winner)

    setOrdered(allPlayers.sort((a, b) => b.bank - a.bank).map((player, i) => {
      return (
        <div>
          <h2>{i + 2} - {player.name} {player.bank}</h2>
        </div>
      )
    }))

  }, [])

  const playAgainFn = () => {
    dispatch(clearBanks())
    navigate('/game')
  }

  const editPlayersFn = () => {
    dispatch(clearBanks())
    navigate('/players')
  }

  const exitFn = () => {
    dispatch(clearPlayers())
    navigate('/')
  }

  return (
    <div>
      {first}
      {ordered}
      <button className="game-over-btns" onClick={playAgainFn}>Play Again</button>
      <button className="game-over-btns" onClick={editPlayersFn}>Edit Players</button>
      <button className="game-over-btns" onClick={exitFn}>Exit Game</button>
    </div>
  )
}

export default GameOver