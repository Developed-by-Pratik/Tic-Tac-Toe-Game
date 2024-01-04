let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
//Player X , Player O
let turnO = true;

let buttonClick = 0;

//Winning Patterns

const winPatterns = [
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]  
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was clicked");
        if (turnO) {
            box.style.color = "#b0413";
            box.innerText = "O";
            turnO = false;
            buttonClick++;
        } else {
            box.style.color = "#592013";
            box.innerText = "X";
            turnO = true;
            buttonClick++;
        }
        box.disabled = true;
        checkWinner();
    });
});


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const checkWinner = () => {
    for(let pattern of winPatterns) {  
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val ) {
                console.log("Winner ",pos1Val);
                showWinner(pos1Val);
            } else if (buttonClick === 9) {
                console.log("draw");
                msg.innerText = `DRAW !! Play Again !`;
                msgContainer.classList.remove("hide");
                disabledBoxes();
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);