import { NavLink } from 'react-router-dom'

function App() {
  return (
    <section className='custom-page'>
      <div>
        <h1>BANK!</h1>
        <h2>THE GAME</h2>
      </div>
      <NavLink className={'btn btn-outline-light btn-lg'} to="/players">New Game</NavLink>
    </section>
  )
}

export default App