import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Message from './components/Message/Message';
import Row from './components/Row/Row';
import StatusBar from './components/StatusBar/StatusBar';

function App() {

  const [boardArray, setBoardArray] = useState(null);
  const [size, setSize] = useState(8);
  const [black_turn_it, setBlack_turn] = useState(true);
  const [blackOne, setBlack] = useState(2);
  const [whiteOne, setWhite] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [n, setN] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  let wholeArray = Array.from(Array(8), () => new Array(8))

  // wholeArray = wholeArray.map(nested => nested = new Array(8));
  console.log(wholeArray);

  // white: 1
  // black: 0
  // empty: undefined
  wholeArray[3][3] = 1;
  wholeArray[3][4] = 0;
  wholeArray[4][3] = 0;
  wholeArray[4][4] = 1;

  useEffect(() => {
    setBoardArray(wholeArray);
  }, []); 

  
  const handleClick = (i, j) => {

    if (boardArray[i][j] !== undefined) {
      return;
    }

    let moved = checkMove(i, j, true).moved;
    let black_turn_now = black_turn_it;
    if (moved) {
      let hasMove = false;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (boardArray[i][j] === undefined) {
            if (checkMove(i, j, false, !black_turn_now).foundMove) {
              hasMove = true;
              break;
            }
          }
        }
        if (hasMove) {
          console.log('found possible move for', black_turn_now ? 'white' : 'black');
          setBlack_turn(!black_turn_now);
          break;
        }
      }
      if (!hasMove) {
        console.log('current player has no moves remaining! Changing to other player');
        //setState({black_turn_now: !black_turn_now});
        console.log('checking possible move for', black_turn_now ? 'white' : 'black');
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (boardArray[i][j] === undefined) {
              if (checkMove(i, j, false).foundMove) {
                hasMove = true;
                break;
              }
            }
          }
          if (hasMove) {
            console.log('found possible move for', !black_turn_now ? 'white' : 'black');
            break;
          }
        }
        if (!hasMove) {
          setGameOver(true);
          console.log('both players don\'t have any moves remaining. The game is finished');
        }
      }
    }

  }

  const resetBoard = () => {

    let array = Array.from(Array(8), () => new Array(8))

    // white: 1
    // black: 0
    // empty: undefined
    array[3][3] = 1;
    array[3][4] = 0;
    array[4][3] = 0;
    array[4][4] = 1;

    setBoardArray(array);
    setSize(8);
    setBlack_turn(true);
    setBlack(2);
    setWhite(2);
    setGameOver(false);
  }

  const checkMove = (i, j, apply, black_turn) => {
    let black = blackOne,
      white = whiteOne;
    let newArray = [...boardArray];
    console.log(~~black_turn_it);
    console.log(~~!black_turn_it);
    let our = black_turn === undefined ? (~~!black_turn_it) : (~~!black_turn);
    let other = ~~!our;
    console.log(~~!black_turn);

    let otherX, otherY, ourX, ourY;
    let moved = false;
    let foundMove = false;

    let foundOur = false;
    let foundOther = false;

    for (let col = j - 1; col >= 0; col--) {
      if (newArray[i][col] !== other) {
        if (newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    if (foundOur && ourY < j - 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let col = ourY + 1; apply && col < j; col++) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let row = i + 1, col = j - 1; row < 8 && col >= 0; row++, col--) {
      if (newArray[row][col] !== other) {
        if (newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    if (foundOur && ourX > i + 1 && ourY < j + 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let row = ourX - 1, col = ourY + 1; apply && row > i && col < j; row--, col++) {
        newArray[row][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let row = i + 1; row < 8; row++) {
      if (newArray[row][j] !== other) {
        if (newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    foundOur && console.log('???', foundOur);
    if (foundOur && ourX > i + 1) {
      if (!apply) {
        //return {true, false};
        return { foundMove: true, moved: false };
      }

      for (let row = ourX - 1; apply && row > i; row--) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let row = i + 1, col = j + 1; row < 8 && col < 8; row++, col++) {
      if (newArray[row][col] !== other) {
        if (newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    if (foundOur && ourX > i + 1 && ourY > j + 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let row = ourX - 1, col = ourY - 1; apply && row > i && col > j; row--, col--) {
        newArray[row][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let col = j + 1; col < 8; col++) {
      if (newArray[i][col] !== other) {
        if (newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    if (foundOur && ourY > j + 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let col = ourY - 1; apply && col > j; col--) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let row = i - 1, col = j + 1; row >= 0 && col < 8; row--, col++) {
      if (newArray[row][col] !== other) {
        if (newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    if (foundOur && ourX < i - 1 && ourY > j + 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let row = ourX + 1, col = ourY - 1; apply && row < i && col > j; row++, col--) {
        newArray[row][col] = our;
        moved = true;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;
    for (let row = i - 1; row >= 0; row--) {
      if (newArray[row][j] !== other) {
        if (newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    if (foundOur && ourX < i - 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let row = ourX + 1; apply && row < i; row++) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    foundOur = false;
    foundOther = false;

    for (let row = i - 1, col = j - 1; row >= 0 && col >= 0; row--, col--) {
      if (newArray[row][col] !== other) {
        if (newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    if (foundOur && ourX < i - 1 && ourY < j - 1) {
      if (!apply) {
        return { foundMove: true, moved: false };
      }
      for (let row = ourX + 1, col = ourY + 1; apply && row < i && col < j; row++, col++) {
        newArray[row][col] = our;
        moved = true;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if (apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    if (apply) {
      setBoardArray(newArray);
      setBlack(black);
      setWhite(white);
    }
    return { foundMove: foundMove, moved: moved };
  }
  
  return (
    <div>
      <div className="header">UNDEFINED INTERVIEW PROJECT - Ryan</div>
      <Message resetFn={resetBoard} show={gameOver} black={blackOne} white={whiteOne} />
      <div className="layout">
        {/* {console.log(boardArray)} */}
 
        { boardArray ? n.map((el) => <Row over={gameOver} key={el} i={el} handleClick={handleClick} array={boardArray[el]}/> ) : null}

        <StatusBar black={blackOne} white={whiteOne} black_turn={black_turn_it} />

      </div>
    </div>
  );
}

export default App;
