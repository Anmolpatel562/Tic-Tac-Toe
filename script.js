const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-Info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// lets,s create a function to initialize a game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        box.style.pointerEvents="all";
    });
    newGameBtn.classList.remove("active");
    boxes.forEach((box) =>{
        box.classList.remove("win");
    });
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();


function checkGameOver(){
    let answer="";
    winningPosition.forEach((position) =>{
      if(((gameGrid[position[0]]!=="") || (gameGrid[position[1]]!=="") || (gameGrid[position[2]]!=="")) && ((gameGrid[position[0]] === gameGrid[position[1]])) && ((gameGrid[position[1]] === gameGrid[position[2]]))){
               if(gameGrid[position[0]] === "X")
                   answer = "X";
               else
                   answer = "0";
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            })  
            boxes[position[0]].classList.add("win");     
            boxes[position[1]].classList.add("win");   
            boxes[position[2]].classList.add("win");  
            
            gameInfo.innerText = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
      }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let fillCount =0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        fillCount++;
    });
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}
function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; 
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
      box.addEventListener("click",()=>{
          handleClick(index);
      });
});
newGameBtn.addEventListener("click",initGame);