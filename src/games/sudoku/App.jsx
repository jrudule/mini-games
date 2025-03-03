import { useState, useEffect } from 'react'
import DrawIcon from '@mui/icons-material/Draw';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './Sudoku.module.css'

function App() {
  useEffect(() => {
    document.body.style.background = "#272548";

    return () => {
      // Cleanup on unmount
      document.body.style.background = "";
    };
  }, []);

  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // State to store board with empty cells
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  // State to store the full solution
  const [realBoard, setRealBoard] = useState(null); 
  // State to store empty cells, fillable for user
  const [fillableCell, setFillableCell] = useState([]);

  const [time, setTime] = useState(0);
  // State to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  function startGame() {
    setFillableCell([]);
    setSelectedCell(0);

    const newBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(newBoard);

    const solutionCopy = JSON.parse(JSON.stringify(newBoard));
    setRealBoard(solutionCopy);

    removeNumbers(newBoard, 40);
    setBoard(newBoard);

    setIsStarted(true);
    setIsRunning(true);
  }

  // To get random game board for every game
   function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // To validate that the placement of numbers on the game board follows Sudoku rules
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
  }

  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]); 

                for (let num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (fillBoard(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
  }

  // To set empty cells
  function removeNumbers(board, emptyCells) {
    let cellsToRemove = emptyCells;

    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (board[row][col] !== '') {
        setFillableCell((prevFillableCell) => [
          ...prevFillableCell,
          [row, col]
        ]);

        board[row][col] = '';
        cellsToRemove--;
      }
    }
  }

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
      // To check if game has ended
      if(JSON.stringify(realBoard) === JSON.stringify(board)){
        setIsEnded(true);
        setIsRunning(false);
      }
    }
    
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const inputNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedCell, setSelectedCell] = useState(0);
  const [noteMode, setNoteMode] = useState(false);
  const [notedCell, setNotedCell] = useState([]);
  const [notCorrect, setNotCorrect] = useState([]);

  function getCell(row, col) {
    setSelectedCell([row, col]);
    return selectedCell;
  };

  // To check if a specific cell is stored in an array
  const containsCell = (mainArray, cell) => {
    return mainArray.some(
      (arr) =>
        Array.isArray(arr) &&
        arr.length === cell.length &&
        arr.every((val, index) => val === cell[index])
    );
  };

  function addNumber(inputNumber) {
    const [row, col] = selectedCell;
    
    if(noteMode){
      if(!containsCell(notedCell, selectedCell)){
        setNotedCell([
          ...notedCell,
          [row, col]
        ]);
      }

      setBoard(prevBoard => {
        const newBoard = prevBoard.map(rowArr => [...rowArr]);

        // To avoid repeating numbers in a noted cell
        if (board[row][col].toString().match(inputNumber)) {
          const newInput = board[row][col].replace(inputNumber,'');
          newBoard[row][col] = newInput;
        } else {
          newBoard[row][col] += inputNumber + '';
        }
        
        return newBoard;
      });
    } else {
        if(containsCell(notedCell, selectedCell)){
          setNotedCell(notedCell.filter(
            (selectedCell) =>
              selectedCell !== selectedCell)
          )
        }
        setBoard(prevBoard => {
          const newBoard = prevBoard.map(rowArr => [...rowArr]);
          newBoard[row][col] = inputNumber;
          return newBoard;
        });

        if(realBoard[row][col] !== inputNumber){
          setNotCorrect([
            ...notCorrect,
            [row, col]
          ]);
        } else {
            if(containsCell(notCorrect, selectedCell)){
              setNotCorrect(notCorrect.filter(
                (selectedCell) =>
                  selectedCell !== selectedCell)
              )
            }
        } 
    } 
  };

  function removeAddedNumber() {
    const [row, col] = selectedCell;

    if(containsCell(notedCell, selectedCell)){
      setNotedCell(notedCell.filter(
        (selectedCell) =>
          selectedCell !== selectedCell)
      )
    }

    if(containsCell(notCorrect, selectedCell)){
      setNotCorrect(notCorrect.filter(
        (selectedCell) =>
          selectedCell !== selectedCell)
      )
    }

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => [...rowArr]);
      newBoard[row][col] = '';
      return newBoard;
    });
  };

  function restartGame() {
    setIsEnded(false);
    setIsStarted(false);
    setTime(0);
  }

  return (
    <div className={styles.container}>
      <div className={showRules ? styles.rules : styles.hidden}>
        <div className={styles.x} onClick={() => setShowRules(false)}>x</div>
        <ul>
          <li>The Sudoku grid has 9 rows, 9 columns, and 9 smaller 3x3 subgrids.</li>
          <li>Each row must contain numbers from <strong>1 to 9</strong>, without repetition.</li>
          <li>Each column must contain numbers from <strong>1 to 9</strong>, without repetition.</li>
          <li>Each 3x3 subgrid must contain numbers from <strong>1 to 9</strong>, without repetition.</li>
          <li>Start with the numbers already given in the grid and fill in the rest.</li>
        </ul>
      </div>

      <div className={`${isStarted ? styles.hidden : styles.startScreen} ${isEnded ? styles.hidden : ''}`}>
        <h1>SUDOKU</h1>
        <button className={styles.startButton} onClick={() => startGame()}>
          Start
        </button>
        <button className={styles.howToPlay} onClick={() => setShowRules(true)}>
          HOW TO PLAY
        </button>
      </div>
      <div className={isStarted ? styles.gameScreen : styles.hidden}>
        <div className={(notCorrect.length === 0) ? styles.hidden : styles.error}>
          Red number is incorrect
        </div>

        <div className={styles.gameContainer}>
          <div className={styles.numberButtonList}>
            {inputNumbers.map((inputNumber) => (
              <button 
                key={inputNumber} 
                onClick={() => addNumber(inputNumber)}
              >
                {inputNumber}
              </button>
            ))}
          </div>

          <div>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((number, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${styles.cell} ${ 
                      (rowIndex + 1) % 3 === 0 ? styles.bottomBorder : '' 
                    } ${
                      (colIndex + 1) % 3 === 0 ? styles.rightBorder : ''
                    } ${ 
                      (rowIndex + 1) % 3 === 1 ? styles.topBorder : '' 
                    } ${ 
                      (colIndex + 1) % 3 === 1 ? styles.leftBorder : '' 
                    } ${ 
                      ((rowIndex === selectedCell[0]) && (colIndex === selectedCell[1])) ? styles.selected : '' 
                    } ${ 
                      containsCell(notedCell, [rowIndex, colIndex]) ? styles.noted : '' 
                    } ${ 
                      containsCell(fillableCell, [rowIndex, colIndex]) ? '' : styles.notFillable 
                    } ${ 
                      containsCell(notCorrect, [rowIndex, colIndex]) ? styles.notCorrect : '' 
                    }`}
                    onClick={containsCell(fillableCell, [rowIndex, colIndex]) ? () => getCell(rowIndex, colIndex) : undefined}  
                  >
                    {number}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.editButtons}>
            <div className={styles.time}>
              {hours}:{minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>
            <button 
             className={ noteMode ? styles.notedButton  : styles.noteButton }
              onClick={() => setNoteMode(!noteMode)}
            >
              <DrawIcon />
            </button>
            <button className={styles.deleteButton} onClick={() => removeAddedNumber()}>
              <DeleteForeverIcon />
            </button>
            <button className={styles.restartButton} onClick={() => restartGame()}>
              Restart
            </button>
          </div>
        </div>
      </div>  

      <div className={isEnded ? styles.overlap : styles.hidden}></div>
        <div className={isEnded ? styles.endGame : styles.hidden}>
          <h1>You won!</h1>
          <div> 
            <div>Your game time</div>
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
          <button className={styles.restartButton} onClick={() => restartGame()}>
            Restart
          </button>
        </div>
    </div>
  );
}

export default App
