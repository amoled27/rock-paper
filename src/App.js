import { useEffect, useRef, useState } from "react";

import rock from "./assets/rock.png";
import paper from "./assets/paper.png";
import scissors from "./assets/scissors.png";
import spock from "./assets/spock.png";
import lizard from "./assets/lizard.png";
import "./App.css";

// selecting random number
const randomizer = () => {
  let max = 6;
  let min = 1;
  return Math.floor(Math.random() * (max - min) + min);
};

// wining conditions
const checkWinner = (choice, userSelection) => {
  if (userSelection === choice) return -1;
  switch (choice) {
    //rock
    case 1: {
      if (userSelection === 3 || userSelection === 5) return 1;
      return 0;
    }
    //paper
    case 2: {
      if (userSelection === 1 || userSelection === 4) return 1;
      return 0;
    }
    //scissors
    case 3: {
      if (userSelection === 2 || userSelection === 5) return 1;
      return 0;
    }
    //spock
    case 4: {
      if (userSelection === 3 || userSelection === 1) return 1;
      return 0;
    }
    //lizard
    case 5: {
      if (userSelection === 2 || userSelection === 4) return 1;
      return 0;
    }
    default:
      return 4;
  }
};

function App() {
  // 0 players turn , 1 computer's turn
  const [turn, updateTurn] = useState(0);
  const [currentSelection, updateCurrentSelection] = useState(-1);
  const [compSelection, updateCompSelect] = useState(0);
  const [refArr, updateRefArr] = useState([]);
  const [winner, setWinner] = useState(2);

  const rockRef = useRef(null);
  const paperRef = useRef(null);
  const scissorsRef = useRef(null);
  const spockRef = useRef(null);
  const lizardRef = useRef(null);

  useEffect(() => {
    updateRefArr([rockRef, paperRef, scissorsRef, spockRef, lizardRef]);
  }, []);

  useEffect(() => {
    const winner = checkWinner(compSelection, currentSelection);
    setWinner(winner);
  }, [compSelection, currentSelection]);

  // UI selection randomizer
  const randomUI = (count, rounds, stop) => {
    if (rounds < 0 && count === stop) {
      updateCompSelect(stop);
      return;
    }

    if (rounds === 0) {
      randomUI(0, -1, stop);
      return;
    }

    if (count >= 5) {
      count = 0;
      rounds--;
    }

    const ref = refArr[count];

    setTimeout(() => {
      if (count > 0) {
        const prevRef = refArr[count - 1];
        prevRef.current.style.filter = "invert(0)";
      } else {
        refArr[4].current.style.filter = "invert(0)";
      }

      ref.current.style.filter = "invert(1)";
      count++;
      randomUI(count, rounds, stop);
    }, 300);
  };

  useEffect(() => {
    if (turn) {
      //computer's algo
      let compChoice = randomizer();
      randomUI(0, 3, compChoice);

      updateTurn(0);
    }
  }, [turn]);

  // select choice handler
  const userSelection = (item) => {
    if (!turn) {
      if (compSelection > 0)
        refArr[compSelection - 1].current.style.filter = "invert(0)";
      setWinner(2);
      updateCompSelect(0);
      updateTurn(1);
      updateCurrentSelection(item);
    }
  };

  // get Element by id
  const getGameElementType = (type) => {
    switch (type) {
      case 1:
        return "Rock";
      case 2:
        return "Paper";
      case 3:
        return "Scissors";
      case 4:
        return "Spock";
      case 5:
        return "Lizard";
      default:
        return "None";
    }
  };

  // Rendering the results
  const renderWinner = () => {
    switch (winner) {
      case 0:
        return "You Won";
      case 1:
        return "Computer Won";
      case -1:
        return "DRAW ";
      case 2:
        return "Computer is Choosing...";
      default:
        return "Choose your Input";
    }
  };

  return (
    <div className="App">
      <div className="game row">
        <h1>{renderWinner()}</h1>
        <div className="card-container">
          <div className="kard" ref={rockRef} onClick={() => userSelection(1)}>
            <img className="img img-fluid" alt="rock" src={rock} />
          </div>
          <div className="kard" ref={paperRef} onClick={() => userSelection(2)}>
            <img className="img img-fluid" alt="paper" src={paper} />
          </div>
          <div
            className="kard"
            ref={scissorsRef}
            onClick={() => userSelection(3)}
          >
            <img className="img img-fluid" alt="scissors" src={scissors} />
          </div>
          <div className="kard" ref={spockRef} onClick={() => userSelection(4)}>
            <img className="img img-fluid" alt="spock" src={spock} />
          </div>
          <div
            className="kard"
            ref={lizardRef}
            onClick={() => userSelection(5)}
          >
            <img className="img img-fluid" alt="lizard" src={lizard} />
          </div>
        </div>
        <h2>
          {currentSelection > 0
            ? "You Chose: " + getGameElementType(currentSelection)
            : ""}
        </h2>
        <h2>
          {compSelection > 0
            ? "Computer Chose: " + getGameElementType(compSelection)
            : ""}
        </h2>
      </div>
    </div>
  );
}

export default App;
