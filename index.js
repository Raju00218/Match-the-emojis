const emojis = ['🐶', '🐧', '🦁', '🐤','🐶', '🐧', '🦁', '🐤']; // Your set of emojis




const scoreBoard = document.getElementById('score');
const highestScoreBoard = document.getElementById('highestScore')
const resetGame = document.getElementById('reset')


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;


 
let highestScore =localStorage.getItem('highScore')
highestScoreBoard.textContent = `Highest Score: ${highestScore}`;

function shuffleArray(emojis) {
    for (let i = emojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  
    }
    return emojis;
}

const shuffledEmoji = shuffleArray(emojis);


function createBoard (){
 const gameBoard = document.getElementById('game-board')
 gameBoard.innerHTML = '';
 const shuffledEmoji = shuffleArray([...emojis]);
 shuffledEmoji.forEach((emoji, index) => {
    const card = document.createElement('div')
    card.classList.add('card', 'hidden')
    card.dataset.emoji =emoji;
    card.dataset.index = index;
    card.addEventListener('click',revealCard,)
    gameBoard.appendChild(card)

 });
}

function revealCard(){
    if(lockBoard)return;
    if(this === firstCard) return

     this.classList.remove('hidden')
    this.classList.add('revealed')
    this.textContent = this.dataset.emoji;
    if(!firstCard){
    firstCard = this;
    return true
    }
    secondCard = this 
    lockBoard = true

  checkForTheMatch()
}

function checkForTheMatch(){
    if(firstCard.dataset.emoji === secondCard.dataset.emoji){
        score += 5
        scoreBoard.textContent =`Score : ${score}`
     disableCards() 
     highestScores()
     

    }else{
         score -= 1;
          scoreBoard.textContent =`Score : ${score}`
       unflipCard()
    }
   
}

function disableCards(){
    firstCard.removeEventListener('click', revealCard)
    secondCard.removeEventListener('click', revealCard)
    resetBoard()
}




function unflipCard(){
    setTimeout(()=>{
        firstCard.classList.remove('revealed');
        firstCard.classList.add('hidden')
        firstCard.textContent = '';


        secondCard.classList.remove('revealed');
        secondCard.classList.add('hidden')
        secondCard.textContent = '';
          resetBoard()
    },1000)
}


function resetBoard(){
    [firstCard, secondCard, lockBoard] = [null, null, false]
}





// localStorage created by browser

function highestScores(){
    if(score > highestScore){
       highestScore = score
     localStorage.setItem('highScore',highestScore)
     highestScoreBoard.textContent= `Highest Score : ${highestScore}`
    
    }
   
}
function reset(){
    score = 0; 
    scoreBoard.textContent = `Score: ${score}`;
    firstCard = null; 
    secondCard = null; 
    lockBoard = false; 
    createBoard();
}

resetGame.addEventListener('click',reset)


createBoard()

