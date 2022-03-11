//Start Declaration
const deck = document.querySelector("#deck");
const stars = document.querySelectorAll("#heart li");
const move = document.querySelector("#moves");
const timer = document.querySelector("#timer");
// If we use getElementById for the (restart) it's Error!
// So we will use here querySelector
const restart = document.querySelector("#restart");
const cards = document.querySelectorAll("#deck li");
let arr = Array.from(cards);
let openCards = [];
let movesCounter = 0;
let timerOut = true;
let match = 0;
let time = 0;
let timerId = 0;







// Start Functions
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener("click", function(event) {
    // console.log(event.target);
    if (validClick(event.target)) {
        if (timerOut) {
            initialTime();
            // console.log("I'm in initialTime Condition")
        }


        toggleCard(event.target);
        pushCard(event.target);

        if (openCards.length == 2) {
            checkMatch();
            addMove();
            if (movesCounter == 8 || movesCounter == 16) {
                removeStars();
            }
            if (movesCounter == 24) {
                alert("Sorry you lose")

            }
        }
    }
})

restart.addEventListener("click", resetGame);


function validClick(card) {
    //console.log("I'm in validClick")
    // After Debuging the Issue was here
    if (card.classList.contains("card") && !card.classList.contains("match") &&
        !openCards.includes(card) && openCards.length < 2) { return true; } else { return false; }

}
//I Don't understand this 
reShuffle()

function reShuffle() {
    let shuffled = shuffle(arr);
    for (let item of shuffled) {
        deck.appendChild(item)
    }
}


function toggleCard(card) {
    card.classList.toggle('open');

}

function pushCard(card) {
    openCards.push(card);
}

function addMove() {
    movesCounter++;
    move.innerHTML = movesCounter;
}

function removeMove() {
    movesCounter = 0;
    move.innerHTML = 0;
}

function removeStars() {
    for (let i of stars) {
        if (i.style.display != "none") {
            i.style.display = "none";
            break;
        }
    }
}

function resetStars() {
    for (let i of stars) {
        if (i.style.display == "none") {
            i.style.display = "inline";
            break;
        }
    }
}

function resetMatch() {
    for (let item of cards) {
        item.classList.remove("match");
    }
}

function resetGame() {
    stopTimer();
    removeMove();
    resetStars();
    resetMatch();
    reShuffle();
    match = 0;
    openCards = [];
}



function checkMatch() {

    if (openCards[0].children[0].className === openCards[1].children[0].className) {
        console.log("I'm in checkMatch")

        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards = [];
        match++;


        if (match == 8) {
            setTimeout(() => {
                alert("You Win")
            }, 1000);
        }
    } else {
        setTimeout(() => {
            openCards[0].classList.remove("open");
            openCards[1].classList.remove("open");
            openCards = [];
        }, 1000);
    }

}


function timerCount() {
    //console.log("I'm In timerCount")
    let min = Math.floor(time / 60);
    let sec = time % 60;
    time++;
    if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`;

    } else {
        timer.innerHTML = `${min}:${sec}`;
    }

}
// Another way to calc Timer

// function startTimer() {
//     let second = 0,
//         minute = 0;
//     interval = setInterval(function() {
//         timer.innerHTML = minute + ":0" + second;
//         second++;

//         if (second == 60) {
//             minute++;
//             second = 0;
//         }

//         if (minute == 60) {
//             hour++;
//             minute = 0;
//         }
//     }, 1000);
// }

function initialTime() {

    timerOut = false;
    timerId = setInterval(() => {
        //startTimer();
        timerCount();
    }, 1000);
    console.log("I'm In timerId")
        //console.log("I'm in initialTime")
}

function stopTimer() {

    timerOut = false;
    clearInterval(timerId);
    time = 0;
    timerCount();
}