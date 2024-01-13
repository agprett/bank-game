import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateBankAmount } from "../ducks/playerSlice";
import { Container, Row, Button, Col, Table } from "react-bootstrap";

function Game() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players.value);

  const [round, setRound] = useState(1);
  const [numRolls, setNumRolls] = useState(0);
  const [bankAmount, setBankAmount] = useState(0);
  const [viewNums, setViewNums] = useState(false);
  const [viewBank, setViewBank] = useState(false);
  const [names, setNames] = useState([]);
  const [lastRolled, setLastRolled] = useState("");
  const [active, setActive] = useState([]);
  const [banking, setBanking] = useState([]);
  const [banked, setBanked] = useState([]);

  useEffect(() => {
    if (players.length === 0) {
      alert("Must have at least 1 player");
      navigate("/players");
    }
  }, []);

  useEffect(() => {
    const nameCollector = players.map((player) => {
      return player.name;
    });

    setNames(nameCollector);
    setActive(nameCollector);
  }, []);

  const updateBank = (value) => {
    if (numRolls < 3) {
      if (+value === 7) {
        setBankAmount(bankAmount + 70);
      } else if (value === "DOUBLES!") {
        alert("No doubles during first three rounds");
        return;
      } else {
        setBankAmount(bankAmount + +value);
      }
    } else {
      if (+value === 2 || +value === 12) {
        alert(`2's and 12's should be doubles!`);
        return;
      } else if (+value === 7) {
        if (round === 10) {
          alert("Game Over!");
          navigate("/game-over");
        } else {
          setBankAmount(0);
          setNumRolls(0);
          setRound(round + 1);
          setViewNums(false);
          setBanked([]);
          setBanking([]);

          let reorderedActive = [...names];

          while (reorderedActive[reorderedActive.length - 1] !== lastRolled) {
            reorderedActive.push(reorderedActive.shift());
          }
          setActive(reorderedActive);

          return;
        }
      } else if (value === "DOUBLES!") {
        setBankAmount(bankAmount * 2);
      } else {
        setBankAmount(bankAmount + +value);
      }
    }
    setNumRolls(numRolls + 1);

    setLastRolled(active[0]);
    let rolled = [...active];
    rolled.push(rolled.shift());
    setActive(rolled);
  };

  const bankingUpdate = (e) => {
    const name = e.target.value;
    if (banking.includes(name)) {
      const index = banking.findIndex((e) => e === name);

      const newBanking = [...banking];

      newBanking.splice(index, 1);

      setBanking(newBanking);
    } else {
      const newBanking = [...banking];
      newBanking.push(name);
      setBanking(newBanking);
    }
  };

  const saveBanking = () => {
    banking.forEach((name) => {
      console.log(name);

      setActive((state) => {
        const activeIndex = state.findIndex((e) => e === name);
        const updatedActive = [...state];
        updatedActive.splice(activeIndex, 1);

        return updatedActive;
      });

      dispatch(updateBankAmount({ name, amount: bankAmount }));

      const updatedBanked = [...banked];
      updatedBanked.push(name);
      setBanked(updatedBanked);
    });

    if (active.length - banking.length === 0) {
      if (round === 10) {
        alert("Game Over!");
        navigate("/game-over");
      } else {
        setBankAmount(0);
        setNumRolls(0);
        setRound(round + 1);
        setViewBank(false);
        setBanked([]);
        setBanking([]);

        let reorderedActive = [...names];

        while (reorderedActive[reorderedActive.length - 1] !== lastRolled) {
          reorderedActive.push(reorderedActive.shift());
        }
        setActive(reorderedActive);

        return;
      }
    }

    setBanking([]);
  };

  const scoreView = [...players]
    .sort((a, b) => b.bank - a.bank)
    .map((player) => {
      return (
        <p key={player.name}>
          {player.name}: {player.bank}
        </p>
      );
    });

  const activeView = players.filter(player => active.includes(player.name)).map(({name, bank}) => {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{bank + bankAmount}</td>
        <td>
          <input
            checked={banking.includes(name) ? true : ""}
            value={name}
            onChange={bankingUpdate}
            type="checkbox"
          />
        </td>
      </tr>
    );
  });

  const rollDiv = (
    <Container id="roll-div" fluid className="text-center">
      <Row>
        <h3 id="roll-turn">{active[0]}'s Turn</h3>
      </Row>
      <Row className="justify-content-center">
        <Col xs={4}>
          <Button
            className={numRolls < 3 ? "btn-primary" : " disabled"}
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            2
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            3
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            4
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            5
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            6
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className={numRolls < 3 ? "btn-primary" : "btn-danger"}
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            7
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            8
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            9
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            10
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col xs={4}>
          <Button
            className="btn-primary"
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            11
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className={numRolls < 3 ? "btn-primary" : " disabled"}
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            12
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            className={numRolls >= 3 ? "btn-primary" : "disabled"}
            variant="rolled-num"
            onClick={(e) => updateBank(e.target.textContent)}
          >
            DOUBLES!
          </Button>
        </Col>
      </Row>
    </Container>
  )

  const bankDiv = (
    <div id="bank-div">
      <Table striped hover variant="secondary">
        <thead>
          <tr>
            <th>Name</th>
            <th>Potential Score</th>
            <th>Bank</th>
          </tr>
        </thead>
        <tbody id="bank-select">{activeView}</tbody>
      </Table>
      <Button
        variant="success"
        className={numRolls < 3 ? "disabled" : ""}
        onClick={saveBanking}
      >
        Confirm
      </Button>
    </div>
  )

  return (
    <Container className="custom-page" id="game-page">
      <h2>Round: {round}/10</h2>
      <h2 id="bank-total">Current Total: {bankAmount}</h2>

      <h2>Scores</h2>

      <div className="score-group">{scoreView}</div>

      <Container id="game-btns-display" fluid className="fixed-bottom">
        {viewNums && (
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="p-3 popups">
              {rollDiv}
            </Col>
          </Row>
        )}

        {viewBank && (
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="p-3 popups">
              {bankDiv}
            </Col>
          </Row>
        )}

        <Row className="justify-content-center gx-2">
          <Col xs={6} md={3}>
            <Button
              variant="secondary"
              className={
                (viewNums ? "overlay-btns-selected" : "") + " game-btns"
              }
              onClick={() => {
                setViewNums(!viewNums);
                setViewBank(false);
              }}
              >
              Roll
            </Button>
          </Col>
          <Col xs={6} md={3}>
            <Button
              variant="secondary"
              className={
                (viewBank ? "overlay-btns-selected" : "") + " game-btns"
              }
              onClick={() => {
                setViewBank(!viewBank);
                setViewNums(false);
              }}
            >
              Bank
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Game;
