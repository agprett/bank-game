import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router";
import { clearBanks, clearPlayers } from "../ducks/playerSlice";
import { Button, Container, Row, Col } from "react-bootstrap";

function GameOver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ordered, setOrdered] = useState([]);
  const [first, setFirst] = useState("<></>");

  const players = useSelector((state) => state.players.value);

  useEffect(() => {
    if (players.length === 0) {
      alert("No players playing, add players");

      dispatch(clearPlayers());
      navigate("players");
    }
  }, []);

  useEffect(() => {
    const allPlayers = [...players].sort((a, b) => b.bank - a.bank)


    const winnerInfo = allPlayers.shift();
    const winner = (
      <div>
        <h1>Winner - {winnerInfo.name}</h1>
        <h1>{winnerInfo.bank}</h1>
      </div>
    );

    setFirst(winner);

    setOrdered(
      allPlayers
        .sort((a, b) => b.bank - a.bank)
        .map((player, i) => {
          return (
            <div key={player.name}>
              <h2>
                {i + 2} - {player.name}: {player.bank}
              </h2>
            </div>
          );
        })
    );
  }, []);

  const playAgainFn = () => {
    dispatch(clearBanks());
    navigate("/game");
  };

  const editPlayersFn = () => {
    dispatch(clearBanks());
    navigate("/players");
  };

  const exitFn = () => {
    dispatch(clearPlayers());
    navigate("/");
  };

  return (
    <Container fluid className="custom-page">
      <Row>{first}</Row>
      <Row>{ordered}</Row>
      <Row className="justify-content-between gy-4">
        <Col xs={{span: 8, offset: 2}}>
          <Button className="game-over-btns" variant="success" onClick={playAgainFn}>
            Play Again
          </Button>
        </Col>
        <Col xs={{span: 8, offset: 2}}>
          <Button className="game-over-btns" onClick={editPlayersFn}>
            Edit Players
          </Button>
        </Col>
        <Col xs={{span: 8, offset: 2}}>
          <Button className="game-over-btns" variant="danger" onClick={exitFn}>
            Exit Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default GameOver;
