import { useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { addPlayer, removePlayer, clearPlayers } from "../ducks/playerSlice"
import { useDispatch, useSelector } from "react-redux"
import { Button, Container, Form, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap"

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

    if(name === '') {
      alert('Must enter a name')
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
    console.log(removalPlayers, name)

    let index = removalPlayers.findIndex(e => e.name === name)
    console.log(index)

    removalPlayers.splice(index, 1)

    dispatch(removePlayer(removalPlayers))
  }

  const playerNames = players.map(player => {
    return (
      <ListGroupItem key={player.name}>
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={10}>
              <p  className="player-name">{player.name}</p>
            </Col>
            <Col xs={2}>
                <i
                  className="bi bi-x-circle"
                  style={{color: '#dc3545'}}
                  onClick={e => removePlayerFn(player.name)}
                ></i>
            </Col>
            {/* <Col xs={2} p='0'>
              <Button
                variant="dark"
                className="players"
              >
                <i className="bi bi-arrows-vertical"></i>
              </Button>
            </Col> */}
          </Row>
        </Container>
      </ListGroupItem>
    )
  })

  return (
    <section className="custom-page">
      <div>
        <h1 className="mb-4">Enter Names Below</h1>
        <h2>Current Players:</h2>
        <ListGroup className="mt-4" variant="flush">{playerNames}</ListGroup>
      </div>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
          addNameFn(newName)
        }}
        onReset={(e) => {
          e.preventDefault()
          dispatch(clearPlayers())
        }}
      >
        <Row>
          <Form.Group className="mb-1">
            <Form.Control
              ref={ref}
              placeholder="Enter Name"
              onChange={e => setNewName(e.target.value)}
              value={newName}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="my-4"><Button type="submit" variant="success">Add player</Button></Row>
        <Row><Button type="reset" variant="danger">Clear All Players</Button></Row>
      </Form>

      <NavLink className={'btn btn-outline-light btn-lg'} to="/game">Start Game</NavLink>
    </section>
  )
}

export default Players