import './App.css'
import { NavLink } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>BANK!</h1>
      <h2>THE GAME</h2>
      <NavLink to="/players">New Game</NavLink>
    </>
  )
}

export default App
