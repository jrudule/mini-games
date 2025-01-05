const gameDiv = document.querySelector(".gameDiv");
const pointDiv = document.querySelector(".pointDiv");
const ruleDiv = document.querySelector(".ruleDiv");
const title = document.querySelector(".title");
const x = document.querySelector('.x');
const overlay = document.getElementById('overlay');

const playerDiv = document.querySelector(".playerDiv");
const computerDiv = document.querySelector(".computerDiv");
const winnerDiv = document.querySelector(".winnerDiv");

const winner = document.querySelector(".winner");
const winnerScore = document.querySelector(".winnerScore");

const buttons = document.querySelectorAll('button');
const RockButton = document.querySelectorAll('.Rock');
const PaperButton = document.querySelectorAll('.Paper');
const ScissorsButton = document.querySelectorAll('.Scissors');
const start = document.querySelector('.start');
const howToPlay = document.querySelector('.howToPlay');
const selectPoints = document.querySelector('.selectPoints');
const restart = document.querySelector('.restart');

const h3Player = document.createElement('h3');
const h3Computer = document.createElement('h3');
const player = document.createElement("p");
const computer = document.createElement("p");
const playerScoreP = document.createElement("p");
const computerScoreP = document.createElement("p");

let playerScore = 0;
let computerScore = 0;
let maxPoints = 0;
let playerSelection;

start.addEventListener('click', () => {
    start.style.display = 'none';
    howToPlay.style.display = 'none';
    pointDiv.style.display = 'block';
    ruleDiv.style.display = 'none';
});

howToPlay.addEventListener('click', () => {
    ruleDiv.style.display = 'flex';
    overlay.style.display = 'block';
});

x.addEventListener('click', () => {
    ruleDiv.style.display = 'none';
    overlay.style.display = 'none';
});


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(
            button.value === 'Rock' || 
            button.value === 'Paper' || 
            button.value === 'Scissors'
        ){  
            //Lai nevarētu sākt gājienu, pirms nospiests "Start":
            if (maxPoints > 0) { 
                gameDiv.style.display = 'flex';
                game(button.value);
            }
        }
    });
});

//Lai mainītu maksimālo punktu skaitu
const pointSelect = document.getElementById("pointSelect");
for (let i = 1; i <= 100; i++) {
    pointSelect.innerHTML += `<option value="${i}">${i}</option>`;
}

selectPoints.addEventListener('click', () => {
    pointDiv.style.display = 'none';
    maxPoints = parseInt(pointSelect.value);
    buttons.forEach((button) => {
        button.disabled = false;                  
    });
    title.style.display = 'block';  
});

function game(playerSelection){

    //Izveido spēlētāja tabulu:
    playerDiv.classList.add("box");
    h3Player.textContent = 'You';
    h3Player.classList.add('player');
    playerDiv.appendChild(h3Player);

    //Izveido datora tabulu:
    computerDiv.classList.add("box");
    h3Computer.textContent = 'Computer';
    h3Computer.classList.add('computer');
    computerDiv.appendChild(h3Computer);

    function getComputerChoice() {
        let random = Math.floor(Math.random() * 3 + 1);
        if (random === 1){
            return "Rock";
        } else if (random === 2){
            return "Paper";
        } else if (random === 3){
            return "Scissors";
        }
    }

    let computerSelection = getComputerChoice();
    
    //Parāda abu spēlētāju izvēli:
    player.textContent = playerSelection;
    computer.textContent = computerSelection;

    function playRound(playerSelection, computerSelection) {
        //Izveido paziņojumu tabulu - kurš zaudēja, kurš uzvarēja:
        winnerDiv.classList.add("box");
        winner.classList.add("smallBox");

        if(playerSelection === computerSelection){
            winner.textContent = "Tie!";
        } 
        
        if(playerSelection === "Rock"){
            if(computerSelection === "Paper"){
                winner.textContent = "You Lose! Paper beats Rock!";
                computerScore++;
            }
        } if(playerSelection === "Paper"){
            if(computerSelection === "Rock"){
                winner.textContent = "You Win! Paper beats Rock!";
                playerScore++;
            }
        } if(playerSelection === "Rock"){
            if(computerSelection === "Scissors"){
                winner.textContent = "You Win! Rock beats Scissors!";
                playerScore++;
            }
        } if(playerSelection === "Scissors"){
            if(computerSelection === "Rock"){
                winner.textContent = "You Lose! Rock beats Scissors!";
                computerScore++;
            }
        } if(playerSelection === "Paper"){
            if(computerSelection === "Scissors"){
                winner.textContent = "You Lose! Scissors beats Paper!";
                computerScore++;
            }
        } if(playerSelection === "Scissors"){
            if(computerSelection === "Paper"){
                winner.textContent = "You Win! Scissors beats Paper!";
                playerScore++;
            }
        } 

        //Parāda abu spēlētāju punktus:
        playerScoreP.textContent = "Score: " + playerScore;
        computerScoreP.textContent = "Score: " + computerScore;
    }

    player.classList.add('smallBox');
    computer.classList.add('smallBox');
    playerScoreP.classList.add('smallBox');
    computerScoreP.classList.add('smallBox');

    playerDiv.appendChild(player);
    playerDiv.appendChild(playerScoreP);
    computerDiv.appendChild(computer);
    computerDiv.appendChild(computerScoreP);

    playRound(playerSelection, computerSelection);

    //Ļauj spēlēt līdz spēlētāja izvēlēta skaita uzvarām:
    if(computerScore === maxPoints){
        winnerScore.textContent = "You lost!";
        endGame();
    }else if(playerScore === maxPoints){
        winnerScore.textContent = "You won!";
        endGame();
    } 
}

function endGame(){
    winnerScore.classList.add("smallBox");
    maxPoints = 0;
    title.style.display = 'none';
    //Lai spēli varētu sākt no jauna:
    restart.style.display = 'block';
    restart.disabled = false;    
}

restart.addEventListener('click', () => {
    //Sagatavo spēli, lai tā izskatītos kā pašā sākumā:
    playerScore = 0;
    computerScore = 0;
    gameDiv.style.display = 'none';
    restart.style.display = 'none';
    start.style.display = 'block';
    howToPlay.style.display = 'block';
    start.disabled = false;
    winnerScore.textContent = "";
    winnerScore.classList.remove("smallBox"); 
});




