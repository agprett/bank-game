import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { updateBankAmount } from "../ducks/playerSlice"

function Game () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const players = useSelector(state => state.players.value)

  const [round, setRound] = useState(1)
  const [numRolls, setNumRolls] = useState(0)
  const [bankAmount, setBankAmount] = useState(0)
  const [viewNums, setViewNums] = useState(false)
  const [viewBank, setViewBank] = useState(false)
  const [names, setNames] = useState([])
  const [lastRolled, setLastRolled] = useState('')
  const [active, setActive] = useState([])
  const [banking, setBanking] = useState([])
  const [banked, setBanked] = useState([])

  useEffect(() => {
    if(players.length === 0) {
      alert('Must have at least 1 player')
      navigate('/players')
    }
  }, [])

  useEffect(() => {
    const nameCollector = players.map(player => {
      return player.name
    })

    setNames(nameCollector)
    setActive(nameCollector)
  }, [])

  const updateBank = (value) => {
    if(numRolls < 3) {
      if(+value === 7) {
        setBankAmount(bankAmount + 70)
      } else if(value === 'DOUBLES!') {
        alert('No doubles during first three rounds')
        return
      } else {
        setBankAmount(bankAmount + +value)
      }
    } else {
      if(+value === 2 || +value === 12) {
        alert(`2's and 12's should be doubles!`)
        return
      } else if(+value === 7) {
        if(round === 10) {
          alert('Game Over!')
          navigate('/game-over')
        } else {
          setBankAmount(0)
          setNumRolls(0)
          setRound(round + 1)
          setViewNums(false)
          setBanked([])
          setBanking([])

          let reorderedActive = [...names]

          while(reorderedActive[reorderedActive.length - 1] !== lastRolled) {
            reorderedActive.push(reorderedActive.shift())
          }
          setActive(reorderedActive)
          
          return
        }
      } else if(value === 'DOUBLES!') {
        setBankAmount(bankAmount * 2) 
      } else {
        setBankAmount(bankAmount + +value)
      }
    }
    setNumRolls(numRolls + 1)

    setLastRolled(active[0])
    let rolled = [...active]
    rolled.push(rolled.shift())
    setActive(rolled)
  }

  const bankingUpdate = (e) => {
    const name = e.target.value
    if(banking.includes(name)) {
      const index = banking.findIndex(e => e === name)

      const newBanking = [...banking]

      newBanking.splice(index, 1)

      setBanking(newBanking)
    } else {
      const newBanking = [...banking]
      newBanking.push(name)
      setBanking(newBanking)
    }
  }

  const saveBanking = () => {
    banking.forEach(name => {
      console.log(name)

      setActive((state) => {
        const activeIndex = state.findIndex(e => e === name)
        const updatedActive = [...state]
        updatedActive.splice(activeIndex, 1)

        return updatedActive
      })
      

      dispatch(updateBankAmount({name, amount: bankAmount}))

      const updatedBanked = [...banked]
      updatedBanked.push(name)
      setBanked(updatedBanked)
    })

    if(active.length - banking.length === 0) {
      if(round === 10) {
        alert('Game Over!')
        navigate('/game-over')
      } else {
        setBankAmount(0)
        setNumRolls(0)
        setRound(round + 1)
        setViewBank(false)
        setBanked([])
        setBanking([])

        let reorderedActive = [...names]

        while(reorderedActive[reorderedActive.length - 1] !== lastRolled) {
          reorderedActive.push(reorderedActive.shift())
        }
        setActive(reorderedActive)
        
        return
      }
    }

    setBanking([])
  }

  const scoreView = [...players].sort((a, b) => b.bank - a.bank).map(player => {
    return (
      <p key={player.name}>{player.name}: {player.bank}</p>
    )
  })

  const activeView = active.map(name => {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td><input checked={banking.includes(name) ? true : ''} value={name} onChange={bankingUpdate} type="checkbox"/></td>
      </tr>
    )
  })

  return (
    <>
      <h2>Round: {round}/10</h2>
      <h2 id="bank-total">Current Total: {bankAmount}</h2>

      <h2>Scores</h2>

      <div id="score-view">{scoreView}</div>
    

      {viewNums && (
        <div id="roll-div">
          <h3 id="roll-turn">{active[0]}'s Turn</h3>
          <button
            className={numRolls < 3 ? "rolled-num" : "rolled-num disabled"}
            onClick={e => updateBank(e.target.textContent)}
          >2</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >3</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >4</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >5</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >6</button>
          <button
            className={numRolls < 3 ? "rolled-num" : "rolled-num bad"}
            onClick={e => updateBank(e.target.textContent)}
          >7</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >8</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >9</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >10</button>
          <button
            className="rolled-num"
            onClick={e => updateBank(e.target.textContent)}
          >11</button>
          <button
            className={numRolls < 3 ? "rolled-num" : "rolled-num disabled"}
            onClick={e => updateBank(e.target.textContent)}
          >12</button>
          <button
            className={numRolls >= 3 ? "rolled-num" : "rolled-num disabled"}
            onClick={e => updateBank(e.target.textContent)}
          >DOUBLES!</button>
        </div>
      )}

      {viewBank && (
        <div id="bank-div">
          <table id="bank-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Bank</th>
              </tr>
            </thead>
            <tbody id="bank-select">{activeView}</tbody>
          </table>
          <button
            className={numRolls < 3 ? 'disabled' : ''}
            onClick={saveBanking}
          >Confirm</button>
        </div>
      )}
    
      <div id="game-btns-display">
        <button className="game-btns" onClick={() => {
          setViewNums(!viewNums)
          setViewBank(false)
        }}>Roll</button>
        <button className="game-btns" onClick={() => {
          setViewBank(!viewBank)
          setViewNums(false)
        }}>Bank</button>
      </div>
    </>
  )
}

export default Game