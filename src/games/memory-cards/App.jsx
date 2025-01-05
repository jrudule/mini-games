import { useState, useEffect } from 'react'
import styles from './MemoryCards.module.css'

function Button({headingText, btnText, onClick, display = "block", height = 80, width = 100, isEnd }) {
  const buttonStyle = {
    display: display,
    height: height + 'px',
    width: width + '%',
  };

  btnText = "Restart";

  if(isEnd){ 
    headingText = 'You won';
  } else {
    headingText = 'Game over';
  };

  return (
    <div>
      <h1>{headingText}</h1>
      <button className={styles.restartBtn} onClick={onClick} style={buttonStyle}>
        {btnText}
      </button>
    </div>
  );
  
}

function App() {
  useEffect(() => {
    document.body.style.display = "block";
    document.body.style.background = "#b5b5b5";

    return () => {
      // Cleanup on unmount
      document.body.style.display = "";
      document.body.style.background = "";
    };
  }, []);

  const languages = ["C", "C++", "JS", "Java", "Python", "PHP", "Ruby", ".NET", "C#", "Swift"];

  const [isStarted, setIsStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [count, setCount] = useState(0);
  const [bestCount, setBestCount] = useState(0);
  const [list, setList] = useState(languages);
  const [clicked, setClicked] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isEnd, setEnd] = useState(false);

  function startGame() {
    setIsStarted(true);
  }

  const handleItemClick = (name) => {
    setClicked((prevClicked) => {
      if (prevClicked.includes(name)) {
        if(bestCount < count) {
          setBestCount(count);
        } 
        else {}

        setCount(0);
        setIsActive(false);
        return []
      } else {
        const updatedClicked = [...prevClicked, name];
        if (updatedClicked.length === 10) { 
          setEnd(true);       
          setIsActive(false);   
        }
        return updatedClicked;
      }
    });
  };

  // To change sequence after every click
  function shuffle(name) {
    setCount((count) => count + 1);
    setList((prevList) => [...prevList].sort(() => Math.random() - 0.5));
    handleItemClick(name);
  }

  function startOver() {
    setEnd(false);       
    setIsActive(true);  
    if(count === 10){
      setCount(0);
      setBestCount(0);
      setIsStarted(false);
      setClicked([]);
    }
  }

  return (
    <div className={styles.container}>
      <div className={showRules ? styles.rules : styles.hidden}>
        <div className={styles.x} onClick={() => setShowRules(false)}>x</div>
        <div>
          Earn points by clicking on language cards, but you can only click each card once.
        </div>
      </div>

      <div className={isStarted ? styles.hidden : styles.start}>
        <h1>Memory Cards</h1>
        <button className={styles.startButton} onClick={() => startGame()}>
          Start
        </button>
        <button className={styles.howToPlay} onClick={() => setShowRules(true)}>
          How to play
        </button>
      </div>

      <div className={isStarted ? '' : styles.hidden}>
        <div className={isActive ? styles.game : styles.hidden}>
          <h1>Memory Cards</h1> 
          <div className={styles.gameText}>
            <div className={styles.scoreDiv}>
              <div>Count is {count}</div>
              <div>Best count is {bestCount}</div>
            </div>
          </div>
          <div className={styles.card}>
            {list.map((oneList, index) => {
              return(
                <button 
                className={styles.gameCard}
                key={index} 
                onClick={() => shuffle(oneList)}
                >
                  {oneList}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className={ !isActive ? styles.gameOver : styles.hidden }> 
        <div className={isEnd ? '' : styles.hidden}> 
            <div className={styles.scoreDiv}>Count is {count}</div>
        </div>  
        <Button onClick={() => startOver()} isEnd={isEnd} />
      </div>
    </div>
  )
}

export default App
